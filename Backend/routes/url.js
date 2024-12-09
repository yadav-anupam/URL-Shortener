import express from "express";
import {generateNewShortUrl , getAnalytics , redirect , getHistory} from "../controllers/url.js";

const router = express.Router();

router.post("/" , generateNewShortUrl);
router.get("/analytics/:shortId", getAnalytics);
router.get("/red/:shortId", redirect);
router.post("/history" , getHistory);

export default router;