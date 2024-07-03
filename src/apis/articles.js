import { request } from '@/utils/request';

function fetchChannelsAPI() {
    return request({
        url: '/channels',
        method: 'GET',
        transformResponse: [function(data) {
            const dataRes = JSON.parse(data);
            dataRes.data.channels.forEach(item => {
                item.desc = `description of ${item.name}`;
            })

            return dataRes;
        }],

    }).catch(error => {
        if (error.response) {
            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            return null;
        } else if (error.request) {
            // 请求已经成功发起，但没有收到响应
            // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
            // 而在node.js中是 http.ClientRequest 的实例
            console.log(error.request);
            console.log('request was sent but fail to get response')
        } else {
            // 发送请求时出了点问题
            console.log('Error', error.message);
            console.log('fail to send request')
        }
        console.log(error.config);
        return new Error('fail to send request')
    });
}

function createNewArticleAPI(data) {
    ;
    console.log('new article data', data)
    return request({
        url: '/newArticleCreation',
        method: 'GET',
        // data
    });
}

function fetchArticlesAPI(params) {
    console.log('fetching article list...', params);
    return request({
        url: '/articles',
        method: 'GET',
        params
    });
}

function deleteArticleByIdAPI(id) {
    console.log('deleting article...', id);
    return request({
        // url: `/deleteArticle/${id}`,
        // method: 'DELETE'
        url: '/deleteArticle',
        method: 'GET'
    });
}

function getArticleByIdAPI(id) {
    console.log('getting article by id ====>', id);
    return request({
        url: `getArticleById?id=${id}`,
        method: 'GET'
    })
}

export { fetchChannelsAPI, createNewArticleAPI, fetchArticlesAPI, deleteArticleByIdAPI, getArticleByIdAPI }