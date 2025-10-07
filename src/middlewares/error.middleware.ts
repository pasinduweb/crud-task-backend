import { Request, Response, NextFunction } from 'express';

export default function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    const status = typeof err?.status === 'number' ? err.status : 500;
    const message = err?.message || 'Internal server error';

    res.status(status).json({ error: message });
}
