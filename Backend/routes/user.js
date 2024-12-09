import express from "express";
import { createUser , login , logoutUser , getUser} from "../controllers/user.js";

const router = express.Router();

router.post("/register" , createUser);
router.post("/login" , login);
router.post("/logout" , logoutUser);
router.get("/" , getUser);

export default router;