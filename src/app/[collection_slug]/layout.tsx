import { ProductDrawer } from "@/components/product";
import { Suspense } from "react";

export default function CollectionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <Suspense>
                <ProductDrawer />
            </Suspense>
        </>
    );
}
