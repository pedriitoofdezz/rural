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
    const normalizedDestination = destination.toLowerCase();
    result = result.filter((house) =>
      house.title.toLowerCase().includes(normalizedDestination) ||
      house.location.toLowerCase().includes(normalizedDestination)
    );
  }

  if (guests) {
    result = result.filter((house) => house.capacity >= Number(guests));
  }

  res.json(result);
}
