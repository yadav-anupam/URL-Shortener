import React , {useState}from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineVisibility , MdOutlineVisibilityOff} from "react-icons/md";
import { toast } from "react-toastify";

export default function SignupPage (){
    const isLoggedIn = useSelector((state) => state.auth.status);
    const [showPassword, setShowPassword] = useState(false);
    
    const [password, setPassword] = useState("");
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState(null);
    const [validity, setValidity] = useState({
      length: false,
      uppercase: false,
      number: false,
      special: false,
    });

    const regex = {
        length: /.{8,}/,
        uppercase: /[A-Z]/,
        number: /\d/,
        special: /[!@#$%^&*(),.?":{}|<>]/,
    };

    const checkValidity = (value) => {
        setValidity({
          length: regex.length.test(value),
          uppercase: regex.uppercase.test(value),
          number: regex.number.test(value),
          special: regex.special.test(value),
        });
      };

      const allValid = Object.values(validity).every(Boolean);
    
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        checkValidity(value);
      };

      const handleFocus = () => {
        setDropdownVisible(true);
      };
    
      const handleBlur = () => {
        setDropdownVisible(false);
      };

    const togglePasswordVisibility = (ev) => {
        ev.preventDefault();
        setShowPassword((prevState) => !prevState);
    };
    
    async function handleSignupSubmit(ev) {

        ev.preventDefault();
        if(!allValid) { return toast.error('Password does not meet the requirements'); }  
        const email = ev.target.email.value;
        const password = ev.target.password.value;
        const name = ev.target.name.value;
        try {
            const {data} = await axios.post('/user/register', {name , email , password});
            toast.success('Signup successful');
        } catch (e) {
            if(e.response.status === 409) {
                toast.error('User already exists');
            } else {
                toast.error('An error occurred please try again later');
            }
            
        }
    }
    
    return (
        <div className="signup-page">
            {isLoggedIn ? <Navigate to="/"/> : null}
            <div className="regQuote">Register now and forget about long URLs!</div>
            <div className="signup">
                <h1 className="head">Create an account
                    <p className="loginred">Already have an account <Link to='/login'> login </Link> </p>
                </h1>
                <form method="post" onSubmit={handleSignupSubmit} className="fields">
                    <div>
                        <label className="field">What should we call you?</label>
                        <input type="text" placeholder="Enter your name" name="name"/>
                    </div>
                    <div>
                        <label className="field">What's your email?</label>
                        <input type="email" placeholder="Enter your email" name="email"/>
                    </div>
                    <div>
                        <label className="field">Create a password <button  className="cpBTN" onClick={togglePasswordVisibility} style = {{cursor : "pointer"}} > {showPassword ? <MdOutlineVisibility/>: <MdOutlineVisibilityOff/>}
                        </button></label>
                        <input type={showPassword ? "text" : "password"} placeholder="Enter your password" name="password" onChange={handlePasswordChange} onFocus={handleFocus} onBlur={handleBlur} />
                        {isDropdownVisible && !allValid && (
                            <ul className="validity-dropdown">
                                <li className={`requirement ${validity.length ? "valid" : "invalid"}`}>Atleast 8 characters</li>
                                <li className={`requirement ${validity.uppercase ? "valid" : "invalid"}`}>Atleast one uppercase letter (A-Z)</li>
                                <li className={`requirement ${validity.number ? "valid" : "invalid"}`} >Atleast one number  </li>
                                <li className={`requirement ${validity.special ? "valid" : "invalid"}`}>Atleast one special character (!@#$...)</li>
                            </ul>
                        )}
                    </div>
                    <button className="sgnBTN">Signup</button>
                </form>
            </div>
        </div>
    )
}