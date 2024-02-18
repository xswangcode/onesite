### 启动步骤
```
切换到工作目录
git clone https://github.com/DogsChen/onesite.git

安装环境
deploy install 

后端配置修改
在这个文件user.config.js下面可以修改下载文件的保存地址,可以修改成你自己的

项目配置修改
ecosystem.config.js 这个文件下可以修改前后端的端口
> PM2_SERVE_PORT: 前端静态文件端口
> args: "./server/app.js port=80":  修改port后面的端口为你自己的后端端口

启动
deploy start

查看
浏览器打开127.0.0.1:3000浏览
```
