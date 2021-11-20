const WebSocketServer = require("ws").Server;
const http = require('http');
const https = require('https');
const readFileSync = require('fs').readFileSync;
const express = require('express');
const performance = require('perf_hooks').performance;

const app = express();
app.use(express.static(__dirname + '/'));
// HTTPS
const serverS = https.createServer({
    cert: readFileSync('key/cert1.pem'),
    key: readFileSync('key/privkey1.pem')
}, app);
const wssS = new WebSocketServer({ server: serverS });
// HTTP
const serverN = http.createServer(app);
const wssN = new WebSocketServer({ server: serverN });

const spaceAry = [];

setupServer(serverS, wssS, 443);
setupServer(serverN, wssN, 80);

function setupServer(server, wss, port) {
    wss.on("connection", (ws, req) => {
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

        let playerNo = playerAry.findIndex((value) => value == null);
        playerNo = playerNo == -1 ? playerAry.length : playerNo;
        playerAry[playerNo] = {
            ws: ws,
            pingTime: performance.now(),
            ip: clientIp,
            port: clientPort,
        };
        // console.log(playerAry.length);

        space.playerCnt++;
        console.log("connection", "playerCnt", space.playerCnt, "playerNo", playerNo, "ip", clientIp, "port", clientPort, "pathname", pathname);
        ws.send(JSON.stringify({ mes: "_start", playerCnt: space.playerCnt, playerNo: playerNo }));

        ws.on('message', message => {
            try {
                // const t1 = performance.now();
                const mesStr = message.toString();
                let obj;
                try {
                    obj = JSON.parse(mesStr);
                } catch (e) { }
                if (obj != null && obj.mes == "_ping") {
                    const pos = playerAry.findIndex((client) => client ? client.ws == ws : false);
                    if (pos != -1) playerAry[pos].pingTime = performance.now();
                } else {
                    playerAry.forEach(client => {
                        if (client != null) {
                            client.ws.send(mesStr);
                        }
                    });
                }
                // const t2 = performance.now();
                // console.log("message send time:", t2 - t1);
            } catch (e) {
                console.log("message send error:", e);
            }
        });

        // 接続が切れた場合
        ws.on('close', ws2 => {
            const pos = playerAry.findIndex((client) => client ? client.ws == ws : false);
            console.log("close", "playerCnt", pos);
            if (pos != -1) {
                playerAry[pos] = null;
                if (space.playerCnt > 0) space.playerCnt--;
                const json = JSON.stringify({ mes: "_close", playerNo: pos });
                playerAry.forEach(client => {
                    if (client != null) client.ws.send(json);
                });
            }
        });
    });

    server.listen(port);
    console.log("server listen port:" + port);
}

// 生存確認
setInterval(() => {
    const t1 = performance.now();
    // console.log("setInterval:" + t1);
    Object.values(spaceAry).forEach(space => {
        const playerAry = space.playerAry;
        playerAry.forEach(client => {
            if (client != null) {
                if (t1 - client.pingTime >= 30000) {
                    const pos = playerAry.findIndex((client2) => client2 ? client2.ws == client.ws : false);
                    if (pos != -1) {
                        playerAry[pos] = null;
                        if (space.playerCnt > 0) space.playerCnt--;
                    }
                    console.log("timeout", "playerCnt", pos);
                } else {
                    client.ws.send(JSON.stringify({ mes: "_ping" }));
                }
            }
        });
    });

    // 全部屋出力
    if (false) { // debug log
        Object.keys(spaceAry).forEach(key => {
            const space = spaceAry[key];
            // console.log("space:", key, "playerCnt:", space.playerCnt);
            space.playerAry.forEach((client, clientI) => {
                if (client != null) {
                    console.log("space:", key, "playerNo:", clientI, "pingTime:", client == null ? "null" : t1 - client.pingTime, "ip:", client.ip, "port", client.port);
                }
            });
        });
    }
}, 5000);

