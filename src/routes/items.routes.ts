import { Router } from 'express';
import { getItem, getItems } from '../controllers/items.controller';

const router = Router();

router.get('/', getItems);
router.get('/:id', getItem);

export default router;
