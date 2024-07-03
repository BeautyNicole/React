import axios from 'axios';
import { getToken, removeToken } from '@/utils'
import router from '@/router';

// axios.defaults.withCredentials = true;
// axios.defaults.crossDomain = true;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios 封装处理 - https://www.axios-http.cn/docs/req_config
const request = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 5000,
    // withCredentials: false, // default
    // responseType: 'json', //default
    // responseEncoding: 'utf8', // default
    // xsrfCookieName: 'XSRF-TOKEN', // 是xsrf token的值，被用作cookie的名称
    // xsrfHeaserName: 'X-XSRF-TOKEN', //默认值 - 是带有xsrf token值的http 请求头名称，
    // `proxy` 定义了代理服务器的主机名，端口和协议。
    // 您可以使用常规的`http_proxy` 和 `https_proxy` 环境变量。
    // 使用 `false` 可以禁用代理功能，同时环境变量也会被忽略。
    // `auth`表示应使用HTTP Basic auth连接到代理，并且提供凭据。
    // 这将设置一个 `Proxy-Authorization` 请求头，它会覆盖 `headers` 中已存在的自定义 `Proxy-Authorization` 请求头。
    // 如果代理服务器使用 HTTPS，则必须设置 protocol 为`https`
    // proxy: {
    //     protocol: 'https',
    //     host: '127.0.0.1',
    //     port: 9000,
    //     auth: {
    //         username: 'mikeymike',
    //         password: 'rapunz3l'
    //     }
    // },

});

// 请求拦截器
// 在请求发送之前拦截， 插入一些自定义配置【参数的处理】
request.interceptors.request.use((config) => {
    console.log('===http request interceptor===');
    config.headers['Content-Type'] = "application/json";
    config.transformRequest = [function (data) {
        data = JSON.stringify(this.params);
        return data;
    }]

    // 设置请求头token
    const token = getToken();
    if (token) {
        // config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


// 响应拦截器
// 在响应返回客户端前做拦截， 重点处理返回的数据
request.interceptors.response.use((response) => {
    console.log('===http response interceptor===');
    // 2xx 范围内的状态码会触发该函数
    // 对响应数据做相应处理
    return response;
}, (error) => {
    // 非2xx 范围内状态码会触发此函数
    // 对响应数据做响应处理

    // 处理token失效
    if (error.response.status === 401) {
        removeToken();
        router.navigate('/login');
        window.location.reload();
    }
    return Promise.reject(error);
});

export { request }
