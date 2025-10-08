import prisma from '../db/prisma';

export async function listItems(search?: string) {
    if (!search) {
        return prisma.item.findMany();
    }

    return prisma.item.findMany({
        where: {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { sku: { contains: search, mode: 'insensitive' } },
            ],
        },
    });
}

export async function getItemById(id: number) {
    return prisma.item.findUnique({ where: { id } });
}

export async function addItem(data: {
    name: string;
    sku: string;
    quantity: number;
    price: number;
    description?: string;
}) {
    return prisma.item.create({ data });
}

export async function updateItemById(
    id: number,
    data: {
        name?: string;
        sku?: string;
        quantity?: number;
        price?: number;
        description?: string;
    }
) {
    return prisma.item.update({
        where: { id },
        data,
    });
}
