"use client";
/**
 * TODO:
 * Possibly make the add to cart buttons fixed to the bottom of the screen in `DrawerFooter`.
 * Display the color and size above so they know what they're adding.
 * Disable or Hide the buttons until a variant is selected.
 */

import { ProductImageGroup } from "@/components/product-image";
import { ProductProvider } from "@/components/product/product-provider";
import { ColorSelector, SizeSelector } from "@/components/selectors";
import { Drawer, DrawerTitle, useDrawer } from "@/components/ui/drawer";
import { Button } from "@nextui-org/button";

import { prose } from "@/styles";

export function ProductDrawer() {
    const data = useDrawer((s) => s.data);

    if (!data) return null;

    const { name, description, images, price, sizes, colors } = data;

    return (
        <Drawer title={name}>
            <ProductProvider>
                <ProductImageGroup
                    images={images.map((image, i) => ({
                        src: image,
                        alt: `Product Image ${i}`,
                        size: "full",
                        bordered: true,
                    }))}
                />

                <div className="flex basis-full flex-col gap-6 pt-6">
                    <div className={prose({ sm: true })}>
                        {/* <DrawerTitle>{name}</DrawerTitle> */}
                        <p>{description}</p>
                        <p className="font-bold">{price}</p>
                    </div>

                    <ColorSelector colors={colors} />
                    <SizeSelector sizes={sizes} />

                    <div className="inline-flex max-w-min gap-3 [&>*]:flex-1 [&>*]:font-semibold">
                        <Button
                            color="primary"
                            variant="shadow"
                        >
                            Buy Now
                        </Button>
                        <Button
                            color="primary"
                            variant="solid"
                        >
                            Add To Bag
                        </Button>
                    </div>
                </div>
            </ProductProvider>
        </Drawer>
    );
}
