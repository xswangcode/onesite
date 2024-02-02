module.exports = {

    apps: [
        {
            name: "server",
            cwd: "./",
            script: "node",
            args: "./server/app-koa.js",
            env:{
                PM2_SERVE_PORT: 80
            }
        }, {
            name:"static",
            script: "serve",
            env: {
                PM2_SERVE_PATH: './dist',
                PM2_SERVE_PORT: 8080
            },
        }
    ],
};