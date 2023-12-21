"use client"

import { ProductImageGroupProvider } from "@/components/product-image";

export function ProductProvider({ children }: React.PropsWithChildren) {
    return <ProductImageGroupProvider>{children}</ProductImageGroupProvider>;
}
