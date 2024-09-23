const fs = require('fs')
const { GetAllFile } = require("../utils/FileUtils")
let DownloadedList = []


const addFile = (name, path) => {
    DownloadedList.push({ name: name, path: path })
    fs.writeFileSync('./downloadedList.db',JSON.stringify(DownloadedList))
    console.log("缓存成功！");
    
}

const initList = (visit_path) => {
    DownloadedList = GetAllFile(visit_path)
    fs.writeFileSync('./downloadedList.db',JSON.stringify(DownloadedList))
    console.log("初始化已下载清单成功！size:", DownloadedList.length);
}
const getDownloadedList = ()=>{
    return DownloadedList;
}

module.exports = {
    addFile: addFile,
    initList: initList,
    getDownloadedList:getDownloadedList,
}