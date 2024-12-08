import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Redirector = () => {
    const { shortId } = useParams(); // Extract shortId from the URL
    const navigate = useNavigate(); // React Router's navigate function

    useEffect(() => {
        const fetchRedirectUrl = async () => {
            try {
                const response = await axios.get(`/url/red/${shortId}`);
                const targetUrl=response.data.targetUrl;
                window.location.href = targetUrl; // Redirect to the target URL
            } catch (error) {
                console.error('Error fetching redirect URL:', error.response?.data || error.message);
                toast.error(error);
                navigate('/'); // Redirect to the home page if there's an error
            }
        };

        fetchRedirectUrl();
    }, []);

    return <div className='redirectorComp'>Redirecting...</div>; // Show a loading message while redirecting
};

export default Redirector;
