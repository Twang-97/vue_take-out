module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/foo': {
                target: '<other_url>'
            }
        }
    }
}