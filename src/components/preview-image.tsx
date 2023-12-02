import { cardImage } from "@/styles/product-card";
import { Image, type ImageProps } from "@nextui-org/react";
import NextImage from "next/image";

export function PreviewImage({ src, alt, ...props }: ImageProps) {
    return (
        <Image
            as={NextImage}
            src={src}
            alt={alt}
            width={192}
            height={192}
            sizes="144, (min-width: 376px) 192px"
            className={cardImage()}
            isZoomed
            {...props}
        />
    );
}
