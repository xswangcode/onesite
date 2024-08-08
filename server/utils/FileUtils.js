//引入相关资源包
var fs = require("fs");
var path = require("path");
var request = require("request");

/**
 * 
 * @param {*} url  网络文件url地址
 * @param {*} fileName 	文件名
 * @param {*} dir 下载到的目录
 */
function getfileByUrl(url,fileName,dir){
        console.log('------------------------------------------------')
        console.log(url)
        console.log(fileName)
        console.log(dir)

        let writeStream = fs.createWriteStream(path.join(dir, fileName));
        var readStream = request(url)
        readStream.pipe(writeStream);
        readStream.on('end', function(response) {
            console.log("文件" + fileName + "下载完毕");
            writeStream.end();
        });
        readStream.on("close", function (err) {
            console.log("文件" + fileName + "下载完毕");
        });

        writeStream.on("finish", function() {
            console.log("ok");
        });
}

/**
 * 写入文本信息到文件中
 * @param {*} path 文件路径
 * @param {*} data 文本
 * @param {*} callback 回调
 */
const OutToFile = (path,data, callback)=>{
    fs.writeFile(path,data,'utf8',function(error){
        if(error){
            console.log(error);
            return false;
        }
        console.log('写入成功');
        if(callback){
            callback()
        }
    })
}

/**
 * 从指定的文件中读取文本
 * @param {*} path 
 * @returns 
 */
const ReadFromFile = (path)=>{
    let content  = fs.readFileSync(path,{encoding:'utf8'})
    return content;
}


/**
 * 写入二进制内容到文件
 *  flags	描述  
 *   r	    以读取模式打开文件。如果文件不存在抛出异常。  
 *   r+	    以读写模式打开文件。如果文件不存在抛出异常。  
 *   rs	    以同步的方式读取文件。  
 *   rs+	    以同步的方式读取和写入文件。  
 *   w	    以写入模式打开文件，如果文件不存在则创建。  
 *   wx	    类似 ‘w’，但是如果文件路径存在，则文件写入失败。  
 *   w+	    以读写模式打开文件，如果文件不存在则创建。  
 *   wx+	类似 ‘w+’， 但是如果文件路径存在，则文件读写失败。  
 *   a	    以追加模式打开文件，如果文件不存在则创建。  
 *   ax	    类似 ‘a’， 但是如果文件路径存在，则文件追加失败。  
 *   a+	    以读取追加模式打开文件，如果文件不存在则创建。  
 *   ax+	    类似 ‘a+’， 但是如果文件路径存在，则文件读取追加失败。  
 * @param {*} path 文件路径
 * @param {*} flags 文件打开的行为
 */
const writeFileWithBin = (path,bin_data=null,flags='a',cb =()=>{})=>{
    try{
        fs.writeFileSync(path,bin_data,{flags:flags})
    }catch(err){
        console.error(err)
        return err
    }finally{

    }
}

module.exports = {
    GetfileByUrl:getfileByUrl,
    OutToFile:OutToFile,
    ReadFromFile:ReadFromFile,
    WriteFileWithBin:writeFileWithBin
}