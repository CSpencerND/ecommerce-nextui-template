import { API_URL } from "@/site.config";

import type { CollectionData } from "@/faker/faker-functions";

export default async function CollectionsPage() {
    const data = await fetch(`${API_URL}/collection`);
    const { name, description, items } = (await data.json()) as CollectionData;

    return (
        <div className="prose inline-block max-w-lg justify-center text-center dark:prose-invert">
            <h1>{name}</h1>
            <p>{description}</p>
        </div>
    );
}
