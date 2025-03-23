import express from "express";
import { config } from "dotenv";

config();

const app = express();

app.get("/", (req, res) => {
  return res.send("Welcome to our Todo service");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server listening on port: ", PORT);
});
