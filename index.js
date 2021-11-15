const WebSocketServer = require("ws").Server;
const http = require('http');
const express = require('express');

const app = express();
app.use(express.static(__dirname + '/'));
var server = http.createServer(app);
var wss = new WebSocketServer({ server: server });

let playerCnt = 0;
const playerAry = [];

wss.on("connection", ws => {
  let playerNo = playerAry.length;
  for (i in playerAry) {
    const idx = parseInt(i);
    console.log(idx);
    if (playerAry[idx] == null) {
      playerNo = idx;
      break;
    }
  }
  playerAry[playerNo] = ws;
  console.log(playerAry.length);

  playerCnt++;
  console.log("connection", "playerCnt", playerCnt, "playerNo", playerNo);
  ws.send(JSON.stringify({ mes: "_start", playerCnt: playerCnt, playerNo: playerNo + 1 }));

  ws.on('message', message => {
    wss.clients.forEach(client => {
      client.send(message.toString());
    });
  });

  // 接続が切れた場合
  ws.on('close', ws => {
    var pos = playerAry.indexOf(ws);
    if (pos != -1) playerAry[pos] = null;
    if (playerCnt > 0) playerCnt--;
    console.log("close", "playerCnt", playerCnt);
  });
});

server.listen(8888);
console.log("http://localhost:8888/html");
