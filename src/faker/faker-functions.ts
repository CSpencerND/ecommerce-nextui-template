import { faker } from "@faker-js/faker";

function getFeaturedItems() {
    const getProduct = () => ({
        name: faker.commerce.product(),
        image: faker.image.urlPicsumPhotos({
            height: 192,
            width: 192,
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

function getCollection() {
    const getProduct = () => ({
        name: faker.commerce.product(),
        description: faker.commerce.productDescription,
        image: faker.helpers.multiple(
            () =>
                faker.image.urlPicsumPhotos({
                    height: 192,
                    width: 192,
                }),
            { count: 3 },
        ),
    });

    return {
        name: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        items: faker.helpers.multiple(getProduct, { count: 9 }),
    };
}

type CollectionData = ReturnType<typeof getCollection>;

export { getCollection, getFeaturedItems, getHero };
export type { CollectionData, FeaturedData, HeroData };
