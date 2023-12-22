"use client";

import { ProductImageGroup } from "@/components/product-image";
import { ProductProvider } from "@/components/product/product-provider";
import { ColorSelector, SizeSelector } from "@/components/selectors";
import { Button } from "@nextui-org/button";
import { VisuallyHidden } from "@react-aria/visually-hidden";

import {
    Drawer,
    DrawerBody,
    DrawerDescription,
    DrawerFooter,
    DrawerTitle,
    useDrawer,
} from "@/components/ui/drawer";

import { useSearchParams } from "next/navigation";

import { prose } from "@/styles";

export function ProductDrawer() {
    const searchParams = useSearchParams();

    const data = useDrawer((s) => s.data);
    if (!data) return null;
    const { name, description, images, price, sizes, colors } = data;

    const selectedColor = searchParams.get("color");
    const selectedSize = searchParams.get("size");

    const isBuyDisabled = !selectedColor || !selectedSize;

    return (
        <Drawer>
            <ProductProvider>
                <DrawerBody>
                    <ProductImageGroup
                        images={images.map((image, i) => ({
                            src: image,
                            alt: `Product Image ${i}`,
                            size: "full",
                            bordered: true,
                            isZoomed: false,
                        }))}
                    />

                    <div className={prose({ sm: true })}>
                        <div className="flex items-center justify-between pt-3 *:m-0">
                            <DrawerTitle>{name}</DrawerTitle>
                            <p className="font-bold">{price}</p>
                        </div>
                        <DrawerDescription>{description}</DrawerDescription>
                        <DrawerDescription>{description}</DrawerDescription>
                        <DrawerDescription>{description}</DrawerDescription>
                        <DrawerDescription>{description}</DrawerDescription>
                    </div>
                </DrawerBody>
                <DrawerFooter>
                    <ColorSelector colors={colors} />
                    <SizeSelector sizes={sizes} />

                    <VisuallyHidden>
                        <aside className="text-small">
                            {!selectedColor && !selectedSize ? (
                                <p>{"Select your color & size"}</p>
                            ) : !selectedColor && selectedSize ? (
                                <p>Select your color</p>
                            ) : selectedColor && !selectedSize ? (
                                <p>Select your size</p>
                            ) : (
                                <p className="-ml-2 space-x-2 divide-x divide-foreground-500 *:pl-2">
                                    <span>{selectedColor}</span>
                                    <span>{selectedSize}</span>
                                </p>
                            )}
                        </aside>
                    </VisuallyHidden>

                    <div className="inline-flex max-w-min gap-3 *:flex-1 *:font-semibold">
                        <Button
                            color="primary"
                            variant="shadow"
                            isDisabled={isBuyDisabled}
                        >
                            Buy Now
                        </Button>
                        <Button
                            color="primary"
                            variant="ghost"
                            isDisabled={isBuyDisabled}
                        >
                            Add To Bag
                        </Button>
                    </div>
                </DrawerFooter>
            </ProductProvider>
        </Drawer>
    );
}
