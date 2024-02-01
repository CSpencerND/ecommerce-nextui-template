"use client";

import Link from "next/link";
import { forwardRef } from "react";

import { useProductDrawer } from "@/hooks";

import type { Product, Maybe } from "@/types";

type ProductLinkProps = React.ComponentPropsWithoutRef<typeof Link> & {
    data: Maybe<Product>;
};
type ProductLinkRef = React.ElementRef<typeof Link>;

const ProductLink = forwardRef<ProductLinkRef, ProductLinkProps>(
    ({ href, data, ...props }, ref) => {
        const setData = useProductDrawer((s) => s.setData);

        if (!data) throw new Error("ProductLink requires data of type `Product`");

        return (
            <Link
                ref={ref}
                href={href}
                onClick={() => {
                    setData(data);
                }}
                {...props}
            />
        );
    },
);
ProductLink.displayName = "ProductLink";

export { ProductLink };
// export type { ProductLinkProps };
