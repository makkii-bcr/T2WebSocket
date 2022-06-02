const ws = new WebSocket("ws://localhost:80/");
ws.onmessage = (e) => console.log(e.data);
setTimeout(()=>{ws.send("hi");},3000);

