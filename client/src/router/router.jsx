import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainPage from "../pages/mainpage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import App from "../App"
import Redirector from "../components/redirector";
import HistoryPage from "../pages/history";

const Router = createBrowserRouter([{
    path: "/",
    element: <App/>,
    children :[
        {
            path : "/:shortId" ,
            element : <Redirector/>
        },
        {
            path : "/",
            element : <MainPage/>
        },
        {
            path : "/login",
            element : <LoginPage/>
        },
        {
            path : "/signup",
            element : <SignupPage/>
        },
        {
            path : "*",
            element : <h1>404 Not Found</h1>
        },
        {
            path : "/history",
            element : <HistoryPage/>
        }

    ]
}]);

export default Router;