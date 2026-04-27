import { houses } from '../data/data.js';

export function getHouses(req, res) {
  res.json(houses);
}

export function getHouseById(req, res) {
  const house = houses.find((item) => item.id === req.params.id);

  if (!house) {
    return res.status(404).json({ message: 'Alojamiento no encontrado' });
  }

  res.json(house);
}

export function searchHouses(req, res) {
  const { destination, guests } = req.query;

  let result = houses;

  if (destination) {
    result = result.filter((house) =>
      house.location.toLowerCase().includes(destination.toLowerCase())
    );
  }

  if (guests) {
    result = result.filter((house) => house.capacity >= Number(guests));
  }

  res.json(result);
}
