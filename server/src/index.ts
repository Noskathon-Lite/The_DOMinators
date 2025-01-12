import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { handleError } from "./middleware/error.handler";
import authRoute from "./routes/auth.routes";
import { connectDB } from "./utils/connectDB";

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Hello World");
});

// user defined middlewares
app.use("/api/v1/auth", authRoute);
app.use(handleError);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
