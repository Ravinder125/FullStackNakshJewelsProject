import dotenv from "dotenv";

dotenv.config();


export const ENV = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_DB_URI: process.env.MONGO_DB_URI,
} as const

if (Object.values(ENV).some(e => !e)) {
    throw new Error("Environment variables are missing")
}