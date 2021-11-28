const WebSocket = require("ws");
const WebSocketServer = require("ws").Server;
const http = require('http');
const https = require('https');
const readFileSync = require('fs').readFileSync;
const performance = require('perf_hooks').performance;

const timeOutTime = 30000;

// HTTPS
const serverS = https.createServer({
    cert: readFileSync('key/cert1.pem'),
    key: readFileSync('key/privkey1.pem')
});
const wssS = new WebSocketServer({ server: serverS });
// HTTP
// const serverN = http.createServer();
// const wssN = new WebSocketServer({ server: serverN });

const spaceAry = [];

setupServer(serverS, wssS, 443);
// setupServer(serverN, wssN, 80);

function setupServer(server, wss, port) {
    wss.on("connection", (ws, req) => {
        const clientFamily = req.socket.remoteFamily;
        const clientIp = req.socket.remoteAddress;
        const clientPort = req.socket.remotePort;
        const pathname = req.url;

        // 新しいpathnameに空間を作る
        const pathnameIdx = Object.keys(spaceAry).findIndex((key) => key == pathname);
        if (pathnameIdx == -1) {
            spaceAry[pathname] = {
                playerCnt: 0,
                playerAry: []
            };
        }

        const space = spaceAry[pathname];
        const playerAry = space.playerAry;

        // 接続してきたクライアントを登録
        let playerNo = playerAry.findIndex((value) => value == null);
        playerNo = playerNo == -1 ? playerAry.length : playerNo;
        const playerObj = {
            ws: ws,
            pingTime: performance.now(),
            ip: clientIp,
            port: clientPort,
            isClose: false
        };
        playerAry[playerNo] = playerObj;
        // console.log(playerAry.length);
        space.playerCnt++;
        console.log(
            "connection",
            // "playerCnt", space.playerCnt,
            "playerNo", playerNo,
            // "clientFamily", clientFamily,
            "ip", clientIp,
            "port", clientPort,
            "pathname", pathname
        );

        // 接続情報をクライアントに送る
        ws.send(JSON.stringify({
            mes: "_start",
            playerCnt: space.playerCnt,
            playerNo: playerNo,
            serverTime: new Date().getTime()
        }));
        // 接続したことを全員に知らせる
        sendEvery(playerAry, JSON.stringify({
            mes: "_connection",
            playerNo: playerNo,
            serverTime: new Date().getTime()
        }));

        // メッセージ受信
        ws.on('message', (message, isBinary) => {
            try {
                // メッセージが来たら全員にばらまく
                playerObj.pingTime = performance.now();
                sendEvery(playerAry, message, isBinary);
            } catch (e) {
                console.log("message send error:", e);
            }
        });

        // 接続が切れた場合
        ws.on('close', ws2 => {
            if (playerObj.isClose) return;
            const pos = playerAry.findIndex((client) => client ? client.ws == ws : false);
            console.log(
                "close     ",
                "playerNo", pos,
                "ip", clientIp,
                "port", clientPort,
                "pathname", pathname
            );
            if (pos != -1) {
                playerAry[pos] = null;
                if (space.playerCnt > 0) space.playerCnt--;
                // 切断したことを全員に知らせる
                sendEvery(playerAry, JSON.stringify({
                    mes: "_close",
                    playerNo: pos,
                    serverTime: new Date().getTime()
                }));
            }
        });
    });

    server.listen(port);
    console.log("server listen port:" + port);
}

// 生存確認
let intervalCnt = 0;
setInterval(() => {
    const t1 = performance.now();
    // console.log("setInterval:" + t1);
    Object.keys(spaceAry).forEach(spaceName => {
        const space = spaceAry[spaceName];
        const playerAry = space.playerAry;
        playerAry.forEach(client => {
            if (client != null) {
                if (t1 - client.pingTime >= timeOutTime) {
                    // タイムアウトで切断
                    const pos = playerAry.findIndex((client2) => client2 ? client2.ws == client.ws : false);
                    console.log(
                        "timeout   ",
                        "playerNo", pos,
                        "ip", client.ip,
                        "port", client.port,
                        "pathname", spaceName
                    );
                    if (pos != -1) {
                        playerAry[pos].isClose = true;
                        playerAry[pos] = null;
                        if (space.playerCnt > 0) space.playerCnt--;
                        // 切断したことを全員に知らせる
                        sendEvery(playerAry, JSON.stringify({
                            mes: "_close",
                            playerNo: pos,
                            serverTime: new Date().getTime()
                        }));
                        // client.ws.close(); // Linuxだとoncloseが呼ばれない。ws 8.3.0のバグ？
                    }
                }
            }
        });
    });

    // 全空間の情報出力
    if (false) { // debug log
        if (++intervalCnt % 5 == 0) {
            console.log("--------", new Date(Date.now() - (new Date().getTimezoneOffset()) * 60 * 1000));
            Object.keys(spaceAry).forEach(key => {
                const space = spaceAry[key];
                if (space.playerCnt >= 1) console.log("space:", key, "playerCnt:", space.playerCnt);
                space.playerAry.forEach((client, clientI) => {
                    if (client != null) {
                        console.log("space:", key, "playerNo:", clientI, "pingTime:", client == null ? "null" : t1 - client.pingTime, "ip:", client.ip, "port", client.port);
                    }
                });
            });
        }
    }
}, 1000);


function sendEvery(playerAry, sendStr, isBinary) {
    isBinary = isBinary || false;
    playerAry.forEach(client => {
        if (client != null && client.ws.readyState === WebSocket.OPEN) {
            client.ws.send(sendStr, { binary: isBinary });
        }
    });
}

