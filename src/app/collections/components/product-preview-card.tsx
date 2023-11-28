"use client";

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import card from "@/styles/product-card";
import { motion } from "framer-motion";

import type { CardProps } from "@nextui-org/card";
import type { ImageProps } from "@nextui-org/image";
import type { MotionProps, Variants } from "framer-motion";

// import { useHydrated } from "@/hooks/use-hydrated";

const fadeInUp: Variants = {
    animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.075 * i,
        },
    }),
};

export type ProductPreviewCardProps = CardProps &
    MotionProps & {
        index: number;
    };

export function ProductPreviewCard({ index, ...props }: ProductPreviewCardProps) {
    // const hydrated = useHydrated();
    // if (!hydrated) return null;

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

export type ProductPreviewCardBodyProps = ImageProps & {
    images: string[];
    title: string;
};

export function ProductPreviewCardBody(props: ProductPreviewCardBodyProps) {
    const { images, alt, title } = props;
    const selectedImage = 0;

    return (
        <CardBody>
            <Image
                as={NextImage}
                src={images[selectedImage]}
                alt={alt}
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

export function ProductPreviewCardFooter(props: React.ComponentPropsWithoutRef<"footer">) {
    return (
        <footer
            className="flex flex-col justify-center gap-3 px-3 pb-3"
            {...props}
        />
    );
}
