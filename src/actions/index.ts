import { getFakeData, getProductsByCollection } from "@/faker";
import * as data from "./data";

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

export async function getProductByHandle(handle: string) {
    if (!data.collection) throw new Error("Collection Not Found");

    const product = data.collection.products.find((product) => product.name === handle);
    if (!product) throw new Error("Product Not Found");

    return product;
}

export async function getCollection() {
    if (data.collection) return data.collection;

    const [collection, products] = await Promise.all([
        getFakeData("collection"),
        getProductsByCollection(),
    ]);

    return {
        ...collection,
        products,
    };
}
