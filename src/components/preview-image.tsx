import { Image, type ImageProps } from "@nextui-org/react";
import NextImage from "next/image";

import { cn } from "@nextui-org/react";

export function ProductImage({ src, alt, className, ...props }: ImageProps) {
    return (
        <Image
            as={NextImage}
            src={src}
            alt={alt}
            width={192}
            height={192}
            sizes="144, (min-width: 376px) 192px"
            className={cn("data-[loaded=true]:bg-stripe-gradient", className)}
            isZoomed
            {...props}
        />
    );
}
