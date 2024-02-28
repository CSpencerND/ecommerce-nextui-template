import NextImage from "next/image";

import { tv } from "tailwind-variants";

export function MImage({
    image,
    fill,
    sizes,
    className,
    ratio,
    radius,
    isBordered,
}: {
    image: {
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
}) {
    return (
        <NextImage
            src={image.src}
            alt={image.src}
            width={fill ? undefined : image.width}
            height={fill ? undefined : image.height}
            fill={fill}
            sizes={sizes}
            className={img({ radius, ratio, isBordered, class: className })}
        />
    );
}

const img = tv({
    variants: {
        radius: {
            sm: "rounded-f3",
            md: "rounded-f4",
            lg: "rounded-f5",
            xl: "rounded-f6",
        },
        ratio: {
            video: "aspect-video",
            square: "aspect-square",
            undefined,
        },
        isBordered: {
            true: "border border-divider/10",
            false: {},
        },
    },
    defaultVariants: {
        radius: "md",
        isBordered: true,
        ratio: undefined,
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
