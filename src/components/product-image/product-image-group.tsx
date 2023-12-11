"use client"

import { ProductImage, useProductImageGroup } from ".";

import { useDeepCompareMemo } from "@react-hookz/web/esm/useDeepCompareMemo";

export type ProductImageGroupProps = {
    images: React.ComponentPropsWithRef<typeof ProductImage>[];
};

export function ProductImageGroup({ images }: ProductImageGroupProps) {
    const { activeIndex } = useProductImageGroup();

    const imageComponents = useDeepCompareMemo(() => {
        return images.map((image, i) => (
            <ProductImage
                key={i}
                {...image}
            />
        ));
    }, [images]);

    return imageComponents[activeIndex] ?? null;
}
