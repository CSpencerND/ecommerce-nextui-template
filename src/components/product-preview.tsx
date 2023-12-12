"use client";

import Link from "next/link";

import { MotionListItem, type MotionListItemProps } from "@/components/motion";
import { Card, CardBody, CardFooter, type CardProps } from "@nextui-org/card";

import { ProductImageGroupProvider } from "@/components/product-image";
import { usePathname } from "next/navigation";

import { card } from "@/styles";
import { cn } from "@nextui-org/system";

export type ProductPreviewCardProps = CardProps & MotionListItemProps;

/**
 * NOTE: Holding on to this in case I need it
 * @deprecated Everything is in the `page.tsx`. No need for a component.
 */
export function ProductPreviewCard(props: ProductPreviewCardProps) {
    const { className, children } = props;

    return (
        <Card
            as={MotionListItem}
            isFooterBlurred
            className={card.root({ radius: "xl", className })}
            {...props}
        >
            <ProductImageGroupProvider>{children}</ProductImageGroupProvider>
        </Card>
    );
}

export type ProductPreviewBodyProps = React.PropsWithChildren & {
    slug: string;
    title?: string;
};

export function ProductPreviewBody({ slug, title, children }: ProductPreviewBodyProps) {
    const pathname = usePathname();

    return (
        <CardBody
            as={Link}
            href={`${pathname}/${slug.toLowerCase()}`}
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
            className={cn(
                "flex flex-col justify-center gap-3 px-3 pb-3 @container/footer",
                props.className,
            )}
            {...props}
        />
    );
}
