import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app, io, server} from "./lib/socket.js"

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({limit: "10mb"}));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("home page");
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running or port: ${PORT}`);
  connectDB();
});
