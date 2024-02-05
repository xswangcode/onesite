const axios = require("../../utils/request") 
const config = require("../../config/config")




const helloWorld = ()=>{
    return axios({
        method: 'get',
        responseType: 'stream',
        url:"https://api.vvhan.com/api/sao"
    }).then((res)=>{
        return res.data;
    })
}

const baidu_test = async ()=>{
   return await axios({
        method: 'get',
        url: "http://httpbin.org/headers"
    })
}

module.exports = {
    helloWorld:helloWorld,
    baidu_test:baidu_test
}