import Booking from "../models/Booking.js";

export async function createBooking(req, res) {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar" });
  }
}

export async function getBookings(req, res) {
  const bookings = await Booking.find();
  res.json(bookings);
}