import { configureStore} from '@reduxjs/toolkit'
import userReducer from './modules/user';
import articleReducer from './modules/article';

// 创建跟store组合子模块
const store = configureStore({
    reducer: {
        user: userReducer,
        article: articleReducer
    }
});

export default store;