"use client";

import { Image } from "@/components/ui/image";

import { useProductImage } from "./product-image-context";

type ImageProps = React.ComponentPropsWithoutRef<typeof Image>;

export function ProductImageGroup(
    props: {
        data: ImageProps["data"][];
    } & Omit<ImageProps, "data">,
) {
    const { data, ...rest } = props;
    const { activeIndex } = useProductImage();

    const images = data.map((image) => (
        <Image
            key={image.id}
            data={image}
            {...rest}
        />
    ));

    return images[activeIndex] ?? null;
}
