const HOME_PATH = "/data/data/com.termux/files/home";
const PHONE_SAVE_PATH = "/storage/emulated/0/Download/Videi";
const VISIT_PATH =     HOME_PATH + "/storage/shared/Download/Videi"; // 浏览本地的文件的路径  "E://save//" //
const PUSH_ARIA2_PATH = PHONE_SAVE_PATH; // 推送过去的地址
const ERROE_DOWN_LOG_FILE_PATH = VISIT_PATH


// 客户端相关配置
module.exports = {
    PUSH_ARIA2_PATH: PUSH_ARIA2_PATH, 
    VISIT_PATH: VISIT_PATH,
    ERROE_DOWN_LOG_FILE_PATH:ERROE_DOWN_LOG_FILE_PATH,
    Aria2_hosts: "127.0.0.1",
    Aria2_port: 6800,
    Aria2_secret: 'aria2',
    Aria2_path: "/jsonrpc"
}