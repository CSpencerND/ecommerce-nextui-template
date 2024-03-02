import { Image as NuiImage } from "@nextui-org/image";
import NextImage from "next/image";

import { tv, type VariantProps } from "tailwind-variants";

export type ImageProps = {
    data: {
        src: string;
        alt: string;
        width?: number | `${number}`;
        height?: number | `${number}`;
        id?: string;
    };
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    className?: string;
} & VariantProps<typeof imgClasses>;

export function Image({
    data,
    fill,
    sizes,
    className,
    ratio,
    radius,
    isBordered,
    disableMaxWidth,
    priority,
}: ImageProps) {
    const { wrapper, img } = imgClasses({
        radius,
        ratio,
        isBordered,
        disableMaxWidth,
    });

    return (
        <NuiImage
            as={NextImage}
            src={data.src}
            alt={data.alt ?? ""}
            width={fill ? undefined : data.width}
            height={fill ? undefined : data.height}
            fill={fill}
            sizes={sizes}
            priority={priority}
            isBlurred
            classNames={{
                wrapper: wrapper({ class: className }),
                img: img(),
            }}
        />
    );
}

const imgClasses = tv({
    slots: {
        wrapper: "size-full",
        img: "",
    },
    variants: {
        radius: {
            sm: { wrapper: "!rounded-f3", img: "!rounded-f3" },
            md: { wrapper: "!rounded-f4", img: "!rounded-f4" },
            lg: { wrapper: "!rounded-f5", img: "!rounded-f5" },
            xl: { wrapper: "!rounded-f6", img: "!rounded-f6" },
        },
        ratio: {
            video: { wrapper: "aspect-video", img: "aspect-video" },
            square: { wrapper: "aspect-square", img: "aspect-square" },
            undefined,
        },
        isBordered: {
            true: { wrapper: "border border-divider/10" },
            false: {},
        },
        disableMaxWidth: {
            true: { wrapper: "!max-w-none" },
            false: {},
        },
    },
    defaultVariants: {
        radius: "md",
        ratio: undefined,
        isBordered: true,
        disableMaxWidth: false,
    },
});
