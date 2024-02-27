"use client";

// import { useDeepCompareMemo } from "@react-hookz/web";
import { useProductImage } from "./product-image-context";

export function ProductImageGroup({ images }: { images: JSX.Element[] }) {
    const { activeIndex } = useProductImage();

    // const imagesMemo = useDeepCompareMemo(() => images, [images]);

    return images[activeIndex] ?? null;
}
