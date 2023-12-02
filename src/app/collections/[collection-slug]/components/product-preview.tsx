"use client";

import Link from "next/link";

import { MotionListItem, type MotionListItemProps } from "@/components/motion";
import { PreviewImage } from "@/components/preview-image";
import { Card, CardBody, CardFooter, type CardProps } from "@nextui-org/card";

import { useDeepCompareMemo } from "@react-hookz/web/esm/useDeepCompareMemo";
import { useParams } from "next/navigation";
import { ProductPreviewProvider, useProductPreview } from "./product-preview-context";

import { card } from "@/styles";

export type ProductPreviewCardProps = CardProps & MotionListItemProps;

export function ProductPreviewCard(props: ProductPreviewCardProps) {
    const { className, children } = props;

    return (
        <Card
            as={MotionListItem}
            isFooterBlurred
            isPressable
            className={card.root({ radius: "xl", className })}
            {...props}
        >
            <ProductPreviewProvider>{children}</ProductPreviewProvider>
        </Card>
    );
}

export type ProductPreviewImageProps = {
    images: { src: string; alt: string }[];
};

export function ProductPreviewImages({ images }: ProductPreviewImageProps) {
    const { activeIndex } = useProductPreview();

    const imageComponents = useDeepCompareMemo(() => {
        return images.map((image, i) => (
            <PreviewImage
                key={i}
                src={image.src}
                alt={image.alt}
            />
        ));
    }, [images]);

    return imageComponents[activeIndex] ?? null;
}

export type ProductPreviewBodyProps = React.PropsWithChildren & {
    slug: string;
    title?: string;
};

export function ProductPreviewBody({ slug, title, children }: ProductPreviewBodyProps) {
    const params = useParams();
    const collectionSlug = Object.values(params)[0]

    return (
        <CardBody
            as={Link}
            href={`/collections/${collectionSlug}/${slug.toLowerCase()}`}
        >
            {children}
            <CardFooter className={card.title({ hasPadding: true })}>
                <h3>{title}</h3>
            </CardFooter>
        </CardBody>
    );
}

export function ProductPreviewFooter(props: React.ComponentPropsWithoutRef<"footer">) {
    return (
        <footer
            className="flex flex-col justify-center gap-3 px-3 pb-3"
            {...props}
        />
    );
}