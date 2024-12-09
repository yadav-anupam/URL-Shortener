import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(10);


async function createUser(req, res) {
    const {name , password , email} = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        const user = await User.create({
            name: name,
            password: hashedPassword,
            email: email
        });

        return res.status(201).json({ name : user.name , email : user.email ,id : user._id  });
    }
    catch (error) {
        if(error.code === 11000) {
            return res.status(409).json({ error : "User already exists" });
        }
        return res.status(500).json({ error : error.message });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    const secret = process.env.JWTPRIVATEKEY;

    const options = {
        expires:new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 ),
        secure: true,
        httpOnly:true,
        sameSite: 'None',
    };

    try {
        const user = await User.findOne({ email });
        if (user) {
            const authenticated = bcrypt.compareSync(password, user.password);
            if (authenticated) {
                jwt.sign({ email : user.email, id:user._id, name : user.name}, secret , { } , (err , token) => {
                    if (err) {
                        return res.status(500).json({ error : err.message });
                    }
                    return res.status(200).cookie('token' , token ).json({ name :user.name , email : user.email , id : user._id });
                });
                
            }
            else {
                return res.status(401).json({ user : "not authenticated" });
            }
        }   
        else {
            return res.status(404).json({ user : "User not found" });   
        }
    }
    catch (error) {
        return res.status(500).json({ error : error.message });
    }
}

function logoutUser(req, res) {
    try {
        return res.status(200).clearCookie('token').json({ user : "Logged out" });
    }
    catch (error) {
        return res.status(500).json({ error : error.message });
    }
}

function getUser(req, res) {
    const token = req.cookies?.token ?? null;
    if(!token) {
        return res.status(200).json({ name : null , email : null , id : null });
    }
    jwt.verify(token , process.env.JWTPRIVATEKEY , (err , decoded) => {
        if (err) {
            return res.status(500).json({ error : err.message });
        }
        return res.status(200).json({ name : decoded.name , email : decoded.email , id : decoded.id });
    });
}

export { createUser, login, logoutUser , getUser};






