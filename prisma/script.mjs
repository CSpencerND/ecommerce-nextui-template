// import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // await clean();
    // console.log(await resFind());
}

main()
    .catch((e) => {
        console.error(e.message);
    })
    .finally(() => {
        prisma.$disconnect;
    });

async function clean() {
    await prisma.hero.deleteMany();
    await prisma.image.deleteMany();
}

async function createImage() {
    await prisma.image.create({
        data: {
            src: "https://picsum.photos/seed/ao6APQ/1024/576",
            alt: "banner",
            height: 1024,
            width: 576,
        },
    });
}

async function createHero() {
    await prisma.hero.create({
        data: {
            headline: "Compatible regional info-mediaries",
            description:
                "Arbitro adaugeo quia cito cometes laudantium. Nam iure ambitus tepesco ad uterque. Despecto cena compello suppono.",
            image: {
                create: {
                    src: "https://picsum.photos/seed/ao6APQ/1024/576",
                    alt: "banner",
                    height: 1024,
                    width: 576,
                },
            },
        },
    });
}
