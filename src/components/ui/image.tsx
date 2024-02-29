import { Image as NuiImage } from "@nextui-org/image";
import NextImage from "next/image";

import { tv } from "tailwind-variants";

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
}: {
    data: {
        src: string;
        alt: string;
        width?: number | `${number}`;
        height?: number | `${number}`;
    };
    fill?: boolean;
    sizes?: string;
    className?: string;
    ratio?: "video" | "square";
    radius?: "sm" | "md" | "lg" | "xl";
    isBordered?: boolean;
    disableMaxWidth?: boolean;
    priority?: boolean;
}) {
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

/**
 * hero
 *
 * <Image
 *     as={NextImage}
 *     unoptimized={isImageUnoptimized}
 *     src={image.src}
 *     alt={image.alt}
 *     width={image.width}
 *     height={image.height}
 *     sizes="(min-width: 640px) 698px, calc(100vw - 48px)"
 *     priority
 *     isBlurred
 *     classNames={{
 *         wrapper:
 *             "aspect-video size-full overflow-clip rounded-f5 border border-divider",
 *     }}
 * />
 */

/**
 * hero
 *
 * <Image
 *     as={NextImage}
 *     src={image.src}
 *     alt={image.alt}
 *     width={image.width}
 *     height={image.height}
 *     sizes="192px"
 *     isBlurred
 * />
 */

/**
 *collection-dir
 *
 * <Image
 *     as={NextImage}
 *     src={image.src}
 *     alt={image.alt}
 *     fill
 *     sizes="192px"
 *     isBlurred
 *     classNames={{
 *         wrapper: "aspect-square size-full rounded-f4",
 *     }}
 * />
 */

/**
 * collection-slug
 *
 * <Image
 *     as={NextImage}
 *     key={id}
 *     src={src}
 *     alt={alt}
 *     fill
 *     sizes="192px"
 *     isBlurred
 *     classNames={{
 *         wrapper:
 *             "aspect-square size-full rounded-f4",
 *     }}
 * />
 */
