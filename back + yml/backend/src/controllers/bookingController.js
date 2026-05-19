import Booking from "../models/Booking.js";
import House from "../models/House.js";

export async function createBooking(req, res) {
  try {
    const house = await House.findOne({ id: req.body.houseId });

    if (!house) {
      return res.status(400).json({ error: "El alojamiento no existe" });
    }

    if (Number(req.body.guests) > house.capacity) {
      return res.status(400).json({ error: "Demasiados huespedes para este alojamiento" });
    }

    const booking = new Booking({
      houseId: house.id,
      alojamientoNombre: house.title,
      guestName: req.body.guestName,
      guestEmail: req.body.guestEmail,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      guests: req.body.guests,
      status: req.body.status,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar" });
  }
}

export async function getBookings(req, res) {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reservas" });
  }
}
