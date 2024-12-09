import { nanoid } from "nanoid";
import Url from "../models/url.js";
import jwt from "jsonwebtoken";

function getUserId(token) {
    const secret = process.env.JWTPRIVATEKEY;
    try {
        const decoded = jwt.verify(token, secret);
        return decoded.id;
    }
    catch (error) {
        return null;
    }
}

async function generateNewShortUrl(req , res) {
    const body = req.body;
    if(!body.redirectUrl) {
        return res.status(400).json({ error: "redirectUrl is required" });
    } 
    const token = req.cookies?.token ?? null;
    const userId = body.userId ?? getUserId(token);
    const shortId = nanoid(10);

    try{
        const entry = await Url.findOne({ userId , redirectUrl: req.body.redirectUrl });
        if(entry) {
            return res.status(201).json({ shortId: entry.shortId });
        }
        await Url.create({
            shortId,
            redirectUrl: req.body.redirectUrl,
            visitHistory: [],
            userId
        });
        return res.status(201).json({ shortId });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function getAnalytics(req, res) {
    const shortId = req.params.shortId;

    try {
        const entry = await Url.findOne({ shortId });
        if(!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }
        return res.status(200).json({ totalclicks: entry.visitHistory.length });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function redirect(req, res) {
    const shortId = req.params.shortId;

    try{
        const entry = await Url.findOneAndUpdate({ 
            shortId },{
            $push: { visitHistory: {
                timestamps : Date.now()
            } }
            }
        );
        const redirectUrl = entry.redirectUrl ?? null;
        return res.status(200).json({ targetUrl: redirectUrl });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function getHistory(req , res ) {
    const token = req.cookies.token;
    const userId = req.body.userId ?? getUserId(token);
    try {
        const history = await Url.find({ userId });
        return res.status(200).json({ history });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export { generateNewShortUrl , getAnalytics , redirect , getHistory};