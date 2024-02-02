const cheerio = require('cheerio'); 
const lodash = require('lodash');
const axios = require("../server/utils/request");


const parseItem = (itemhtml)=>{ 
    let $= cheerio.load(itemhtml)
    let href = $("a").attr('href')
    let imgurl = $(".img-responsive").attr("src")
    let id = parseInt(imgurl.split("/")[imgurl.split("/").length-1].split(".")[0])
    let title = $(".video-title").text()
    let otherInfo_dom = $(".info")

    let otherInfo = {}
    for(let i = 0; i < otherInfo_dom.length; i++){
        let title  =  lodash.trim(otherInfo_dom[i].firstChild? otherInfo_dom[i].firstChild.data:'').substring(0,5)
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
    console.log(JSON.stringify(result))
    return result
}

const load24list = (html)=>{
    let $ =  cheerio.load(html)
    const itemlist = $(".well.well-sm.videos-text-align")
    console.log(itemlist.length)

    let li = []
    for(let i = 0; i < itemlist.length ;i++){
        let el = itemlist[i]
        let html = cheerio.load(el).html()
        let result_item = parseItem(html)
        li.push(result_item)
    }
    console.log(JSON.stringify(li))
}



axios({
    "method": "get",
    // "url":"https://www.baidu.com",
    "url":"http://f0119.workarea5.live/index.php",
    // "url":"http://www.91pron.com",
    // "url":"http://23.225.67.83:3355/?r=aHR0cDovL3d3dy45MXByb24uY29t",
    "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7", 
        "Accept-Encoding": "gzip, deflate, br", 
        "Accept-Language": "zh-CN,zh;q=0.9", 
        // "Host": "httpbin.org", 
        "Sec-Ch-Ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"", 
        "Sec-Ch-Ua-Mobile": "?0", 
        "Sec-Ch-Ua-Platform": "\"Windows\"", 
        "Sec-Fetch-Dest": "document", 
        "Sec-Fetch-Mode": "navigate", 
        "Sec-Fetch-Site": "none", 
        "Sec-Fetch-User": "?1", 
        "Upgrade-Insecure-Requests": "1", 
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", 
        "X-Amzn-Trace-Id": "Root=1-65bc55cf-3d5886b87de766b03dec3873"
      } 
}).then(res=>{
    console.log("===============================");
    // console.log(res.data)
    // const $ = cheerio.load(res.data)
    load24list(res.data)
    console.log("===============================");

}).catch(err=>{
    console.log(err) 
})

