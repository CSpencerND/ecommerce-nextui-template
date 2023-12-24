"use client";

import { createContext, useContext } from "react";

type ProductImageGroupContext = React.PropsWithChildren & {};

const ProductImageGroupContext = createContext<ProductImageGroupContext | null>(null);

export function ProductImageGroupProvider({ children, ...props }: ProductImageGroupContext) {
    return (
        <ProductImageGroupContext.Provider value={props}>
            {children}
        </ProductImageGroupContext.Provider>
    );
}

export function useProductImageGroup() {
    const context = useContext(ProductImageGroupContext);

    if (!context) {
        throw new Error(
            "useProductImageGroup: `context` is undefined. Seems you forgot to wrap the component with <ProductImageGroupProvider />",
        );
    }

    return context;
}
