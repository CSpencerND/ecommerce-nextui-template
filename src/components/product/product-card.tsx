"use client";

import { Card, CardFooter } from "@nextui-org/card";
import { extendVariants } from "@nextui-org/system";

const ProductCardComponent = extendVariants(Card, {
    variants: {
        radius: {
            xl: {
                base: "rounded-2xl",
            },
            "2xl": {
                base: "rounded-xlarge",
            },
        },
        isFooterBlurred: {
            true: {
                footer: [
                    "absolute z-10 rounded-[10px] border-1 border-white/10",
                    "py-1 shadow-small backdrop-contrast-75",
                    "truncate text-medium font-bold text-white",
                ],
            },
        },
        isBodyLink: {
            true: {
                body: "!outline-offset-[-10px] focus-visible:focus-ring",
            },
        },
        hasPadding: {
            true: {
                footer: "bottom-4 w-[calc(100%-2rem)] ml-1",
                base: "rounded-xlarge",
            },
            false: {
                footer: "bottom-1 w-[calc(100%-0.5rem)]",
                body: "p-0",
            },
        },
    },
    defaultVariants: {
        radius: "xl",
        hasPadding: false,
    },
});

export const ProductCard = (
    props: React.ComponentPropsWithoutRef<typeof ProductCardComponent>,
) => {
    return (
        <ProductCardComponent
            {...props}
            tabIndex={props.isBodyLink ? -1 : 0}
        />
    );
};

export const ProductCardFooter = (
    props: React.ComponentPropsWithoutRef<typeof CardFooter> & { title: string },
) => {
    return (
        <CardFooter {...props}>
            <h3>{props.title}</h3>
        </CardFooter>
    );
};

export { CardBody as ProductCardBody } from "@nextui-org/card";
