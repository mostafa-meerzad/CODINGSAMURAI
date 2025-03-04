import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"

dotenv.config()
const app = express()
app.use("/api/auth", authRoutes)

app.get("/", (req, res)=>{
    res.send("home page")
})
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server is running or port: ${PORT}`)
})