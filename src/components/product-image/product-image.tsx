import { Image, type ImageProps } from "@nextui-org/react";
import NextImage from "next/image";

import { cn } from "@nextui-org/react";

import { isImageUnoptimized } from "@/site.config";

const imageSizes = {
    preview: "144, (min-width: 376px) 192px",
    full: "279px, (min-width: 376px) 332px, (min-width: 429px) 384px",
};

export type ProductImageProps = ImageProps & {
    /** @prop Will apply `sizes`, `width`, and `height` */
    size?: "preview" | "full";
    /** @prop Use when image bg is transparent */
    bgStripe?: boolean;
};

export function ProductImage(props: ProductImageProps) {
    const { src, alt, size, bgStripe, className } = props;

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
            className={cn(bgStripe && "data-[loaded=true]:bg-stripe-gradient", className)}
            isZoomed
            unoptimized={isImageUnoptimized}
            {...props}
        />
    );
}
