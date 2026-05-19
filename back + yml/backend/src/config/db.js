import mongoose from "mongoose";
import { seedDatabase } from "./seed.js";

export async function connectDB() {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://mongo:27017/rural";
    await mongoose.connect(mongoUri);
    await seedDatabase();
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error Mongo:", error);
    process.exit(1);
  }
}
