import { request } from '@/utils';

function fetchUserInfoAPI() {
    // axios通用写法
    // return http({
    //     url: '/userInfo',
    //     method: 'GET',
    // });
    return request.get('/userInfo')
}

function fetchTokenAPI(formData) {
      // axios通用写法
    //   return http({
    //     url: '/userInfo',
    //     method: 'POST',
    //     data: formData
    // });
    // return http.post('/token', formData);
    return request.get('/token');
}

export {
    fetchUserInfoAPI,
    fetchTokenAPI
}