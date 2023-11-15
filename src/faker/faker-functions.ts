import { faker } from "@faker-js/faker";

export function getFeaturedItems() {
    const getProduct = () => ({
        name: faker.commerce.product(),
        image: faker.image.urlPicsumPhotos({
            height: 256,
            width: 256,
        }),
    });

    return faker.helpers.multiple(getProduct, { count: 7 });
}

export type FeaturedItems = ReturnType<typeof getFeaturedItems>

export function getHero() {
    return {
        headline: faker.company.catchPhrase(),
        descriptor: faker.lorem.paragraph(),
        banner: faker.image.urlPicsumPhotos({
            width: 800,
            height: 450,
        }),
    };
}

export type Hero = ReturnType<typeof getHero>