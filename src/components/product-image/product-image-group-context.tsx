"use client";

import { createContext, useCallback, useContext, useState } from "react";

type ProductImageGroupContext = {
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    getActiveIndexAsString: () => string;
};

const ProductImageGroupContext = createContext<ProductImageGroupContext | null>(null);

export function ProductImageGroupProvider({ children }: React.PropsWithChildren) {
    const [activeIndex, setActiveIndex] = useState(0);
    const getActiveIndexAsString = useCallback(() => activeIndex.toString(), [activeIndex]);

    const context = { activeIndex, setActiveIndex, getActiveIndexAsString };

    return (
        <ProductImageGroupContext.Provider value={context}>
            {children}
        </ProductImageGroupContext.Provider>
    );
}

export function useProductImageGroup() {
    const context = useContext(ProductImageGroupContext);

    if (!context) {
        throw new Error(
            "useProductImageGroup: `context` is undefined. Seems you forgot to wrap the component with <ProductImageGroup />",
        );
    }

    return context;
}
