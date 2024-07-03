import { createSlice } from '@reduxjs/toolkit';
import { fetchTokenAPI, fetchUserInfoAPI } from '@/apis/user'
import { getToken as _getToken, setToken as _setToken, removeToken } from '@/utils';

const userStore = createSlice({
    name: 'user',
    // 初始状态数据
    initialState: {
        userInfo: null,
        token: _getToken() || ''
    },
    reducers: {
        setUser(state, action) {
            state.userInfo = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
            _setToken(action.payload);
        },
        clearUserInfo(state, action) {
            state.token = '';
            state.userInfo = {};
            removeToken();
        }
    }
});

// 解构出创建action对象的函数 （actionCreator）
const { setUser, setToken, clearUserInfo } = userStore.actions;

// 异步
const getUserInfo = () => {
    return async (dispatch) => {
        const res = await fetchUserInfoAPI();
        dispatch(setUser(res.data));
    };
}

const getToken = (formData) => {
    return async (dispatch) => {
        const res = await fetchTokenAPI(formData);
        dispatch(setToken(res.data));
    }
}

export { getUserInfo, getToken, clearUserInfo }

// 获取reducer函数并导出
const userReducer = userStore.reducer;
export default userReducer;