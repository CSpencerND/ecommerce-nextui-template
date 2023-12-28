"use client";

import { ProductImageProvider } from "@/components/product";

export function ProductProvider({ children }: React.PropsWithChildren) {
    return <ProductImageProvider>{children}</ProductImageProvider>;
}
