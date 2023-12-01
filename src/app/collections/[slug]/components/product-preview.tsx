"use client";

import { MotionListItem, type MotionListItemProps } from "@/components/motion";
import { Card, CardBody, CardFooter, type CardProps } from "@nextui-org/card";
import { Image, type ImageProps } from "@nextui-org/image";
import NextImage from "next/image";

import {
    ProductPreviewProvider,
    useInitProductPreviewState,
    useProductPreview,
} from "./product-preview-context";

import { card } from "@/styles";

export type ProductPreviewCardProps = CardProps & MotionListItemProps;

export function ProductPreviewCard(props: ProductPreviewCardProps) {
    const { className, children } = props;
    const context = useInitProductPreviewState();

    return (
        <Card
            as={MotionListItem}
            isFooterBlurred
            isPressable
            className={card.root({ radius: "xl", className })}
            {...props}
        >
            <ProductPreviewProvider value={context}>{children}</ProductPreviewProvider>
        </Card>
    );
}

export type ProductPreviewBodyProps = ImageProps & {
    images: string[];
    title?: string;
};

export function ProductPreviewBody({ images, title, ...props }: ProductPreviewBodyProps) {
    const { activeIndex } = useProductPreview();

    return (
        <CardBody>
            <Image
                as={NextImage}
                src={images[activeIndex]}
                alt={title}
                width={192}
                height={192}
                className={card.image()}
                isZoomed
                {...props}
            />
            {title ? (
                <CardFooter className={card.title({ hasPadding: true })}>
                    <h3>{title}</h3>
                </CardFooter>
            ) : null}
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
