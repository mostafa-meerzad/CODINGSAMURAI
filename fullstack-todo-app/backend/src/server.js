import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import authRoutes from "./routes/auth-route.js";
import todoRoutes from "./routes/todo-route.js";
import { connectDB } from "./utils/connectDB.js";
import cors from "cors";

config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

app.get("/", (req, res) => {
  return res.send("Welcome to our Todo service");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server listening on port: ", PORT);
  connectDB();
});
