const Router = require('koa-router')
const cheerio = require('cheerio');
const API = require('./api')
const router = new Router()

// 设置模块接口前缀
router.prefix("/video")

/**
 * 当前最热的内容
 */
router.get("/hot_now/:page", async (ctx) => {
    console.log("list_now_page",ctx.params.page)
    const args = {page:ctx.params.page}
    let list_now =  await API.HotNow(args)
    ctx.response.type = 'text/html';
    ctx.response.body = list_now;
})


router.get("/video/:viewkey",async (ctx)=>{
    let args =  ctx.params.viewkey
    let info = await API.GetVideoInfoByViewKey(args)
    ctx.response.body = info;
})

module.exports =  router;