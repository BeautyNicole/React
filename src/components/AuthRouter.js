import { getToken } from '@/utils';
import { Navigate } from 'react-router-dom';

export function AuthRouter({ children }) {;
    const token = getToken();
    if (token) {
        console.dir('children------>', children);
        return <>{children}</>
    } else {
        console.log('Go back to login page')
        return <Navigate to={'/login'} replace />
    }
}