import { faker } from "@faker-js/faker";

function getFeaturedItems() {
    const getProduct = () => ({
        name: faker.commerce.product(),
        image: faker.image.urlPicsumPhotos({
            height: 256,
            width: 256,
        }),
    });

    return {
        items: faker.helpers.multiple(getProduct, { count: 7 }),
        copy: {
            adjective: faker.commerce.productAdjective(),
            description: faker.commerce.productDescription(),
        },
    };
}

type FeaturedData = ReturnType<typeof getFeaturedItems>;

function getHero() {
    return {
        headline: faker.company.catchPhrase(),
        descriptor: faker.lorem.paragraph(),
        banner: faker.image.urlPicsumPhotos({
            width: 800,
            height: 450,
        }),
    };
}

type HeroData = ReturnType<typeof getHero>;

export { getFeaturedItems, getHero };
export type { FeaturedData, HeroData };
