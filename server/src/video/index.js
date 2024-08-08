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
    const args = { page: ctx.params.page, urlarg:ctx.query.urlarg }
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
router.post("/down", async (ctx) => {
    let args = ctx.request.body
    let info = await API.Down_Video(args.link,args.name)
    ctx.response.body = info
})
router.post("/loadVideoLink", async (ctx) => {
    if(!ctx.request.body.link)
        ctx.response.body = "链接不存在";
    else{
        let args = ctx.request.body.link
        let link = await API.Load_Video_Link(args)
        ctx.response.body = link;
    }
})

router.get("/list_localfile", async (ctx) => {
    let res =  API.List_File()
    ctx.response.body = res;
})
module.exports = router;