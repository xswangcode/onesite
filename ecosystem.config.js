const PM2_CONFIG = {
    apps: [
        {
            name: "server",
            script: "./server/app.js",
            env:{
                PORT:80
            }
        }
    ],
};

module.exports = PM2_CONFIG
