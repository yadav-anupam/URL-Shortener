import { useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from './components/header';
import axios from 'axios'
import { login } from './ReduxStore/authSlice';

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true

function App() {
  const dispatch = useDispatch();
  const isLoggedin = useSelector((state) => state.auth.status) ;
  useEffect(() => {
    if(!isLoggedin){
      axios.get('/user').then((res) => {
        dispatch(login(res.data));
      }).catch((err) => {
      });
    }
    
  }, []);
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default App
