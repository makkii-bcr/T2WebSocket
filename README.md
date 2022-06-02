# T2WebSocket

Tonyu System 2 でWebSocket通信機能を使うためのライブラリです。
ネットゲームなどを作ることができます。

サーバー側プログラムはindex.js（Node.js製）、  
クライアント側プログラムはT2WebSocket.tonyu（Tonyu2製）です。

## サンプル
- [「T2WebSocket」](https://www.tonyu.jp/project/viewProject.cgi?mainkey=897&)

## 利用しているゲーム
- [「キラキラ対戦」](https://www.tonyu.jp/project/viewProject.cgi?mainkey=894&)

## 仕様
- サーバーの基本動作としては、クライアントからデータ送信を受けると、全員にそのデータを配るだけです
  - 送信したクライアント自身にも同じデータが返ってきます
- サーバー側にゲームの処理を入れることはできません
  - ゲーム側でやり取りを上手く処理する必要があります
- サーバーのタイムアウトは30秒です
- クライアント側は30秒以内に何かしら送信しないと、サーバー側のタイムアウトで切断されてしまいます

## リファレンス

### クライアント

```javascript
// T2WebSocket.tonyu

// 接続
// roomName: ルーム名（英数字であれば好きな名前を指定できます）
//           省略するとルーム名なしになります
// url: 「ws://」「wss://」で始まるURLを指定します
//      URLを省略すると、デフォルトの「wss://t2ws.mkbcr.net/...」に接続します
// ※ roomNameとurlが同じゲーム同士で通信ができます。
connect(roomName, url)

// 切断
close()

// データを送信
// sendには、Object、Array、文字列、数値、バイナリデータ(JavaScriptのUint8Array等)などを送れます
// ObjectかArrayを指定した場合、内部でJsonに変換して送ります
// 送ったデータは同じゲームに接続した全員（自分も含め）に配られます
send(d)

// 接続開始通知のコールバックをセットするメソッド
setOnOpenListener(function(event))

// データ受信のコールバックをセットするメソッド
setOnMessageListener(function(data))

// 切断通知コールバックをセットするメソッド
setOnCloseListener(function(event))

// エラーのコールバックをセットするメソッド
setOnErrorListener(function(event))
```

### サーバー

サーバーからは、以下のようなデータが送られてきます。

クライアントが接続したとき
```javascript
{
    mes: "_start",
    playerCnt: 接続人数(数値),
    playerNo: 接続したクライアントに割り当てられたプレイヤー番号(数値),
    serverTime: サーバーの時刻(UnixTime(ミリ秒)(UTC))
}
```
接続人数(playerCnt)は、あまり正確ではないかもしれません。（クライアントが切断通知を送らない場合があるので、その場合タイムアウト(30秒)になるまでサーバー側ではクライアントがいると判断するため）

自分または他のクライアントが接続したとき
```javascript
{
    mes: "_connection",
    playerNo: 該当クライアントのプレイヤー番号(数値),
    serverTime: サーバーの時刻(UnixTime(ミリ秒)(UTC))
}
```

自分または他のクライアントが切断したとき
```javascript
{
    mes: "_close",
    playerNo: 該当クライアントのプレイヤー番号(数値),
    serverTime: サーバーの時刻(UnixTime(ミリ秒)(UTC))
}
```

## クライアントのサンプル

Tonyu2プロジェクトに、あらかじめT2WebSocket.tonyuを追加してください。

１人で接続テストする場合は、ブラウザを複数ウィンドウ開いて実行してください。

短めに書いた版

```javascript
// Main.tonyu
$t2ws = new T2WebSocket;
$t2ws.connect("myroom");
$t2ws.setOnMessageListener(\(obj) {
    if (obj.mes == "_start") { // 通信開始時の情報
        sendEvent("connect"); // 接続通知を送る
    } else if (obj.mes == "test") { // データを受信する
        print(obj.mes, obj.text);
    }
});
waitEvent("connect"); // 接続通知が来るまで待つ

// データを送信する
$t2ws.send({
    mes: "test",
    text: "hello T2WebSocket"
});
```

もう少ししっかり書いた版

```javascript
// Main.tonyu
$t2ws = new T2WebSocket;
$t2ws.connect();
$t2ws.setOnOpenListener(\(e) {
    print("open");
});
$t2ws.setOnCloseListener(\(e) {
    print("close");
});
$t2ws.setOnErrorListener(\(e) {
    print("error");
});
$t2ws.setOnMessageListener(\(obj) {
    if (obj.mes == "_start") { // 通信開始時の情報
        print("_start:" + (obj.playerNo + 1) + "P");
        sendEvent("connect"); // 接続通知を送る
        
    } else if (obj.mes == "_connection") { // 自分または誰かが、接続した（自分より先に接続した人は通知されない）
        print("_connect:", (obj.playerNo + 1) + "P");
        
    } else if (obj.mes == "_close") { // 自分または誰かが、切断・タイムアウトした（自分より後に切断した人は通知されない）
        print("_close:", (obj.playerNo + 1) + "P");
        
    } else { // データを受信する（他の人から送信したデータ or 自分が送信したデータが来る）
        print(obj.mes, obj.text);
    }
});
waitEvent("connect"); // 接続通知が来るまで待つ

// データを送信する
$t2ws.send({
    mes: "test",
    text: "hello T2WebSocket"
});
```

キーボードをキーを押すとキーIDを送信する
（Tonyu2の拡張構文も使う）

```javascript
// Main.tonyu
$t2ws = new T2WebSocket;
$t2ws.connect();
$t2ws.setOnOpenListener \(e) { print("open"); };
$t2ws.setOnCloseListener \(e) { print("close"); };
$t2ws.setOnErrorListener \(e) { print("error"); };
$t2ws.setOnMessageListener \(obj) {
    if (obj.mes == "_start") {
        print("_start:" + (obj.playerNo + 1) + "P");
        $myNo = obj.playerNo;
        sendEvent("connect"); // 接続通知を送る
    } else if (obj.mes == "_connection") {
        print("_connect:", (obj.playerNo + 1) + "P");
    } else if (obj.mes == "_close") {
        print("_close:", (obj.playerNo + 1) + "P");
    } else { // プレイヤー番号と受信データを表示する
        print((obj.playerNo + 1) + "P", obj.mes, obj.keyID);
    }
};
waitEvent("connect"); // 接続通知が来るまで待つ

while (true) {
    for (var i=1; i<240; i++) {
        if (getkey(i) == 1) {
            // 押したキーのIDを送信する
            $t2ws.send{
                playerNo: $myNo,
                mes: "key",
                keyID: i
            };
        }
    }
    update();
}
```

