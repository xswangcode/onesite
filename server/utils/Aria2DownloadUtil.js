const Aria2 = require("aria2");
const ws = require("ws");
const config = require("../config/user.config")

const aria2 = new Aria2({
    WebSocket: ws, fetch: fetch,
    secure: false,
    host: config.Aria2_hosts,
    port: config.Aria2_port,
    secret: config.Aria2_secret,
    path: config.Aria2_path,
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


const pushUrlDownload = (url, name, path) => {
    return aria2.call('addUri', [url], { "out": name, dir: path }).then(
        (response) => {
            if (response) {
                console.log('下载已添加');
            }
            else {
                console.log("下载请求失败！response:", response)
            }
        }
    );
}


module.exports = {
    aria2: aria2,
    pushUrlDownload: pushUrlDownload
}
// eg.
// aria2.call('addUri', ["https://la.btc35000.com//mp43/995026.mp4?st=6poRcumI-bBPZgg0vJzERw&e=1723104148&f=a5ddWT3v+G680ouz1OTXcThpjBuL+MFwg82A2bN67Jg/1PQ9Yg+qSWzDwAkp0rVnNWQotvUFdKedAnWVs5N4w1z0pwKj7RIkKO49b7Y"], { "out": "aaa.mp4" }).then(
//     (response) => {
//         if (response) {
//             console.log('下载已添加');
//         }
//         else {
//             console.log("下载请求失败！response:", response)
//         }
//     }
// );