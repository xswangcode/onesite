export const PM2_CONFIG = {
    apps: [
        {
            name: "server",
            script: "./server/app.js",
            env:{
                PORT:3001
            }
        },
        {
            name: "static",
            script: "serve",
            env: {
                PM2_SERVE_PATH: './dist',
                PM2_SERVE_PORT: 80
            },
        }
    ],
};
const server_config = PM2_CONFIG.apps.filter(it=>it.name==="server")[0]
export const SERVER_BASE_API_URL = "http://"+window.location.hostname+":"+server_config.env.PORT
console.log("前端指定后端服务器IP:",SERVER_BASE_API_URL)

