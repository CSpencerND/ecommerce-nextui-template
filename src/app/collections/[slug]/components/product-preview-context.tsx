"use client"

import { createContext } from "@nextui-org/react-utils";
import { useCallback, useState } from "react";

export function useInitProductPreviewState() {
    const [activeIndex, setActiveIndex] = useState(0);
    const getActiveIndexAsString = useCallback(() => activeIndex.toString(), [activeIndex]);

    return { activeIndex, setActiveIndex, getActiveIndexAsString };
}

type ProductPreviewState = ReturnType<typeof useInitProductPreviewState>;

export const [ProductPreviewProvider, useProductPreview] = createContext<ProductPreviewState>({
    name: "ProductPreviewContext",
    strict: true,
    errorMessage:
        "useProductContext: `context` is undefined. Seems you forgot to wrap the component with <ProductPreview />",
});
