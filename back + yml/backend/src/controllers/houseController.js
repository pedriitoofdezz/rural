import House from '../models/House.js';

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function getHouses(req, res) {
  try {
    const houses = await House.find().sort({ id: 1 });
    res.json(houses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener alojamientos' });
  }
}

export async function getHouseById(req, res) {
  try {
    const house = await House.findOne({ id: req.params.id });

    if (!house) {
      return res.status(404).json({ message: 'Alojamiento no encontrado' });
    }

    res.json(house);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener alojamiento' });
  }
}

export async function searchHouses(req, res) {
  try {
    const { destination, guests } = req.query;
    const filters = {};

    if (destination) {
      const destinationRegex = new RegExp(escapeRegExp(destination), 'i');
      filters.$or = [
        { title: destinationRegex },
        { location: destinationRegex },
      ];
    }

    if (guests) {
      filters.capacity = { $gte: Number(guests) };
    }

    const houses = await House.find(filters).sort({ id: 1 });
    res.json(houses);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar alojamientos' });
  }
}
