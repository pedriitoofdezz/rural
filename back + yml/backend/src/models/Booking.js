import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  houseId: String,
  guestName: String,
  guestEmail: String,
  checkIn: String,
  checkOut: String,
  guests: Number,
  status: {
    type: String,
    default: "confirmed"
  }
});

export default mongoose.model("Booking", bookingSchema);