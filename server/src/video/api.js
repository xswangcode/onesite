const axios = require("../../utils/request") 



/**
 * 
 * @returns 返回当前最热门的视频
 */
const hot_now = (args)=>{
    return axios({
        method: 'get',
        responseType: 'stream',
        url:"https://api.vvhan.com/api/hotlist?type=huPu" 
    }).then((res)=>{
        return res.data;
    })
}

module.exports = {
    HotNow:hot_now
}