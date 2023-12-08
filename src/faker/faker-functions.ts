import "server-only";

import { API_URL, NODE_ENV } from "@/site.config";
import { faker } from "@faker-js/faker";
import { cache } from "react";
import { fakerColors, fakerSizes } from "./faker-constants";

/**
 * Client
 * Helper for fetching data on the client
 */

export const fakerFunctions = {
    hero: getHero,
    featured: getFeaturedItems,
    collection: getCollection,
    "collection-directory": getCollectionDirectory,
    product: getProduct,
} as const;

export type ApiType = {
    [K in keyof typeof fakerFunctions]: ReturnType<(typeof fakerFunctions)[K]>;
};

export const preloadFakeData = (route: keyof ApiType) => {
    void getFakeData(route);
};

export const getFakeData = cache(
    async <T extends keyof ApiType>(apiSlug: T): Promise<ApiType[T]> => {
        if (NODE_ENV === "development") {
            const data = await fetch(`${API_URL}/${apiSlug}`);
            return data.json();
        }
        return fakerFunctions[apiSlug]() as ApiType[T];
    },
);

/**
 * Server
 * Use in api routes to fetch data
 */

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

export function getFeaturedItems() {
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

export function getCollectionDirectory() {
    const getCollection = () => ({
        name: faker.commerce.department(),
        image: faker.image.urlPicsumPhotos({
            height: 192,
            width: 192,
        }),
    });

    return faker.helpers.multiple(getCollection, { count: 6 });
}

export function getCollection() {
    const getProduct = () => ({
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        colors: fakerColors,
        images: faker.helpers.multiple(
            () =>
                faker.image.urlPicsumPhotos({
                    height: 192,
                    width: 192,
                }),
            { count: 4 },
        ),
    });

    return {
        name: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        items: faker.helpers.multiple(getProduct, { count: 9 }),
    };
}

export function getProduct() {
    return {
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        colors: fakerColors,
        sizes: fakerSizes,
        price: faker.commerce.price({ symbol: "$" }),
        images: faker.helpers.multiple(
            () =>
                faker.image.urlPicsumPhotos({
                    height: 384,
                    width: 384,
                }),
            { count: 4 },
        ),
    };
}
