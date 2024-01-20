"use client";

import { ProductProvider } from "@/components/product";
import { createContext, useContext } from "react";

import type { Product } from "@/types";

type ProductExhibitContext = {
    children: React.ReactNode;
    productData: Product;
    selectedColor: string | null;
    selectedSize: string | null;
    isBuyDisabled: boolean;
};

type PropertySelector<T> = (context: ProductExhibitContext) => T;

const ProductExhibitContext = createContext<ProductExhibitContext>({
    children: null,
    productData: {
        id: "",
        name: "",
        description: "",
        price: "",
        colors: [],
        sizes: [],
        images: [],
    },
    selectedColor: null,
    selectedSize: null,
    isBuyDisabled: false,
});

export function ProductExhibitProvider(props: ProductExhibitContext) {
    if (!props) {
        throw new Error("ProductExhibitProvider requires props to be provided.");
    }

    return (
        <ProductExhibitContext.Provider value={props}>
            <ProductProvider>{props.children}</ProductProvider>
        </ProductExhibitContext.Provider>
    );
}

export function useProductExhibit<T = ProductExhibitContext>(
    selector?: PropertySelector<T>,
): T {
    const context = useContext(ProductExhibitContext);

    if (!context) {
        throw new Error(
            "useProductExhibit must be used within a <ProductExhibit />",
        );
    }

    return selector ? selector(context as ProductExhibitContext) : (context as T);
}
