import {
    ProductExhibit,
    ProductExhibitButtons,
    ProductExhibitDescription,
    ProductExhibitHeader,
    ProductImageGroup,
} from "@/components/product";

import NextImage from "next/image";
import { Image } from "@nextui-org/image";

import type { Product } from "@/types";

export function ProductShowcase({ product }: { product: Product }) {
    return (
        <ProductExhibit
            productData={product}
            className="gap-f5 overflow-clip max-lg:max-w-[calc(384px+48px)] lg:max-h-[calc(384px+48px)] lg:flex-row"
        >
            <ProductImageGroup
                images={product.images.map(({ alt, src }, i) => (
                    <Image
                        as={NextImage}
                        key={i}
                        src={src}
                        alt={alt}
                        fill
                        isBlurred
                        classNames={{
                            wrapper: "aspect-square size-full rounded-f4",
                        }}
                    />
                ))}
            />
            <div className="flex max-w-96 flex-1 flex-col gap-6">
                <ProductExhibitHeader />
                <ProductExhibitButtons />
                <ProductExhibitDescription />
            </div>
        </ProductExhibit>
    );
}
