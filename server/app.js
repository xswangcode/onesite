const Koa = require('koa');
const AppRouters = require("./src/appRouters")
const CONFIG = require("./config/config")
const cors = require('koa2-cors');
const { koaBody } = require('koa-body');



const app = new Koa();
app.use(cors());
app.use(koaBody());

AppRouters.routersList.forEach(router => {
  app.use(router.routes())
});

console.log("CONFIG",CONFIG);
console.log("process.env.PORT",process.env.PORT)

const SERVER_PORT = process.env.PORT || 3000
app.listen(SERVER_PORT, () => {
  console.log("\nVisit app listening on url :\n")
  CONFIG.ipv4.map(v=>{
    console.log(`\t\thttp://${v}:${SERVER_PORT}  `)
  })
  console.log("\n\tStart App From koa");
});