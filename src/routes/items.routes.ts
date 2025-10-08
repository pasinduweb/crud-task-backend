import { Router } from 'express';
import { getItem, getItems, createItem, updateItem } from '../controllers/items.controller';

const router = Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', createItem);
router.put('/:id', updateItem);

export default router;
