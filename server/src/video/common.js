const cheerio = require('cheerio'); 
const lodash = require('lodash');
const axios = require("../../utils/request");
const DecryptUtils = require("../../utils/DecryptUtils")

//region 解析列表页
const parseItem = (itemhtml)=>{ 
    let $= cheerio.load(itemhtml)
    let href = $("a").attr('href')
    let imgurl = $(".img-responsive").attr("src")
    let id = parseInt(imgurl.split("/")[imgurl.split("/").length-1].split(".")[0])
    let title = $(".video-title").text()
    let otherInfo_dom = $(".info")
    let otherInfo = {}
    for(let i = 0; i < otherInfo_dom.length; i++){
        let title  =  lodash.trim(lodash.trim(otherInfo_dom[i].firstChild? otherInfo_dom[i].firstChild.data:''),"").substring(0,5)
        let data =  lodash.trim(otherInfo_dom[i].next ? otherInfo_dom[i].next.data : '')
        otherInfo[title] = data
    };
    let result = {
        id:id,
        href: href,
        imgurl:imgurl,
        title:title,
        otherInfo:otherInfo
    }
    return result
}

const loadListFromPageHTML = (html)=>{
    let $ =  cheerio.load(html)
    const itemlist = $(".well.well-sm.videos-text-align")
    let li = []
    for(let i = 0; i < itemlist.length ;i++){
        let el = itemlist[i]
        let html = cheerio.load(el).html()
        let result_item = parseItem(html)
        li.push(result_item)
    }
    return li
}
//endregion

//region 解析视频详情页
const parsePageInfo = (detailHTML)=>{
    let $= cheerio.load(detailHTML)
    let result = {}
    let player = $("#player_one")
    let sourceHTML = player.html()
    let begin  = sourceHTML.indexOf("strencode2(") + "strencode2(".length
    let end = sourceHTML.indexOf("));") 
    let link = sourceHTML.substring(begin  ,end)
    let text = DecryptUtils.strencode2(link)
    let sourceTag = cheerio.load(text)
    result["link"] = sourceTag._root.children[0].children[1].children[1].attribs["src"]
    return result
}
//endregion

module.exports = {
    loadListFromPageHTML:loadListFromPageHTML,
    parsePageInfo:parsePageInfo
}