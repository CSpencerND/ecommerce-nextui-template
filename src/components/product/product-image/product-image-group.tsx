"use client";

import { Image, type ImageProps } from "@/components/ui/image";

import { useProductImage } from "./product-image-context";

type ImageGroupProps = {
    data: ImageProps["data"][];
} & Omit<ImageProps, "data">;

export function ProductImageGroup({ data, ...props }: ImageGroupProps) {
    const { activeIndex } = useProductImage();

    const images = data.map((image) => (
        <Image
            key={image.id}
            data={image}
            {...props}
        />
    ));

    return images[activeIndex] ?? null;
}
