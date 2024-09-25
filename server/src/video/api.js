const axios = require("../../utils/request")
const DecryptUtils = require("../../utils/DecryptUtils")
const cheerio = require('cheerio');
const config = require("../../config/config")
const common = require("./common")
const fs = require('fs');
const path = require('path');

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
        url: config.getIndexPageUrl(args),
        headers: config.getVisitHeaders()
    })
    console.log(config.getIndexPageUrl(args))
    let list_hot_now = common.loadListFromPageHTML(response.data)
    return list_hot_now
}

const search_page = async (args) =>{
    let headers = config.getVisitHeaders()
    if(!headers.cookie){
        throw new Error('查询必须拥有Cookie！');
    }
    let response = await axios({
        method: 'get',
        url: config.getSearchPageUrl(args),
        headers: headers,
    })
    console.log(config.getSearchPageUrl(args))
    let data = common.loadListFromSearchPageHTML(response.data) // {li: li, totalPage: maxpage}
    return data
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

const parse_video_link = async (link)=>{
    let response = await  axios({
        method:"get",
        url:link,
        headers:config.getVisitHeaders(),
    })
    let detail = common.parsePageInfo(response.data)
    if(!detail)
        return Promise.reject("未成功解析到直链！");
    return detail["link"]
}


const down_video = async (link, file_name) => {
    file_name = file_name.replaceAll("/",'')
    let ymdpath = common.getYMD()
    let isdown = common.check_isdownload(file_name+".mp4")
    if(isdown)
        return  "已下载过！"

    let response = await  axios({
        method:"get",
        url:link,
        headers:config.getVisitHeaders(),
    })
    let detail = common.parsePageInfo(response.data)
    if(!detail){
        common.write_error_down_link(link,file_name,0)
        return Promise.reject("detail is null");
    }
    let path_file = await common.downloadFile(detail["link"], file_name+".mp4")
    return "下载完成!" 
}


const list_file = (basepath) => {
    
    if(basepath!=""){
        basepath = path.join(config.VISIT_PATH,basepath)
    }else{
        basepath = config.VISIT_PATH
    }
    
    const fileList = fs.readdirSync(basepath);
    const result = [];

    fileList.forEach(file => {
        const filePath = path.join(basepath, file);
        const stats = fs.statSync(filePath);
        const attributes = {
            name: file,
            path: filePath,
            isDirectory: stats.isDirectory(),
            size: (stats.size / 1024/1024).toFixed(2) +"MB",
            createdAt: stats.birthtimeMs,
            updatedAt: stats.mtimeMs
        };
        result.push(attributes);
    });
    return result;
}

module.exports = {
    Index_Page: index_page,
    Hot_page: hot_page,
    Detail_Page: detail_page,
    Down_Video:down_video,
    List_File:list_file,
    Load_Video_Link:parse_video_link,
    Search_Page: search_page,
}