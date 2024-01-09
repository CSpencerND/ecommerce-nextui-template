import { ProductExhibit, ProductExhibitWrapper } from "@/components/product";

import { getProductByHandle } from "@/actions";
import { section } from "@/styles";

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
        <section className={section()}>
            <ProductExhibitWrapper>
                <ProductExhibit productData={product} />
            </ProductExhibitWrapper>
        </section>
    );
}
