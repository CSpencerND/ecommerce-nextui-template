import * as data from "./data";

export async function getHero() {
    return data.hero;
}

export async function getFeatured() {
    return data.featured;
}

export async function getCollections() {
    return data.collections;
}

export async function getProductByHandle(slug: string) {
    return data.collection.products.find(
        (product) => product.name.toLowerCase() === slug,
    );
}

export async function getCollection() {
    return data.collection;
}

// export async function getHero() {
//     return await db.hero.findFirst({
//         select: {
//             headline: true,
//             description: true,
//             image: {
//                 select: {
//                     src: true,
//                     alt: true,
//                     height: true,
//                     width: true,
//                 },
//             },
//         },
//     });
// }

// export async function getFeatured() {
//     const data = await db.collection.findFirst({
//         where: {
//             isFeatured: true,
//         },
//         select: {
//             id: true,
//             description: true,
//             tagline: true,
//             name: true,
//             products: {
//                 select: {
//                     name: true,
//                     images: {
//                         take: 1,
//                         select: {
//                             width: true,
//                             height: true,
//                             alt: true,
//                             src: true,
//                         },
//                     },
//                 },
//             },
//         },
//     });
//
//     if (!data) return null;
//
//     const { name, tagline, description, products } = data;
//     const items = products.map((p) => ({
//         name: p.name,
//         image: p.images[0],
//     }));
//
//     return {
//         name,
//         tagline,
//         description,
//         items,
//     };
// }
