const BASE_URL = "http://www.baidu.com"
const HOT_NOW_URL = "https://api.vvhan.com/api/hotlist?type=huPu"
const VIDEO_PAGE_URL  = ""


const getVideoPageUrl = (viewkey)=>{
    return VIDEO_PAGE_URL+"?viewkey"+viewkey;
}
const getHotNowListUrl = (pageNumber)=>{
    return HOT_NOW_URL+"?page"+pageNumber;
}
const getVideoPageHeaders = ()=>{
    return {}
}

const test= ()=>{}
module.exports = {
    BASE_URL: BASE_URL,
    HOT_NOW_URL:HOT_NOW_URL,
    VIDEO_PAGE_URL:VIDEO_PAGE_URL,
    CND_POOL:[],
    test:test,
    getVideoPageUrl:getVideoPageUrl,
    getHotNowListUrl:getHotNowListUrl
}