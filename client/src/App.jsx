import { useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from './components/header';
import axios from 'axios'
import { login } from './ReduxStore/authSlice';


function App() {
  const dispatch = useDispatch();
  const isLoggedin = useSelector((state) => state.auth.status) ;

  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  axios.defaults.baseURL = backendUrl;
  axios.defaults.withCredentials = true

  useEffect(() => {
    if(!isLoggedin ){
      axios.get('/user').then(({data}) => {
        console.log(data);
        if(data.name !== null && data.email !== null && data._id !== null){
          dispatch(login(data));
        }
      }).catch((err) => {
        console.error('Error fetching user:', err);
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
