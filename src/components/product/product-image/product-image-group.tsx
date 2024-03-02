"use client";

import { Image, type ImageProps } from "@/components/ui/image";

import { useProductImage } from "./product-image-context";

type ImageGroupProps = {
    data: ImageProps["data"][];
} & Omit<ImageProps, "data">;

export function ProductImageGroup({ data, ...props }: ImageGroupProps) {
    const { activeIndex } = useProductImage();

    const images = data.map((image, i) => (
        <Image
            key={image.id ?? i}
            data={image}
            {...props}
        />
    ));

    return images[activeIndex] ?? null;
}
