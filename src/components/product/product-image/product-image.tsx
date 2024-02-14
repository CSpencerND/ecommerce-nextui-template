import { Image, type ImageProps } from "@nextui-org/image";
import NextImage from "next/image";

import { isImageUnoptimized } from "@/site.config";

const imageSizes = {
    preview: "144, (min-width: 376px) 192px",
    full: "279px, (min-width: 376px) 332px, (min-width: 429px) 384px",
};

export type ProductImageProps = ImageProps & {
    /** @prop Will apply `sizes`, `width`, and `height` */
    size?: "preview" | "full";
    isBordered?: boolean;
    isBgStriped?: boolean;
};

export function ProductImage(props: ProductImageProps) {
    const { size, isBgStriped, isBordered, className, ...rest } = props;

    // const getDimensions = (axis: "width" | "height") => {
    //     switch (size) {
    //         case "preview":
    //             return 192;
    //         case "full":
    //             return 384;
    //         default:
    //             return props[axis];
    //     }
    // };

    return (
        <Image
            as={NextImage}
            unoptimized={isImageUnoptimized}
            src={props.src}
            alt={props.alt}
            // width={getDimensions("width")}
            // height={getDimensions("height")}
            fill
            sizes={size ? imageSizes[size] : props.sizes}
            classNames={{
                wrapper: [
                    "!max-w-none",
                    isBgStriped && "data-[loaded=true]:bg-stripe-gradient",
                    isBordered && "ring-1 ring-divider",
                    className,
                ],
                img: "!static",
            }}
            {...rest}
        />
    );
}
