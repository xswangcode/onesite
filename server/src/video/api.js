const axios = require("../../utils/request")
const DecryptUtils = require("../../utils/DecryptUtils")
const cheerio = require('cheerio');
const config = require("../../config/config")
const common = require("./common")


/**
 * 1. 首页接口，并可以传page参数
 * 2. 热门接口，可传page
 * 3. 详情接口，传viewkey
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
        headers: config.getVisitHeaders()
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
        headers: config.getVisitHeaders(),
        url: config.getHotPageUrl(args.page)
    })
    let list_hot_now = common.loadListFromPageHTML(response.data)
    return list_hot_now
}

/**
 * 详情接口
 * @param {*} viewkey
 * @returns
 */
const detail_page = async (viewkey) => {
    let response = await axios({
        method: 'get',
        headers: config.getVisitHeaders(),
        url: config.getVideoPageUrl(viewkey)
    })
    let info = common.parsePageInfo(response.data)
    return info
}


const down_video = async (link, file_name) => {
    let response = await  axios({
        method:"get",
        url:link,
        headers:config.getVisitHeaders(),
    })
    let detail = common.parsePageInfo(response.data)
    if(!detail)
        return "error:detail is null";
    let path_file = await common.downloadFile(detail["link"], config.FILE_SAVE_PATH, file_name+".mp4")
    return {path:path_file}
}

module.exports = {
    Index_Page: index_page,
    Hot_page: hot_page,
    Detail_Page: detail_page,
    Down_Video:down_video
}