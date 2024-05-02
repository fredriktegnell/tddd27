require('dotenv').config();

export const MONGO_URI = process.env.MONGO_URI || null;
export const PORT = 5002 || null;