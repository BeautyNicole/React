import './App.scss';
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { getUserInfo } from './store/modules/user';
import GeekLayout from '@/pages/GeekLayout';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch]);

  return (
    <div className="App">
      <GeekLayout />
    </div>
  );
}

export default App;
