const Koa = require('koa');
const AppRouters = require("./src/appRouters")
const CONFIG = require("./config/config")



const app = new Koa();
AppRouters.routersList.forEach(router => {
  app.use(router.routes())
});

console.log("CONFIG",CONFIG);
app.listen(CONFIG.port, () => {
  console.log("\nVisit app listening on url :\n")
  CONFIG.ipv4.map(v=>{
    console.log(`\t\thttp://${v}:${CONFIG.port}  `)
  })
  console.log("\n\tStart App From koa");
});