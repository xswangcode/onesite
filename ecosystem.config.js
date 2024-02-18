module.exports = {
    apps: [
        {
            name: "server",
            cwd: "./",
            script: "node",
            args: "./server/app.js port=3000",
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