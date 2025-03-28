import {connect} from "mongoose"

export const connectDB = async() => {
    try {
        const conn = await connect(process.env.DATABASE_URL)
        console.log("database connected: ", conn.connection.host)
    } catch (error) {
        console.log("database failed to connect, ", error)
    }
}
