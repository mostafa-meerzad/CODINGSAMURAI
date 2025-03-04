import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"

dotenv.config()
const app = express()

app.use(express.json())
app.use("/api/auth", authRoutes)

app.get("/", (req, res)=>{
    res.send("home page")
})
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server is running or port: ${PORT}`)
    connectDB()
})