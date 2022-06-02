import { serve } from "https://deno.land/std@0.116.0/http/server.ts";

serve((request) => {
  console.log("socket connected!");

  const { socket, response } = Deno.upgradeWebSocket(request);

  socket.onmessage = (event) => {
    socket.send(event.data);
  };
  socket.onclose = (event) => {
    console.log(
      `websocket was closed because ${event.reason} (code: ${event.code})`,
    );
  };

  return response;
}, {
  addr: ":80",
});
console.log("serve");
