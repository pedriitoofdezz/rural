import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  houseId: String,
  alojamientoNombre: String,
  guestName: String,
  guestEmail: String,
  checkIn: String,
  checkOut: String,
  guests: Number,
  status: {
    type: String,
    default: "confirmada"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model("Booking", bookingSchema);
