import { nanoid } from "nanoid";
import Url from "../models/url.js";
import jwt from "jsonwebtoken";

function getUserId(token) {
    return jwt.verify(token , process.env.JWTPRIVATEKEY , (err , decoded) => decoded['id']);
}

async function generateNewShortUrl(req , res) {
    const body = req.body;
    if(!body.redirectUrl) {
        return res.status(400).json({ error: "redirectUrl is required" });
    }   

    const token = req.cookies.token;
    const userId = getUserId(token);
    const shortId = nanoid(10);

    const entry = await Url.findOne({ userId , redirectUrl: req.body.redirectUrl });
    if(entry) {
        return res.status(201).json({ shortId: entry.shortId });
    }
    
    await Url.create({ 
        shortId, 
        redirectUrl: req.body.redirectUrl ,
        visitHistory: [],
        userId 
    });

    return res.status(201).json({ shortId });
}

async function getAnalytics(req, res) {
    const shortId = req.params.shortId;
    const entry = await Url.findOne({ shortId });
    if(!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    return res.status(200).json({ totalclicks: entry.visitHistory.length });
}

async function redirect(req, res) {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate({ 
        shortId },{
        $push: { visitHistory: {
            timestamps : Date.now()
        } }
        }
    );
    const redirectUrl = entry.redirectUrl ?? null;
    //console.log(redirectUrl);
    return res.status(200).json({ targetUrl: redirectUrl });
}

async function getHistory(req , res ) {
    const token = req.cookies.token;
    const userId = getUserId(token);
    //console.log(userId);
    const history = await Url.find({ userId });
    return res.status(200).json({ history });   
}

export { generateNewShortUrl , getAnalytics , redirect , getHistory};