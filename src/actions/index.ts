import { getFakeData, getProductsByCollection } from "@/faker";
import * as data from "./data";

export async function getHero() {
    if (data.hero) return data.hero;
    return await getFakeData("hero");
}

export async function getFeatured() {
    if (data.featured) return data.featured;
    return await getFakeData("featured");
}

export async function getCollections() {
    if (data.collections) return data.collections;
    return await getFakeData("collection-directory");
}

export async function getProduct() {
    return await getFakeData("product");
}

export async function getProductByHandle(slug: string) {
    if (!data.collection) throw new Error("Collection Not Found");

    const product = data.collection.products.find(
        (product) => product.name.toLowerCase() === slug,
    );
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
