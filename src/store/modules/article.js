import { createSlice } from '@reduxjs/toolkit';
import { fetchArticlesAPI } from '@/apis/articles';

const articleStore = createSlice({
    name: 'article',
    // 初始状态数据
    initialState: {
        articleList: []
    },
    // 
    reducers: {
        setArticleList(state, action) {
            state.articleList = action.payload;
        }
    }
});

// 解构出创建action对象的函数 （actionCreator）
const { setArticleList } = articleStore.actions;

const getArticleList = (params) => {
    return async (dispatch) => {
        const res = await fetchArticlesAPI(params);
        dispatch(setArticleList(res.data));
    }
}

export { getArticleList };

// 获取reducer函数
const articleReducer = articleStore.reducer;

export default articleReducer;