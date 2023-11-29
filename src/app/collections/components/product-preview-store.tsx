"use client";

import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";

import type { CardProps } from "@nextui-org/card";
import type { ImageProps } from "@nextui-org/image";
import type { MotionProps } from "framer-motion";

export type ProductPreviewCardProps = CardProps &
    MotionProps & {
        index: number;
    };

type ProductPreviewBodyProps = ImageProps & {
    images: string[];
    title: string;
};

type ProductPreviewProps = ProductPreviewCardProps & ProductPreviewBodyProps;

export type ProductPreviewState = ProductPreviewProps & {
    activeIndex: string;
    setActiveIndex: (i: string) => void;
};

const createProductPreviewStore = (initProps?: Partial<ProductPreviewProps>) => {
    const DEFAULT_PROPS: ProductPreviewProps = {
        index: 0,
        images: [],
        title: "",
    };

    return createStore<ProductPreviewState>()((set) => ({
        ...DEFAULT_PROPS,
        ...initProps,
        activeIndex: "0",
        setActiveIndex: (i) => set({ activeIndex: i }),
    }));
};

type ProductPreviewStore = ReturnType<typeof createProductPreviewStore>;

const ProductPreviewContext = createContext<ProductPreviewStore | null>(null);

type ProductPreviewProviderProps = React.PropsWithChildren<ProductPreviewProps>;

export function ProductPreviewProvider({ children, ...props }: ProductPreviewProviderProps) {
    const storeRef = useRef<ProductPreviewStore>();

    if (!storeRef.current) {
        storeRef.current = createProductPreviewStore(props);
    }

    return (
        <ProductPreviewContext.Provider value={storeRef.current}>
            {children}
        </ProductPreviewContext.Provider>
    );
}

export function useProductPreview<T>(selector: (state: ProductPreviewState) => T): T {
    const store = useContext(ProductPreviewContext);
    if (!store) throw new Error("Missing `ProductPreview.Provider in the tree.");

    return useStore(store, selector);
}
