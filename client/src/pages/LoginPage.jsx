import axios from "axios";
import React , {useState} from "react";
import { Navigate } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { login } from "../ReduxStore/authSlice"
import { MdOutlineVisibility , MdOutlineVisibilityOff} from "react-icons/md";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function LoginPage (){
    const isLoggedIn = useSelector((state) => state.auth.status) ;
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = (ev) => {
        ev.preventDefault();
        setShowPassword((prevState) => !prevState);
    };

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        const email = ev.target.email.value;
        const password = ev.target.password.value;
        try {
            const {data} = await axios.post('/user/login', {email , password});
            dispatch(login(data));
            toast.success('Login successful');
        } catch (e) {
            console.error(e);
            if(e.response.status === 401) {
                toast.error('Wrong password');
            } else if(e.response.status === 404) {
                toast.error('User not found');
            } else {
                toast.error('An error occurred please try again later');
            }
            
        }
    }
    
    return (
        <div className="login-page">
            {isLoggedIn ? <Navigate to="/"/> : null}
            <div className="logQuote">Welcome Back! Let's Short it.</div>
            <div className="login">
                <h1 className="loginhead">Login to your account
                    <p className="SignRed">Don't have an account? <a href="/signup">Register</a></p>  
                </h1>    
                <form method="post" onSubmit={handleLoginSubmit} className="login-form">
                    <div>
                        <label>What's your email?</label>
                        <input type="email" placeholder="Enter your email" name="email"/>
                    </div>
                    <div>
                        <label>Password <button className="cpBTN" onClick={togglePasswordVisibility} style = {{cursor : "pointer"}} > {showPassword ? <MdOutlineVisibility/>: <MdOutlineVisibilityOff/>}
                        </button></label>
                        <input type={showPassword ? "text" : "password"} placeholder="Enter your password" name="password"/>
                    </div>  
                        <button className="lgnBTN">Login</button>
                </form>
            </div>
        </div>
    )
}