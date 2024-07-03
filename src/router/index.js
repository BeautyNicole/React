import { createBrowserRouter } from "react-router-dom";

import { AuthRouter}  from '@/components/AuthRouter';
import App from "@/App";
import Login from "@/pages/Login";
import { Suspense, lazy } from "react";

// 实现路由懒加载
// 1. 使用lazy函数对资源进行lazy loading
const Home = lazy(() => import('@/pages/Home'));
const Artical = lazy(() => import('@/pages/Artical'));
const Publish = lazy(() => import('@/pages/Publish'));

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <AuthRouter><App /></AuthRouter>,
        //2. 用Suspens包裹路由
        children: [
            {
                index: true,
                element: <Suspense fallback="Loading..."><Home /></Suspense> 
            },
            {
                path: 'artical',
                element: <Suspense fallback="loading"><Artical /></Suspense>
            },
            {
                path: 'publish',
                element: <Suspense fallback="loading"><Publish /></Suspense>
            }
        ]
    },
    {
        path: '*',
        element: <Login />
    }
]);

export default router;