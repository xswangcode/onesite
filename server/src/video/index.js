const Router = require('koa-router')
const cheerio = require('cheerio');
const API = require('./api')
const config = require("../../config/config")
const router = new Router()

// 设置模块接口前缀
router.prefix("/video")


/**
 * 每个请求都要加的
 * @param {上下文} ctx 
 */
const setProxyCookie = (ctx)=>{
    try{
        let headers = ctx.request.headers;
        if(headers.proxycookie || headers.Proxycookie){
            config.setProxyCookie(headers.proxycookie || headers.Proxycookie)
        }
    }catch{
        console.log("设置代理cookie失败！忽略cookie。");
    }
}

/**
 * 当前最热的内容
 */
router.get("/hot_now/:page", async (ctx) => {
    setProxyCookie(ctx)
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
    setProxyCookie(ctx)
    const args = { page: ctx.params.page, urlarg:ctx.query.urlarg }
    try{
        let rsp = await API.Index_Page(args)
        ctx.response.type = 'json';
        ctx.response.body = {
            data: rsp.li, // 当前页面的数据
            totalPage: rsp.totalPage, // 总共有多少页
            errorbox: rsp.errorbox,
        };
    }catch(err){ 
        ctx.status = err.statusCode || err.status || 500;
        ctx.body =   err.message 
    }
})

router.get("/search/:page",async (ctx)=>{
    setProxyCookie(ctx)
    const args = {
        page: ctx.params.page,
        search_id: ctx.query.search_id,
        search_type:  ctx.query.search_type, 
        min_duration: '',
    }
    
    try{
        let rsp = await API.Search_Page(args)
        ctx.response.type = 'json';
        ctx.response.body = {
            data: rsp.li, // 当前页面的数据
            totalPage: rsp.totalPage, // 总共有多少页
            errorbox: rsp.errorbox,
        };
    }catch(err){ 
        ctx.status = err.statusCode || err.status || 500;
        ctx.body =   err.message 
    }
    
})

router.get("/show/:viewkey", async (ctx) => {
    setProxyCookie(ctx)
    let args = ctx.params.viewkey
    let info = await API.Detail_Page(args)
    ctx.response.body = info;
})
router.post("/down", async (ctx) => {
    setProxyCookie(ctx)
    let args = ctx.request.body
    let info = await API.Down_Video(args.link,args.name)
    ctx.response.body = info
})
router.post("/loadVideoLink", async (ctx) => {
    setProxyCookie(ctx)
    if(!ctx.request.body.link)
        ctx.response.body = "链接不存在";
    else{
        let args = ctx.request.body.link
        let link = await API.Load_Video_Link(args)
        ctx.response.body = link;
    }
})

router.post("/list_localfile", async (ctx) => {
    setProxyCookie(ctx)
    let args = ctx.request.body
    let res =  API.List_File(args.path)
    // 分离目录和文件
    const directories = res.filter(file => file.isDirectory);
    const filesOnly = res.filter(file => !file.isDirectory);
    // 对文件按文件名排序
    filesOnly.sort((a, b) => a.name.localeCompare(b.name));
    // 合并目录和文件
    const sortedFiles = directories.concat(filesOnly);
    ctx.response.body = sortedFiles;
})
module.exports = router;