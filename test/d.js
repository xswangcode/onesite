const fs=require('fs');
const path=require('path');
/**
 * 遍历指定目录下的所有文件
 * @param {*} dir 
 */
const getAllFile = function(dir){
    let res=[]
    function traverse(dir){
        fs.readdirSync(dir).forEach((file)=>{
            const pathname=path.join(dir,file)
            if(fs.statSync(pathname).isDirectory()){
                traverse(pathname)
            }else{
                if(file.endsWith("mp4"))
                    res.push({
                        name:file.replace('.mp4',''),
                        path:pathname
                    })
            }
        })
    }
    traverse(dir)
    return res;
}



console.log(getAllFile('e://save')[0])