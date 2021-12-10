# T2WebSocket

Tonyu System 2 でWebSocketを使うためのライブラリです。
Tonyu2でオンライン通信できるので、ネットゲームなどを作ることができます。

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
// 接続
// 「ws://」「wss://」で始まるURLを指定する
connect(url)

// 切断
close()

// データを送信
// sendには、Object、Array、文字列、数値、バイナリデータ(JavaScriptのUint8Array等)などを送れる
// ObjectかArrayを指定した場合、内部でJsonに変換して送る
// 送ったデータは同じゲームに接続した全員（自分も含め）に配られる
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
