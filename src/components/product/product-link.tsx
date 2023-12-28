"use client";

import Link from "next/link";
import { forwardRef } from "react";

import { useProductDrawer } from "@/components/product";

import type { Product } from "@/types";

type ProductLinkProps = React.ComponentPropsWithoutRef<typeof Link> & {
    data: Product;
};
type ProductLinkRef = React.ElementRef<typeof Link>;

const ProductLink = forwardRef<ProductLinkRef, ProductLinkProps>(
    ({ href, data, ...props }, ref) => {
        const onOpen = useProductDrawer((s) => s.onOpen);

        return (
            <Link
                ref={ref}
                href={href}
                onClick={(e) => {
                    e.preventDefault();
                    onOpen(data);
                    window.history.replaceState({}, "", href.toString());
                }}
                {...props}
            />
        );
    },
);
ProductLink.displayName = "ProductLink";

export { ProductLink, type ProductLinkProps };
