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

module.exports =  router;