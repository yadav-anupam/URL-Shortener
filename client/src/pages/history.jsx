import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { IoIosCopy } from 'react-icons/io';
import { VscHistory } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function history(){
    const isLoggedIn = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const [history, setHistory] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const homePageUrl = `${window.location.protocol}//${window.location.host}`;
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        const fetchHistory = async () => {
            // Don't fetch history if the user isn't logged in
            if (!isLoggedIn) return;
            try {
                setLoading(true); // Start loading
                const response = await axios.get('/url/history');
                const data = response.data.history;
                setHistory(Array.isArray(data) ? data : [data].reverse());
            } catch (err) {
                setError('Failed to load user history.'); 
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [isLoggedIn]);
    
    return (
        <div className='History'>
            <div className="history-bar"><div><VscHistory/>History </div></div>
            {history.length === 0 ? (
                <p>No history available for this user.</p>
                ) : (
                    <div className="hist">
                        <ul>
                            <li className="hist-head">
                                <div style={{ width : "28%" }}>Short URL</div>
                                <div style={{ width : "35%" }}>Original URL</div>
                                <div style={{ width : "7%" }}>Total Clicks</div>
                                <div style={{ width : "15%" }}>Created At</div>
                            </li>
                            {history.map((entry, index) => (
                                <li key={index} className='entry'>
                                    <div className='shortURL'>
                                        <a href={`${homePageUrl}/${entry.shortId}`}>
                                            {`${homePageUrl}/${entry.shortId}`}
                                        </a>
                                        <button className="copyBtn" onClick={() => {
                                            navigator.clipboard.writeText(`${homePageUrl}/${entry.shortId}`);
                                            toast.success('Copied to clipboard!');
                                        }}><IoIosCopy/></button>
                                    </div>
                                    <div className='redirectURL'>{entry.redirectUrl}</div>
                                    <div className='count' >{entry.visitHistory.length}</div>
                                    <div className='date'>{new Date(entry.createdAt).toLocaleString()}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
        </div>
    );
}