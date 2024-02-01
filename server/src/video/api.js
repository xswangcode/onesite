const axios = require("../../utils/request") 
const cheerio = require('cheerio');
const config = require("../../config/config")


const loadListInfoFromHTML = ()=>{

}
/**
 * 
 * @returns 返回当前最热门的视频
 */
const hot_now = async (args)=>{
    let response = axios({
        method: 'get',
        responseType: 'stream',
        url: config.getHotNowListUrl(args.page)
    })
    let list_hot_now = loadListInfoFromHTML(response.data)
    return list_hot_now
}

const loadVideoInfoFromHTML=(html)=>{
    let result = {}
    let $ = cheerio.load(html)

    return result
}
const getVideoInfoByViewKey = async (viewkey)=>{
    let response = await axios({method:"get",url:config.getVideoPageUrl(viewkey),headers:config.getVideoPageHeaders()})
    let page_html = response.data
    // 从页面中解析信息
    let info = loadVideoInfoFromHTML(page_html)
    return info;
}


module.exports = {
    HotNow:hot_now,
    GetVideoInfoByViewKey:getVideoInfoByViewKey
}