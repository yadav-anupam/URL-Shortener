import React, { useState } from "react";
import { useSelector  } from "react-redux";
import LoginBtn from "./loginBtn";
import RegisterBtn from "./registerBtn";
import { useLocation } from "react-router-dom";
import { CiCircleChevDown } from "react-icons/ci";
import DropMenu from "./dropdown";

export default function Header() {
    const isLoggedIn = useSelector((state) => state.auth.status);
    const location = useLocation().pathname;
    const isLoginPage = location === "/login";
    const isRegisterPage = location === "/signup";
    const name = useSelector((state) => state.auth.userData?.name);
    const first_name = name?.split(' ')[0];
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <header className="header">
            <h1 className="brName">Shrink.it</h1> 
            <div className="space"></div>
            <div className="nav">
                {(!isLoggedIn && !isLoginPage)? <LoginBtn/>: null} 
                {(!isLoggedIn && !isRegisterPage )? <RegisterBtn /> : null}
                {isLoggedIn ? (
                    <button className="user" onClick={toggleDropdown}>
                        <div className="info">
                                <div className="Greeting">Welcome</div>
                                <div className="name">{first_name}</div>
                        </div>
                        <div>
                            <CiCircleChevDown/>
                        </div>
                    </button>
                )
                : null}
                {isOpen ? <DropMenu toggleDropdown={toggleDropdown} isOpen={isOpen}  /> : null}
            </div>
        </header >
    );
}