import { Router } from 'express';
import { getItem, getItems, createItem } from '../controllers/items.controller';

const router = Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', createItem);

export default router;
