const Aria2 = require("aria2");
const ws = require("ws");
const request = require('request');



const aria2 = new Aria2({
    WebSocket: ws, fetch: fetch,
    secure: false,
    host: "192.168.0.23",
    port: 6800,
    secret: "aria2",
    path: "/jsonrpc",
});

// emitted when the WebSocket is open.
aria2.on("open", () => {
    console.log("aria2 OPEN");
});

// emitted when the WebSocket is closed.
aria2.on("close", () => {
    console.log("aria2 CLOSE");
});

// emitted for every message sent.
aria2.on("output", (m) => {
    console.log("aria2 OUT", m);
});

// emitted for every message received.
aria2.on("input", (m) => {
    console.log("aria2 IN", m);
});
//   var url = "https://la.btc35000.com//mp43/995026.mp4?st=6poRcumI-bBPZgg0vJzERw&e=1723104148&f=a5ddWT3v+G680ouz1OTXcThpjBuL+MFwg82A2bN67Jg/1PQ9Yg+qSWzDwAkp0rVnNWQotvUFdKedAnWVs5N4w1z0pwKj7RIkKO49b7Y";

aria2.call('addUri', ["https://la.btc35000.com//mp43/995373.mp4?st=9QuZPia4WsKMlAN5CJkFfA&e=1723256580&f=e7c8a/Lt8/Aqjyb2oX10lOmt8dMfk0KXNgJvbvAIRoXY4IQBbGW+OLeO2Tv+q6AG97dxh0ehzlYUir3tWiCtmsqqcI/jxQyJ4lrqBQ"], { "out": "demo.mp4" }).then(
// aria2.call('addUri', ["https://vjs.zencdn.net/v/oceans.mp4"], { "out": "oceans.mp4" }).then(
    (response) => {
        if (response) {
            console.log('下载已添加');
        }
        else {
            console.log("下载请求失败！response:", response)
        }
    }
);