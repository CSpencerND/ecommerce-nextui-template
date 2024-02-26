import { ProductShowcase } from "../product-components";

import { getProductByHandle } from "@/actions";

import type { SearchParams } from "@/types";

export default async function ProductPage({
    params: { collection_slug, product_slug },
    searchParams,
}: {
    params: { collection_slug: string; product_slug: string };
    searchParams: SearchParams<"color" | "size">;
}) {
    const product = await getProductByHandle(product_slug);
    if (!product) return null;

    return (
        <section className="std-section">
            <ProductShowcase product={product} />
        </section>
    );
}
