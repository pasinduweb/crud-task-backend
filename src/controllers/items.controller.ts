import { Request, Response, NextFunction } from 'express';
import { listItems } from '../services/items.service';

export async function getItems(req: Request, res: Response, next: NextFunction) {
    try {
        const search = typeof req.query.search === 'string' ? req.query.search : undefined;
        const data = await listItems(search);

        res.json(data);
    } catch (err) {
        next(err);
    }
}
