chcp 65001
@echo off

if "%1" == "start" (
    pm2 start
) else if "%1" == "servernpm" (
    cd ./server && npm install  --prefix .. && npm install pm2@latest -g && cd ..
) else if "%1" == "webnpm" (
    npm install
) else if "%1" == "build" (
    npm run build
) else if "%1" == "restart" (
    npm run build
    pm2 delete all
    pm2 start
) else if "%1" == "reload" (
    pm2 reload all
) else if "%1" == "stop" (
    pm2 stop all
) else if "%1" == "delete"   (
    pm2 delete all
) else if "%1" == "del" (
    pm2 delete all
) else (
    echo "提示: 【%1】 未定义的命令 {build|start|restart|reload|stop|delete|del}"
)

