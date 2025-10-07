import prisma from '../db/prisma';

export async function listItems(search?: string) {
    if (!search) {
        return prisma.item.findMany();
    }

    return prisma.item.findMany({
        where: {
            OR: [
                { id: { contains: search, mode: 'insensitive' } },
                { name: { contains: search, mode: 'insensitive' } },
            ],
        },
    });
}
