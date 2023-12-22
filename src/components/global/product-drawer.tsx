"use client";
/**
 * TODO:
 * Display the color and size so they know what they're adding. This could be `Visually Hidden`.
 * Disable or Hide the buttons until a variant is selected.
 */

import { ProductImageGroup } from "@/components/product-image";
import { ProductProvider } from "@/components/product/product-provider";
import { ColorSelector, SizeSelector } from "@/components/selectors";
import { Button } from "@nextui-org/button";

import {
    Drawer,
    DrawerBody,
    DrawerDescription,
    DrawerFooter,
    DrawerTitle,
    useDrawer,
} from "@/components/ui/drawer";

import { prose } from "@/styles";

export function ProductDrawer() {
    const data = useDrawer((s) => s.data);
    if (!data) return null;
    const { name, description, images, price, sizes, colors } = data;

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

                    <div className="inline-flex max-w-min gap-3 *:flex-1 *:font-semibold">
                        <Button
                            color="primary"
                            variant="shadow"
                            // isDisabled={}
                        >
                            Buy Now
                        </Button>
                        <Button
                            color="primary"
                            variant="ghost"
                            // isDisabled={}
                        >
                            Add To Bag
                        </Button>
                    </div>
                </DrawerFooter>
            </ProductProvider>
        </Drawer>
    );
}
