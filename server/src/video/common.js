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
    return li
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
        console.log(err)
        console.log("===========解析视频链接失败 -  end  ==============")
        return null;
    }

    return result
}


/**
 * 下载文件到指定位置
 * @param link 网络url
 * @param save_path 本地存储位置
 * @param fileName 文件名
 * @returns {Promise<string>}
 */
const downloadFile = async (link, save_path, fileName) => {
    try {
        // 确保文件夹存在
        if (!fs.existsSync(save_path)) {
            fs.mkdirSync(save_path);
        }
        let path_file = path.join(save_path, fileName)
        console.log("正在下载: " + fileName)
        console.log(link)
        await Aria2Utils.pushUrlDownload(link, fileName);
        return Promise.resolve(path_file)
    } catch (err) {
        console.log("==============存储文件失败 - begin ================")
        console.log(err)
        console.log("==============存储文件失败 - end   ================")
        return Promise.reject("存储文件失败")
    }
}
//endregion

module.exports = {
    loadListFromPageHTML: loadListFromPageHTML,
    parsePageInfo: parsePageInfo,
    downloadFile: downloadFile,
}