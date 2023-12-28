"use client";

import { createContext, useContext, useState } from "react";

type ProductImageContext = {
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

const ProductImageContext = createContext<ProductImageContext | null>(null);

export function ProductImageProvider({ children }: React.PropsWithChildren) {
    const [activeIndex, setActiveIndex] = useState(0);

    const context = { activeIndex, setActiveIndex };

    return (
        <ProductImageContext.Provider value={context}>
            {children}
        </ProductImageContext.Provider>
    );
}

export function useProductImage() {
    const context = useContext(ProductImageContext);

    if (!context) {
        throw new Error(
            "useProductImage: `context` is undefined. Seems you forgot to wrap the component with <ProductImageProvider />",
        );
    }

    return context;
}
