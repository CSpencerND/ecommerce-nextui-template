import { API_URL } from "@/site.config";
import { faker } from "@faker-js/faker";
import uniqBy from "lodash.uniqby";
import { fakerColors, fakerSizes } from "./faker-constants";

/**
 * @description Helper that fetches fake data and filters out duplicates
 * @extends `faker.helpers.multiple`
 */
function getMultiple<T>(fn: () => T, comparator: keyof T, count: number): T[] {
    const data = faker.helpers.multiple(fn, { count });
    return uniqBy(data, comparator);
}

// INFO: Client - Helper for fetching data on the client ////////////////////////////////////

export const fakerFunctions = {
    hero: getHero,
    featured: getFeatured,
    collection: getCollection,
    "collection-directory": getCollectionDirectory,
    product: getProduct,
} as const;

export type ApiType = {
    [K in keyof typeof fakerFunctions]: ReturnType<(typeof fakerFunctions)[K]>;
};

export async function getFakeData<T extends keyof ApiType>(
    apiSlug: T,
): Promise<ApiType[T]> {
    const data = await fetch(`${API_URL}/${apiSlug}`);
    return data.json();
}

// INFO: Server - Use in api routes to fetch data ///////////////////////////////////////////

function getHero() {
    return {
        headline: faker.company.catchPhrase(),
        descriptor: faker.lorem.paragraph(),
        image: {
            src: faker.image.urlPicsumPhotos({
                width: 1024,
                height: 576,
            }),
            alt: "banner",
            height: 1024,
            width: 576,
            id: faker.commerce.isbn({ separator: "", variant: 10 }),
        },
    };
}

function getFeatured() {
    const getData = () => ({
        id: faker.commerce.isbn({ separator: "", variant: 10 }),
        name: faker.commerce.product(),
        image: {
            src: faker.image.urlPicsumPhotos({
                height: 192,
                width: 192,
            }),
            alt: "featured product",
            height: 192,
            width: 192,
            id: faker.commerce.isbn({ separator: "", variant: 10 }),
        },
    });

    return {
        items: getMultiple(getData, "name", 7),
        copy: {
            adjective: faker.commerce.productAdjective(),
            description: faker.commerce.productDescription(),
        },
    };
}

function getCollectionDirectory() {
    const getData = () => ({
        id: faker.commerce.isbn({ separator: "", variant: 10 }),
        name: faker.commerce.department(),
        image: {
            src: faker.image.urlPicsumPhotos({
                height: 192,
                width: 192,
            }),
            alt: "collection preview image",
            height: 192,
            width: 192,
            id: faker.commerce.isbn({ separator: "", variant: 10 }),
        },
    });

    return getMultiple(getData, "name", 6);
}

function getProduct() {
    const urls = faker.helpers.multiple(
        () =>
            faker.image.urlPicsumPhotos({
                height: 384,
                width: 384,
            }),
        { count: 4 },
    );

    return {
        id: faker.commerce.isbn({ separator: "", variant: 10 }),
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        colors: fakerColors,
        sizes: fakerSizes,
        price: faker.commerce.price({ symbol: "$" }),
        images: urls.map((url) => ({
            src: url,
            alt: "product image",
            height: 384,
            width: 384,
            id: faker.commerce.isbn({ separator: "", variant: 10 }),
        })),
    };
}

function getCollection() {
    return {
        id: faker.commerce.isbn({ separator: "", variant: 10 }),
        name: faker.commerce.department(),
        description: faker.commerce.productDescription(),
    };
}

export function getProductsByCollection() {
    return getMultiple(getProduct, "name", 3);
}
