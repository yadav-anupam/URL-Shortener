import { useLocation } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { logout } from '../ReduxStore/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi';
import { RiHistoryFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

export default function dropdown ({toggleDropdown, isOpen}) {
    const location = useLocation();
    const isHistoryPage = location.pathname === '/history';
    const dispatch = useDispatch();
    async function handleLogout() {
        try {
            await axios.post('/user/logout');
            toggleDropdown();
            dispatch(logout());
            toast.success('Logged out successfully');
        } catch(error) {
            console.error('Error logging out:', error);
            toast.error('Failed to logout');
        }
    }

    const navigate = useNavigate();
    const handleHomeClick = () => {
        toggleDropdown();
        navigate('/');
    }

    const handleHistoryClick = () => {
        toggleDropdown();
        navigate('/history');
    }


    return (
        <div className="dropdown">
            <ul className='dropdownlist'>
                {isHistoryPage ? <li className='first'><button className='homeBtn' onClick={handleHomeClick} > <HiOutlineHome/> Home </button> </li> : <li className='first'><button className='historyBtn' onClick={handleHistoryClick} > <RiHistoryFill/> History </button></li>}
                <div className='stroke'></div>
                <li className='second'><button onClick={handleLogout} className="logoutBtn"><IoIosLogOut/>Logout</button></li>
            </ul>
        </div>
    );
}