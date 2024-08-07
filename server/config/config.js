// 全局导出配置
user_config = require("./user.config")
web_config = require("./web.config")
const os = require('os');

// 服务端口
//获取本机ipv4地址
const getIPv4 = () => {
  //同一接口可能有不止一个IP4v地址，所以用数组存
  let ipv4s = [];
  //获取网络接口列表对象
  let interfaces = os.networkInterfaces();
  Object.keys(interfaces).forEach(function (key) {
    interfaces[key].forEach(function (item) {
      //跳过IPv6 和 '127.0.0.1'
      if ('IPv4' !== item.family || item.internal !== false) 
        ipv4s.push(`[${item.address}]`)
      else
        ipv4s.push(item.address); //可用的ipv4s加入数组
    })
  })
  return ipv4s; //返回一个可用的即可
}
let ipv4 = getIPv4();


module.exports = {
  ...user_config,
  ...web_config,
  server_port:5123,
  ipv4
}