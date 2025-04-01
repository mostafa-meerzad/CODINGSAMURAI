import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import authRoutes from "./routes/auth-route.js";
import todoRoutes from "./routes/todo-route.js";
import { connectDB } from "./utils/connectDB.js";
import cors from "cors";

config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log("server listening on port: ", PORT);
  connectDB();
});
