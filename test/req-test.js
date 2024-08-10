const fastdown = require('fast-down')
const path = require("path")
// var url = "https://la.btc35000.com//mp43/995026.mp4?st=6poRcumI-bBPZgg0vJzERw&e=1723104148&f=a5ddWT3v+G680ouz1OTXcThpjBuL+MFwg82A2bN67Jg/1PQ9Yg+qSWzDwAkp0rVnNWQotvUFdKedAnWVs5N4w1z0pwKj7RIkKO49b7Y";
// var filepath = `E:/save/[原创] A4腰大三学姐91新人报道，母狗调教开发中~[线下可月看间.介].mp4`;
let url = 'https://www.w3schools.com/html/movie.mp4';
let filepath = path.join("E:","save", "test.mp4");
var con_num = 4;

let stime = new Date().getTime();
console.log('start download, concurrency: ' + con_num);

var downloader = new fastdown.Downloader(url, filepath, {
    'concurrency': con_num,
    'progress_throttle': 4000,
    "tmpdir": path.join("E:","save","tmp")
});

downloader.onProgress((pct, tinfo, pinfo) => {
    console.log('progress:', pct);
});

let ret = downloader.download();

console.log('download ' + (ret ? 'success' : 'fail') + ', cost: ' + (new Date().getTime() - stime) + 'ms');
