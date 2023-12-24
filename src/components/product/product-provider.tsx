"use client";

import { ActiveImageProvider } from "@/components/product-image";

export function ProductProvider({ children }: React.PropsWithChildren) {
    return <ActiveImageProvider>{children}</ActiveImageProvider>;
}
