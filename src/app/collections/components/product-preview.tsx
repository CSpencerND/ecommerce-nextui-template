"use client";

import { ProductPreviewProvider, useProductPreview } from "./product-preview-store";

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { useHydrated } from "@/hooks/use-hydrated";
import { motion } from "framer-motion";

import { card } from "@/styles";

import type { CardProps } from "@nextui-org/card";
import type { ImageProps } from "@nextui-org/image";
import type { MotionProps, Variants } from "framer-motion";
import type { ProductPreviewCardProps } from "./product-preview-store";

const fadeInUp: Variants = {
    animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.075 * i,
        },
    }),
};

export { ProductPreviewProvider as ProductPreview };

export function CollectionPreviewCard(props: ProductPreviewCardProps) {
    const hydrated = useHydrated();
    if (!hydrated) return null;

    return (
        <Card
            as={motion.li}
            variants={fadeInUp}
            initial={false}
            style={{ opacity: 0, y: -24 }}
            whileInView="animate"
            viewport={{ once: true }}
            custom={props.index}
            isFooterBlurred
            isPressable
            className={card.root({ radius: "xl" })}
            {...props}
        />
    );
}

export function ProductPreviewCard(props: CardProps & MotionProps) {
    const index = useProductPreview((s) => s.index);

    return (
        <Card
            as={motion.li}
            variants={fadeInUp}
            initial={false}
            style={{ opacity: 0, y: -24 }}
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
            isFooterBlurred
            isPressable
            className={card.root({ radius: "xl" })}
            {...props}
        />
    );
}

export function ProductPreviewBody(props: ImageProps) {
    const images = useProductPreview((s) => s.images);
    const title = useProductPreview((s) => s.title);
    const activeIndex = Number(useProductPreview((s) => s.activeIndex));

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
