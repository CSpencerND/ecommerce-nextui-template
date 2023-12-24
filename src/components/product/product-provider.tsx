"use client";

import { ActiveImageProvider } from "@/components/product";

export function ProductProvider({ children }: React.PropsWithChildren) {
    return <ActiveImageProvider>{children}</ActiveImageProvider>;
}
