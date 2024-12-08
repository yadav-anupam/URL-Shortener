import React , {useState}from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { IoIosCopy } from "react-icons/io";
import { RiLinkM } from "react-icons/ri";
import { toast } from "react-toastify";


export default function MainPage() {
    const isLoggedIn = useSelector((state) => state.auth.status);
    const [shortId, setShortId] = useState(null);


    async function handleShortenSubmit(ev) {
        ev.preventDefault();
        const redirectUrl = ev.target.redirectUrl.value ;
        try {
            const {data} = await axios.post('/url/', {redirectUrl });
            setShortId(data.shortId);
        }
        catch(error) {
            toast.error('An error occurred please try again later');
        }
    }

    const homePageUrl = `${window.location.protocol}//${window.location.host}`;
    return (
        <>
        
            <div className="main-page">
                <div className="quote">Turn looooong URLs into moments of simplicity :)</div>
                {isLoggedIn ?( <>
                    <div className="shorten">
                        <form method="post" onSubmit={handleShortenSubmit} className="shorten-form">
                            <RiLinkM/>
                            <input type="text" placeholder="Input your URL here" name="redirectUrl"/>
                            <button>Shorten!</button>
                        </form>
                    </div>
                    <div className="shortenedURL">
                        {shortId  ? 
                        <div className="shortURL"> 
                            <h2>Shortened URL : <a href={`${homePageUrl}/${shortId}`}>{`${homePageUrl}/${shortId}`}</a></h2>
                            <button className="copyBtn" onClick={() => {
                                navigator.clipboard.writeText(`${homePageUrl}/${shortId}`);
                                toast.success('Copied to clipboard!');
                            }}><IoIosCopy/></button>

                        </div> : <p>Shortened URL will appear here</p>}
                    </div> </>) 
                    : 
                    <div className="notLoggedin">
                        Short.it is your go-to URL shortener for creating clean, consise links from lengthy web addresses. Perfect for sharing on social media, in emails, or anywhere else where space is limited. <br/> Register now to access it for free!
                    </div>}
            </div>
        </>
    )
}