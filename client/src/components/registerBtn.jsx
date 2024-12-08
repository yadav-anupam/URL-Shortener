import { useNavigate } from "react-router-dom";
export default function RegisterBtn() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/signup');
    }
    return (
        <button className="register" onClick={handleClick}>Register</button>
    );
}