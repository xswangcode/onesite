const Koa = require('koa');

const static = require('koa-static')
const AppRouters = require("./src/appRouters")
const CONFIG = require("./config/config")
const cors = require('koa2-cors');
const { koaBody } = require('koa-body');



const app = new Koa();
app.use(cors());
app.use(koaBody());
app.use(static(__dirname + '/public', {
  index: true,    // 默认为true  访问的文件为index.html  可以修改为别的文件名或者false
  hidden: false,   // 是否同意传输隐藏文件
  defer: true      // 如果为true，则在返回next()之后进行服务，从而允许后续中间件先进行响应
}))

AppRouters.routersList.forEach(router => {
  app.use(router.routes())
});

console.log("CONFIG",CONFIG);
console.log("process.env.PORT",process.env.PORT)

const SERVER_PORT = process.env.PORT || 80
app.listen(SERVER_PORT, () => {
  console.log("\nVisit app listening on url :\n")
  CONFIG.ipv4.map(v=>{
    console.log(`\t\thttp://${v}:${SERVER_PORT}/index.html  `)
  })
  console.log("\n\tStart App From koa");
});