"use client";

import { Card, CardFooter } from "@nextui-org/card";
import { extendVariants } from "@nextui-org/system";
import { forwardRef } from "react";

const ProductCardComponent = extendVariants(Card, {
    variants: {
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
                base: "rounded-xlarge",
                footer: "bottom-4 w-[calc(100%-2rem)] ml-1",
            },
            false: {
                base: "rounded-2xl",
                body: "p-0",
                footer: "bottom-1 w-[calc(100%-0.5rem)]",
            },
        },
    },
});

export const ProductCard = forwardRef<
    React.ElementRef<typeof ProductCardComponent>,
    React.ComponentPropsWithRef<typeof ProductCardComponent>
>(({ hasPadding, shadow, ...props }, ref) => {
    return (
        <ProductCardComponent
            ref={ref}
            hasPadding={hasPadding ?? false}
            tabIndex={props.isBodyLink ? -1 : 0}
            shadow={shadow ?? "md"}
            {...props}
        />
    );
});
ProductCard.displayName = "ProductCard";

export const ProductCardFooter = ({
    text,
    ...props
}: {
    text: string;
} & React.HTMLAttributes<HTMLDivElement>) => (
    <CardFooter {...props}>
        <h3>{text}</h3>
    </CardFooter>
);
ProductCardFooter.displayName = "ProductCardFooter";

export { CardBody as ProductCardBody } from "@nextui-org/card";
