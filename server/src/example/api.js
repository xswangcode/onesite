const axios = require("../../utils/request") 

const helloWorld = ()=>{
    return axios({
        method: 'get',
        responseType: 'stream',
        url:"https://api.vvhan.com/api/sao"
    }).then((res)=>{
        return res.data;
    })
}

module.exports = {
    helloWorld:helloWorld
}