const Koa = require('koa');
const AppRouters = require("./src/appRouters")



const app = new Koa();
AppRouters.routersList.forEach(router => {
  console.log(router);
  app.use(router.routes())
});
app.listen(3000,()=>{
    console.log(`Example app listening on port 3000  From koa`)
});