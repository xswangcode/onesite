const axios = require("../../utils/request")

const helloWorld = () => {
    return axios({
        method: 'get',
        url: "https://www.baidu.com",
        Headers: {
            "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
        }
    }).then((res) => {
        console.log(res)
        return res.data;
    })
}

module.exports = {
    helloWorld: helloWorld
}