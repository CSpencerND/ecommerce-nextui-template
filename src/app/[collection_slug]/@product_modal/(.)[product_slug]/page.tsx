"use client";

import { ProductImageGroup, ProductProvider } from "@/components/product";
import { ColorSelector, SizeSelector } from "@/components/selectors";
import { SingleSlider } from "@/components/ui/single-slider";
import { Button } from "@nextui-org/button";
import { VisuallyHidden } from "@react-aria/visually-hidden";

import {
    Drawer,
    DrawerBody,
    DrawerDescription,
    DrawerFooter,
    DrawerTitle,
} from "@/components/ui/drawer";

import { useProductDrawer } from "@/components/product";
import { useRouter, useSearchParams } from "next/navigation";

import { prose } from "@/styles";

export default function ProductPageModal() {
    const data = useProductDrawer((s) => s.data);

    const router = useRouter();
    const searchParams = useSearchParams();

    if (!data) return null;
    const { name, description, images, price, sizes, colors } = data;

    const selectedColor = searchParams.get("color");
    const selectedSize = searchParams.get("size");

    const isBuyDisabled = !selectedColor || !selectedSize;

    return (
        <Drawer
            open={true}
            onOpenChange={(open) => {
                if (open === false) {
                    router.back();
                }
            }}
        >
            <ProductProvider>
                <DrawerBody>
                    <ProductImageGroup
                        images={images.map((image, i) => ({
                            src: image,
                            alt: `Product Image ${i + 1}`,
                        }))}
                        size="full"
                        isBordered
                    />

                    <div className={prose({ sm: true, class: "pb-6 pt-3" })}>
                        <div className="flex items-center justify-between *:m-0">
                            <DrawerTitle>{name}</DrawerTitle>
                            <p className="font-bold">{price}</p>
                        </div>
                        <DrawerDescription>{description}</DrawerDescription>
                        <p>
                            Lorem ipsum dolor sit amet, officia excepteur ex
                            fugiat reprehenderit enim labore culpa sint ad nisi
                            Lorem pariatur mollit ex esse exercitation amet. Nisi
                            anim cupidatat excepteur officia. Reprehenderit
                            nostrud nostrud ipsum Lorem est aliquip amet voluptate
                        </p>
                    </div>
                </DrawerBody>
                <DrawerFooter>
                    <SingleSlider>
                        <ColorSelector colors={colors} />
                        <SizeSelector sizes={sizes} />
                    </SingleSlider>

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

                    <div
                        className="inline-flex gap-3 *:flex-1 *:font-semibold"
                        onClick={() => {
                            if (!isBuyDisabled) return;
                            alert("Select your options");
                        }}
                    >
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
