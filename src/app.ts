import express from 'express';
import dotenv from 'dotenv';
import itemsRouter from './routes/items.routes';
import errorMiddleware from './middlewares/error.middleware';
import prisma from './db/prisma';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.use('/api/items', itemsRouter);

app.use(errorMiddleware);

prisma
    .$connect()
    .then(() => {
        console.log('DB connected');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log('DB connection failed:', error.message);
        process.exit(1);
    });
