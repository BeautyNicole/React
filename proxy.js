const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = 3100;

const app = express();

app.use('/api', createProxyMiddleware({
    target: 'http://localhost:4000', // 跨域目标接口
    changeOrigin: true,
    on: {
        // https://www.npmjs.com/package/http-proxy-middleware
    }
}));

app.use((request, response, next) => {
    console.log('set header=================');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers',  '*');
    next();
});

app.listen(port, () => {
    console.log('server is running on port ' + port);
});