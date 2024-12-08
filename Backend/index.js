import express from "express";
import urlRouter from "./routes/url.js";
import userRouter from "./routes/user.js"
import connectToMongoDb from "./db/connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
configDotenv();

await connectToMongoDb(process.env.MONGOURL);
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);}); 

app.use(cors(
    {
        origin: process.env.FRONTENDURL,
        methods: ["GET" , "POST" , "DELETE" , "PATCH" , "PUT"],     
        credentials: true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/url', urlRouter);
app.use("/user" , userRouter);

