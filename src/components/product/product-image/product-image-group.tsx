"use client";

import { ProductImage } from "./product-image";

import { useDeepCompareMemo } from "@react-hookz/web";
import { useProductImage } from "./product-image-context";

import type { ImageProps } from "@nextui-org/image";
import type { ProductImageProps } from "./product-image";

type ProductImageGroupProps = Omit<ProductImageProps, "src" | "alt"> & {
    images: ImageProps[];
};

export function ProductImageGroup({ images, ...props }: ProductImageGroupProps) {
    const { activeIndex } = useProductImage();

    const imageComponents = useDeepCompareMemo(() => {
        return images.map((image) => (
            <ProductImage
                key={image.alt}
                src={image.src}
                alt={image.alt}
                {...props}
            />
        ));
    }, [images]);

    return imageComponents[activeIndex] ?? null;
}
