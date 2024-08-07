### 启动步骤
```
切换到工作目录
git clone https://github.com/DogsChen/onesite.git

安装环境
deploy install 

项目配置修改
> PM2_CONFIG.apps[0].env.PORT = 80  修改port后面的端口为你自己的后端端口

启动
deploy start

查看
浏览器打开http://127.0.0.1:5123/index.html浏览
> http://127.0.0.1:5123/video/index/1 -> 测试接口
```

### 直接从github更新项目
```
git pull
deploy reload
```

### 开发环境
```
终端1 > npm run dev
终端2 > node ./server/app.js
```
