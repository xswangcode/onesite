const BASE_URL = "http://f0119.workarea5.live/"
const HOT_NOW_URL = "http://f0119.workarea5.live/"
const VIDEO_PAGE_URL = BASE_URL + "view_video.php"
const SOURCE_BEGIN_SPAN = "strencode2("
const SOURCE_END_SPAN = "));"

const getVideoPageUrl = (viewkey) => {
    return VIDEO_PAGE_URL + "?viewkey=" + viewkey;
}

const getIndexPageUrl = (page) => {
    if (page)
        return BASE_URL + "/v.php?page=" + page
    return BASE_URL + "/index.php"
}
const getHotPageUrl = (page) => {
    if (page)
        return HOT_NOW_URL + "/v.php?page=" + page
    return HOT_NOW_URL + "?page" + page;
}


const getVisitHeaders = () => {
    return {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
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
}

module.exports = {
    BASE_URL: BASE_URL,
    HOT_NOW_URL: HOT_NOW_URL,
    VIDEO_PAGE_URL: VIDEO_PAGE_URL,
    CND_POOL: [],
    getHotPageUrl: getHotPageUrl,
    getIndexPageUrl: getIndexPageUrl,
    getVisitHeaders:getVisitHeaders,
    getVideoPageUrl:getVideoPageUrl,
    SOURCE_BEGIN_SPAN:SOURCE_BEGIN_SPAN,
    SOURCE_END_SPAN:SOURCE_END_SPAN,

}