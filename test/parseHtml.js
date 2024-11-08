const fs = require("fs")
const cheerio = require('cheerio');
const config = require("D:\\code\\vscode\\onesite\\onesite\\server\\config\\config.js");
// const fetch = require('node:fetch')

let html = fs.readFileSync("D:\\code\\vscode\\onesite\\onesite\\test\\html..html").toString()

// console.log(html);



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
        throw err
    }

    return result
}


// 解析失败使用这个方式再次尝试一下
const getVideoURL = (sourceHTML)=>{
    let begin = sourceHTML.indexOf("encryptedUrl: '") +"encryptedUrl: '".length;
    let end = sourceHTML.indexOf("' }),");
    console.log(sourceHTML.substring(begin,end));
}

// parsePageInfo(html)


let URL= getVideoURL(html)
