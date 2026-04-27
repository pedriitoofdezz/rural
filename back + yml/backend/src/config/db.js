import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://mongo:27017/rural");
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error Mongo:", error);
    process.exit(1);
  }
}