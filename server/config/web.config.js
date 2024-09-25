// 目标网站的相关配置
const BASE_URL = "https://0729.9p47q.com/"
const HOT_NOW_URL = BASE_URL
const VIDEO_PAGE_URL = BASE_URL + "view_video.php"
const SEARCH_PAGE_URL = BASE_URL +'search_result.php'
const SOURCE_BEGIN_SPAN = "strencode2("
const SOURCE_END_SPAN = "));"

let Proxy_Cookie = "";

const getVideoPageUrl = (viewkey) => {
    return VIDEO_PAGE_URL + "?viewkey=" + viewkey;
}

const getIndexPageUrl = (args) => {
    let params = "?"
    if(args.urlarg)
        params  += args.urlarg+"&"
    if (args.page)
        return BASE_URL + "/v.php"+params+"page=" + args.page
    return BASE_URL + "/index.php"+params
}

const getSearchPageUrl =(args)=>{
     let url =SEARCH_PAGE_URL+`?search_id=${args.search_id}&search_type=${args.search_type}&min_duration=`;
    if(args.page){
        url += 'page='+args.page;
    }
    return url
}


const getVisitHeaders = () => {
    let header = { 
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",  
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" 
    }
    if(Proxy_Cookie)
        header['cookie'] = Proxy_Cookie
    return header;
}
const setProxyCookie =  (cookie)=>{
    Proxy_Cookie = cookie;
}

module.exports = {
    BASE_URL: BASE_URL,
    HOT_NOW_URL: HOT_NOW_URL,
    VIDEO_PAGE_URL: VIDEO_PAGE_URL,
    SEARCH_PAGE_URL: SEARCH_PAGE_URL, 
    CND_POOL: [],
    getIndexPageUrl: getIndexPageUrl,
    getVisitHeaders:getVisitHeaders,
    getVideoPageUrl:getVideoPageUrl,
    getSearchPageUrl:getSearchPageUrl,
    SOURCE_BEGIN_SPAN:SOURCE_BEGIN_SPAN,
    SOURCE_END_SPAN:SOURCE_END_SPAN,
    setProxyCookie:setProxyCookie,

}