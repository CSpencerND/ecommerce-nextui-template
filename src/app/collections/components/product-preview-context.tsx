import { createContext } from "@nextui-org/react-utils";
import type { ProductPreviewState } from "./product-preview-store";

export const [ProductPreviewProvider, useProductPreviewContext] =
    createContext<ProductPreviewState>({
        name: "ProductPreviewContext",
        strict: true,
        errorMessage:
            "useProductContext: `context` is undefined. Seems you forgot to wrap component within <ProductPreview />",
    });
