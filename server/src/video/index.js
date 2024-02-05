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
    const args = { page: ctx.params.page }
    let list_now = await API.Hot_page(args)
    ctx.response.type = 'json';
    ctx.response.body = {
        total:list_now.length,
        data:list_now
    };
})

/**
 * index页面
 */
router.get("/index/:page", async (ctx) => {
    const args = { page: ctx.params.page }
    let list_now = await API.Index_Page(args)
    ctx.response.type = 'json';
    ctx.response.body = {
        total:list_now.length,
        data:list_now
    };
})


router.get("/show/:viewkey", async (ctx) => {
    let args = ctx.params.viewkey
    let info = await API.Detail_Page(args)
    ctx.response.body = info;
})

module.exports = router;