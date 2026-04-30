import mongoose from "mongoose";

export async function connectDB() {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://mongo:27017/rural";
    await mongoose.connect(mongoUri);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error Mongo:", error);
    process.exit(1);
  }
}
