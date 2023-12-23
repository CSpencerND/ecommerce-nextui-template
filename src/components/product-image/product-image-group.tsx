"use client";

import { ProductImage } from "./product-image";
import { useProductImageGroup } from "./product-image-group-context";

import { useDeepCompareMemo } from "@react-hookz/web/esm/useDeepCompareMemo";

import type { ProductImageProps, ProductImageVariants } from "./product-image";

export type ProductImageGroupProps = ProductImageVariants & {
    images: ProductImageProps[];
    size?: "full" | "preview";
    isZoomed?: boolean;
    isBordered?: boolean;
    isBgStriped?: boolean;
};

export function ProductImageGroup(props: ProductImageGroupProps) {
    const { images, size, isBordered, isBgStriped, isZoomed } = props;
    const { activeIndex } = useProductImageGroup();

    const imageComponents = useDeepCompareMemo(() => {
        return images.map((image, i) => (
            <ProductImage
                key={i}
                isBordered={isBordered}
                isBgStriped={isBgStriped}
                isZoomed={isZoomed}
                size={size}
                {...image}
            />
        ));
    }, [images]);

    return imageComponents[activeIndex] ?? null;
}
