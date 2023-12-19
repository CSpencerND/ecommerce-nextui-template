import { getFakeData } from "@/faker";
import { getCollectionProducts } from "@/faker";
import * as data from "@/app/api/data";

export async function getHero() {
    return await getFakeData("hero");
}

export async function getFeatured() {
    return await getFakeData("featured");
}

export async function getCollections() {
    return await getFakeData("collection-directory");
}

export async function getProduct() {
    return await getFakeData("product");
}

export async function getCollection() {
    if (data.collection) return data.collection;

    const [collection, products] = await Promise.all([
        getFakeData("collection"),
        getCollectionProducts(),
    ]);

    return {
        ...collection,
        products,
    };
}
