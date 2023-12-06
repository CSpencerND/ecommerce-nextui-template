"use client"

import { ProductImage } from "@/components/preview-image";
import { useDeepCompareMemo } from "@react-hookz/web/esm/useDeepCompareMemo";
import { useProductImageGroup } from "./product-image-group-context";

export type ProductImageGroupProps = React.PropsWithChildren & {
    images: React.ComponentPropsWithRef<typeof ProductImage>[];
};

export function ProductImageGroup({ images, children }: ProductImageGroupProps) {
    const { activeIndex } = useProductImageGroup();

    const imageComponents = useDeepCompareMemo(() => {
        return images.map((image, i) => (
            <ProductImage
                key={i}
                {...image}
            />
        ));
    }, [images]);

    return imageComponents[activeIndex] ?? null;
}
