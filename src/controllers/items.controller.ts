import { Request, Response, NextFunction } from 'express';
import { listItems, getItemById, addItem, updateItemById } from '../services/items.service';

export async function getItems(req: Request, res: Response, next: NextFunction) {
    try {
        const search = typeof req.query.search === 'string' ? req.query.search : undefined;
        const data = await listItems(search);

        res.json(data);
    } catch (err) {
        next(err);
    }
}

export async function getItem(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: 'lol invalid id' });
        }

        const item = await getItemById(id);
        if (!item) {
            return res.status(404).json({ error: 'item not found' });
        }

        res.json(item);
    } catch (err) {
        next(err);
    }
}

export async function createItem(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, sku, quantity, price, description } = req.body;

        if (!name || !sku || quantity === undefined || price === undefined) {
            return res.status(400).json({ error: 'required fields missing' });
        }

        const newItem = await addItem({
            name,
            sku,
            quantity: Number(quantity),
            price: Number(price),
            description,
        });

        res.status(201).json(newItem);
    } catch (err) {
        next(err);
    }
}

export async function updateItem(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: 'lol invalid id' });
        }

        const { name, sku, quantity, price, description } = req.body;

        const existingItem = await getItemById(id);
        if (!existingItem) {
            return res.status(404).json({ error: 'item not found' });
        }

        const updatedItem = await updateItemById(id, {
            name,
            sku,
            quantity: quantity !== undefined ? Number(quantity) : undefined, // If given convert to number, else keep undefined
            price: price !== undefined ? Number(price) : undefined,
            description,
        });

        res.json(updatedItem);
    } catch (err) {
        next(err);
    }
}
