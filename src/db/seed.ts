import prisma from './prisma';

async function main() {
    await prisma.item.createMany({
        data: [
            {
                name: 'Laptop',
                sku: 'A001',
                quantity: 5,
                price: 1500,
                description: 'This is laptop desc',
            },
            {
                name: 'Mouse',
                sku: 'A002',
                quantity: 20,
                price: 25,
                description: 'This is mouse desc',
            },
        ],
        skipDuplicates: true, // Avoids errors if run twice
    });
}

main()
    .then(() => {
        console.log('Seeding finished');
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
