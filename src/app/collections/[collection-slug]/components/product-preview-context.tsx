"use client";

import { createContext, useCallback, useContext, useState } from "react";

type ProductPreviewContext = {
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    getActiveIndexAsString: () => string;
};

const ProductPreviewContext = createContext<ProductPreviewContext | null>(null);

export function ProductPreviewProvider({ children }: React.PropsWithChildren) {
    const [activeIndex, setActiveIndex] = useState(0);
    const getActiveIndexAsString = useCallback(() => activeIndex.toString(), [activeIndex]);

    const context = { activeIndex, setActiveIndex, getActiveIndexAsString };

    return (
        <ProductPreviewContext.Provider value={context}>
            {children}
        </ProductPreviewContext.Provider>
    );
}

export function useProductPreview() {
    const context = useContext(ProductPreviewContext);

    if (!context) {
        throw new Error(
            "useProductPreview: `context` is undefined. Seems you forgot to wrap the component with <ProductPreviewCard />",
        );
    }

    return context
}
