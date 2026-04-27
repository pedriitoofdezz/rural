import { Router } from 'express';
import { getHouses, getHouseById, searchHouses } from '../controllers/houseController.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ ok: true });
});
router.get('/search', searchHouses);
router.get('/:id', getHouseById);

export default router;
