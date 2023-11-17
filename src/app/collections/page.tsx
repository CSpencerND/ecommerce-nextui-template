import type { CollectionData } from "@/faker/faker-functions";

export default async function CollectionsPage() {
    const data = await fetch("http://localhost:3000/api/collection");
    const { name, description, items } = (await data.json()) as CollectionData;

    return (
        <div className="prose inline-block max-w-lg justify-center text-center dark:prose-invert">
            <h1>{name}</h1>
            <p>{description}</p>
        </div>
    );
}
