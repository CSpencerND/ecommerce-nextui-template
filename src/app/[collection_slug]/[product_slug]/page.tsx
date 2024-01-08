import { ProductExhibit } from "@/components/product";

import { getProductByHandle } from "@/actions";
import { section } from "@/styles";

export default async function ProductPage({
    params: { collection_slug, product_slug },
}: {
    params: { collection_slug: string; product_slug: string };
}) {
    const product = await getProductByHandle(product_slug);
    if (!product) return null;

    return (
        <section className={section()}>
            <ProductExhibit productData={product} />
        </section>
    );
}
