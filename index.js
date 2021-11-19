const WebSocketServer = require("ws").Server;
const http = require('http');
const https = require('https');
const readFileSync = require('fs').readFileSync;
const express = require('express');
const performance = require('perf_hooks').performance;

const app = express();
app.use(express.static(__dirname + '/'));
// HTTPS
const server1 = https.createServer({
    cert: readFileSync('key/cert1.pem'),
    key: readFileSync('key/privkey1.pem')
}, app);
const wss1 = new WebSocketServer({ server: server1 });
// HTTP
const server2 = http.createServer(app);
const wss2 = new WebSocketServer({ server: server2 });

let playerCnt = 0;
const playerAry = [];

setupServer(server1, wss1, 443);
setupServer(server2, wss2, 80);

function setupServer(server, wss, port) {
    wss.on("connection", (ws, req) => {
        const ip = req.socket.remoteAddress;
        let playerNo = playerAry.length;
        for (i in playerAry) {
            const idx = parseInt(i);
            if (playerAry[idx] == null) {
                playerNo = idx;
                break;
            }
        }

        playerAry[playerNo] = { ws: ws, pingTime: performance.now() };
        // console.log(playerAry.length);

        playerCnt++;
        console.log("connection", "playerCnt", playerCnt, "playerNo", playerNo, "ip", ip);
        ws.send(JSON.stringify({ mes: "_start", playerCnt: playerCnt, playerNo: playerNo }));

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
                if (playerCnt > 0) playerCnt--;
                const json = JSON.stringify({ mes: "_close", playerNo: pos });
                playerAry.forEach(client => {
                    if (client != null) client.ws.send(json);
                });
            }
        });
    });

    // const port = 443;
    // const port = 58888;
    server.listen(port);
    console.log("http://localhost:" + port + "/html");

    setInterval(() => {
        const t1 = performance.now();
        // console.log("setInterval:" + t1);
        playerAry.forEach(client => {
            if (client != null) {
                if (t1 - client.pingTime >= 30000) {
                    const pos = playerAry.findIndex((client2) => client2 ? client2.ws == client.ws : false);
                    if (pos != -1) playerAry[pos] = null;
                    if (playerCnt > 0) playerCnt--;
                    console.log("timeout", "playerCnt", pos);
                } else {
                    client.ws.send(JSON.stringify({ mes: "_ping" }));
                }
            }
        });
        // for (i in playerAry) {
        //   if (playerAry[i]!=null) console.log("playerAry", i, "value", playerAry[i] == null ? "null" : t1 - playerAry[i].pingTime);
        // }
    }, 5000);
}
