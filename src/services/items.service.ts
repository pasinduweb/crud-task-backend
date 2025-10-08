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
