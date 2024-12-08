import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import './styles/index.scss' 
import { RouterProvider } from 'react-router-dom'
import Router from './router/router'
import { Provider } from 'react-redux'
import store from './ReduxStore/store'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <ToastContainer  position="top-center" 
        theme="colored" 
        closeOnClick/>
    <RouterProvider router={Router} >
    </RouterProvider>
    </Provider>,
)
