const cheerio = require('cheerio');
const lodash = require('lodash');
const DecryptUtils = require("../../utils/DecryptUtils")
const config = require("../../config/config")
const fs = require("fs");
const path = require("path");
const Aria2Utils = require('../../utils/Aria2DownloadUtil');


//region 解析列表页
const parseItem = (itemhtml) => {
    let $ = cheerio.load(itemhtml)
    let href = $("a").attr('href')
    let imgurl = $(".img-responsive").attr("src")
    let id = parseInt(imgurl.split("/")[imgurl.split("/").length - 1].split(".")[0])
    let title = $(".video-title").text()
    let otherInfo_dom = $(".info")
    let otherInfo = {}
    for (let i = 0; i < otherInfo_dom.length; i++) {
        let title = lodash.trim(lodash.trim(otherInfo_dom[i].firstChild ? otherInfo_dom[i].firstChild.data : ''), "").substring(0, 5)
        title = lodash.trim(title, ":")
        let data = lodash.trim(otherInfo_dom[i].next ? otherInfo_dom[i].next.data : '')
        otherInfo[title] = data
    };
    let result = {
        id: id,
        href: href,
        imgurl: imgurl,
        title: title,
        otherInfo: otherInfo
    }
    return result
}

const loadListFromPageHTML = (html) => {
    let $ = cheerio.load(html)
    const itemlist = $(".well.well-sm.videos-text-align")
    let li = []
    for (let i = 0; i < itemlist.length; i++) {
        let el = itemlist[i]
        let html = cheerio.load(el).html()
        let result_item = parseItem(html)
        li.push(result_item)
    }
    // 分頁信息
    let alist = $(".page_number").parent().children() // 所有子节点
    // 遍历后10个节点 取最大值
    let last10 = alist.splice(-10)
    let maxpage = 0;
    for(let i =0 ;i< last10.length;i++){
        let item  = last10[i]

        let anodehref = item.attribs.href
        let strPage = ''
        try {
            if(!anodehref){
                strPage = item.children[0].data
            }else{
                strPage = getSearchParams(anodehref)["page"]
            }
        } catch (error) {
            strPage = 0
        }
       
        let pagenumber = parseInt(strPage) | 0
        maxpage = maxpage > pagenumber ? maxpage :pagenumber
    } 
    return { li: li, totalPage: maxpage }
}
//endregion

//region 解析视频详情页
const parsePageInfo = (detailHTML) => {
    let $ = cheerio.load(detailHTML)
    let result = {}
    try {
        let player = $("#player_one")
        let sourceHTML = player.html().replaceAll("\n", "").replaceAll("\t", "")
        let beginSpan = config.SOURCE_BEGIN_SPAN
        let endSpan = config.SOURCE_END_SPAN
        let begin = sourceHTML.indexOf(beginSpan) + beginSpan.length
        let end = sourceHTML.indexOf(endSpan)
        let link = sourceHTML.substring(begin, end)
        let text = DecryptUtils.strencode2(link)
        let sourceTag = cheerio.load(text)
        result["link"] = sourceTag("source")[0].attribs['src']
    } catch (err) {
        console.log("===========解析视频链接失败 - begin ==============")
        console.log($.html())
        console.log(err)
        console.log("===========解析视频链接失败 -  end  ==============")
        return null;
    }

    return result
}

const getYMD = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    return year + month + day;
}

/**
 * 下载文件到指定位置
 * @param link 网络url
 * @param fileName 文件名
 * @returns {Promise<string>}
 */
const downloadFile = async (link, fileName) => {
    try {
        let ymdpath = getYMD()
        let save_path = path.join(config.VISIT_PATH, ymdpath);
        // 确保文件夹存在
        if (!fs.existsSync(save_path)) {
            fs.mkdirSync(save_path);
        }
        let path_file = path.join(config.PUSH_ARIA2_PATH, ymdpath)
        console.log("正在下载: " + fileName)
        console.log(link)
        await Aria2Utils.pushUrlDownload(link, fileName, path_file);
        return Promise.resolve(path_file + fileName)
    } catch (err) {
        console.log("==============存储文件失败 - begin ================")
        console.log(err)
        console.log("==============存储文件失败 - end   ================")
    }
}

const getSearchParams = (url) => {
    console.log("url==>",url)
    if(!url){
        return {}
    }
    // 获取查询参数前的 ? 对应的索引位置
    const searchIndex = url.indexOf('?')
    // 截取出查询参数字符串，并根据 & 将其分割成一个个 name=bruce 形式字符串组成的数组
    const searchParamsArray = url.slice(searchIndex + 1).split('&')
    // 遍历数组，组成查询参数对象
    return searchParamsArray.reduce((pre, cur) => {
        const [key, value] = cur.split('=')
        return {
            ...pre,
            // 需要使用 decodeURIComponent 对参数进行解码
            [key]: decodeURIComponent(value),
        }
    }, {})
}

const write_error_down_link = (name,link,vid)=>{
    let res = `${vid}\t\t\t${name}\t\t\t${link}\n`
    fs.appendFileSync(config.ERROE_DOWN_LOG_FILE_PATH +"/"+getYMD()+"downerror.log",res)
}
//endregion

module.exports = {
    loadListFromPageHTML: loadListFromPageHTML,
    parsePageInfo: parsePageInfo,
    downloadFile: downloadFile,
    write_error_down_link,
}