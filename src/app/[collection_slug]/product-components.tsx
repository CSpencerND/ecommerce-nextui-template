import {
    ProductExhibit,
    ProductExhibitButtons,
    ProductExhibitDescription,
    ProductExhibitHeader,
    ProductImageGroup,
} from "@/components/product";

import type { Product } from "@/types";

export function ProductShowcase({ product }: { product: Product }) {
    return (
        <ProductExhibit
            productData={product}
            className="gap-6 overflow-clip max-lg:max-w-[calc(384px+48px)] lg:max-h-[calc(384px+48px)] lg:flex-row"
        >
            <ProductImageGroup
                images={product.images.map((image, i) => ({
                    src: image,
                    alt: `Product Image ${i}`,
                }))}
                size="full"
                isBordered
            />
            <div className="flex max-w-96 flex-1 flex-col gap-6">
                <ProductExhibitHeader />
                <ProductExhibitButtons />
                <ProductExhibitDescription />
            </div>
        </ProductExhibit>
    );
}
