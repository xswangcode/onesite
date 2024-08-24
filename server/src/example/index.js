const Router = require('koa-router')
const cheerio = require('cheerio');
const API = require('./api')
const router = new Router()

// 设置模块接口前缀
router.prefix("/vvhan")

router.get("/", async (ctx,next) => {
    let worlds =  await API.helloWorld()
    ctx.response.type = 'text/html';
    // 设置response的内容:
    ctx.response.body = worlds;
})

router.get("/baidu", async (ctx,next) => {
    let worlds =  await API.baidu_test()
    ctx.response.type = 'text/html';
    // 设置response的内容:
    ctx.response.body = worlds;
})



module.exports =  router;