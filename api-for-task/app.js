import express from "express";
import userRoute from "./routes/user.js";
import attendenceRoute from "./routes/attendence.js";
import leaveRoute from "./routes/leave.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});
//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors("*"));
// app.use(cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }

// ))

app.use("/api/v1/users", userRoute);
app.use("/api/v1/attendence", attendenceRoute);
app.use("/api/v1/leave", leaveRoute);

app.get("/", (req, res) => {
  res.send("Site is live and working fine");
});

app.use(errorMiddleware);
