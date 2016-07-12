module.exports = {
    port: 3000,
    files: [
        "./src/**/*.js",
        "./demo/**/*"
    ],
    server: {
        baseDir: "./demo",
        middleware: {
            1: require('connect-history-api-fallback')({
                index: './index.html',
                verbose: true
            })
        }
    }
}