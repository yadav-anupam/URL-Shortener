import {useNavigate} from 'react-router-dom';
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function loginBtn() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    }
    
    return (
        <button className='loginBTN' onClick={handleClick} > Login <FaArrowRightToBracket/>  </button>
    );
}