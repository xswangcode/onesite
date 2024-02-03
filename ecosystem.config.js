module.exports = {
    apps: [
        {
            name: "server",
            cwd: "./",
            script: "node",
            args: "./server/app.js port=80",
        },
        {
            name: "static",
            script: "serve",
            env: {
                PM2_SERVE_PATH: './dist',
                PM2_SERVE_PORT: 8080
            },
        }
    ],
};