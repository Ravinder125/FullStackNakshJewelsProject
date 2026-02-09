import mongoose from "mongoose"
import { ENV } from "./env.config.js"

const mongo_db_uri = ENV.MONGO_DB_URI

if (!mongo_db_uri) {
    throw new Error("Mongo DB uri is missing")
}

export const connectDB = async () => {
    try {
        await mongoose.connect(mongo_db_uri!)
        console.log("DB is successfully connected")
    } catch (error) {
        console.error("DB connection failed")
        process.exit(1)
    }
}