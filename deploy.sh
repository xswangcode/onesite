#!/bin/bash

# Set the character encoding to UTF-8
export LANG=C.UTF-8

if [ "$1" = "start" ]; then
    pm2 start ./ecosystem.config.js
elif [ "$1" = "servernpm" ]; then
    cd ./server || exit
    npm install --prefix ..
    npm install pm2@latest -g
    cd ..
elif [ "$1" = "install" ]; then
    cd ./server || exit
    npm install --prefix ..
    npm install pm2@latest -g
    cd ..
elif [ "$1" = "webnpm" ]; then
    npm install
elif [ "$1" = "build" ]; then
    npm run build
elif [ "$1" = "restart" ]; then
    npm run build
    pm2 delete all
    pm2 start ./ecosystem.config.js
elif [ "$1" = "reload" ]; then
    pm2 reload all
elif [ "$1" = "stop" ]; then
    pm2 stop all
elif [ "$1" = "delete" ] || [ "$1" = "del" ]; then
    pm2 delete all
else
    echo "提示: [$1] 未定义的命令 {build|start|restart|reload|stop|delete|del}"
fi