import { Image, type ImageProps } from "@nextui-org/react";
import NextImage from "next/image";

import { cn } from "@nextui-org/react";

import { isImageUnoptimized } from "@/site.config";

const imageSizes = {
    preview: "144, (min-width: 376px) 192px",
    full: "279px, (min-width: 376px) 332px, (min-width: 429px) 384px",
};

type ProductImageProps = ImageProps & {
    size?: "preview" | "full";
};

export function ProductImage({ src, alt, size, className, ...props }: ProductImageProps) {
    const getDimensions = (axis: "width" | "height") => {
        switch (size) {
            case "preview":
                return 192;
            case "full":
                return 384;
            default:
                return props[axis];
        }
    };

    return (
        <Image
            as={NextImage}
            src={src}
            alt={alt}
            width={getDimensions("width")}
            height={getDimensions("height")}
            sizes={size ? imageSizes[size] : props.sizes}
            className={cn("data-[loaded=true]:bg-stripe-gradient", className)}
            isZoomed
            unoptimized={isImageUnoptimized}
            {...props}
        />
    );
}
