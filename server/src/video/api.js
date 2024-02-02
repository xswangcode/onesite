const axios = require("../../utils/request")
const cheerio = require('cheerio');
const config = require("../../config/config")
const common = require("./common")


/**
 * 1. 首页接口，并可以传page参数
 * 2. 热门接口，可传page
 * 3. 其他查询接口待开发
 * 4. 本地star接口，
 * 5. 本地下载接口
 */

/**
 * 首页接口，并可以传page参数
 * @returns 返回首页的视频
 */
const index_page = async (args) => {
    let response = await axios({
        method: 'get',
        url: config.getIndexPageUrl(args.page),
        headers:config.getVisitHeaders()
    })
    let list_hot_now = common.loadListFromPageHTML(response.data)
    return list_hot_now
}


/**
 * 热门接口，可以传page字段
 * @param {} args 
 * @returns 
 */
const hot_page = async (args) => {
    let response = await axios({
        method: 'get',
        headers:config.getVisitHeaders(),
        url: config.getHotPageUrl(args.page)
    })
    let list_hot_now = common.loadListFromPageHTML(response.data)
    return list_hot_now
}

module.exports = {
    Index_Page: index_page,
    Hot_page: hot_page,
}