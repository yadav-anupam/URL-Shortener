import express from "express";
import urlRouter from "./routes/url.js";
import userRouter from "./routes/user.js"
import connectToMongoDb from "./connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
configDotenv();

await connectToMongoDb(process.env.MONGOURL);
const app = express();
const PORT = 3000;

app.use(cors({
    credentials: true,
    origin: process.env.FRONTENDURL,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/url', urlRouter);
app.use("/user" , userRouter);

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);}); 