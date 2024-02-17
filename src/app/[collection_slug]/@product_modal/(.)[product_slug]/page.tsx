"use client";

import { AddToCartButton } from "@/components/cart";
import { ProductShowcase } from "../../product-components";

import {
    ProductImageGroup,
    ProductProvider,
    useProductDrawer,
} from "@/components/product";

import {
    Drawer,
    DrawerBody,
    DrawerDescription,
    DrawerFooter,
    DrawerTitle,
} from "@/components/ui/drawer";

import { Modal, ModalContent } from "@nextui-org/modal";

import { ColorSelector, SizeSelector } from "@/components/selectors";
import { Button } from "@nextui-org/button";
import { VisuallyHidden } from "@react-aria/visually-hidden";
// import { XIcon } from "lucide-react";

import { useMediaQuery } from "@react-hookz/web";
import { useRouter, useSearchParams } from "next/navigation";

import { prose } from "@/styles";

export default function ProductPageModal() {
    const productData = useProductDrawer((s) => s.data);

    const router = useRouter();
    const searchParams = useSearchParams();
    const isMobile = useMediaQuery("(max-width: 767px)");

    if (!productData) return null;
    const { name, description, images, price, sizes, colors } = productData;

    const selectedColor = searchParams.get("color");
    const selectedSize = searchParams.get("size");

    const isBuyDisabled = !selectedColor || !selectedSize;

    if (isMobile)
        return (
            <Drawer
                open={true}
                onOpenChange={(open) => {
                    if (open === false) {
                        router.back();
                    }
                }}
                preventScrollRestoration
            >
                <ProductProvider>
                    <DrawerBody>
                        <ProductImageGroup
                            images={images.map((image, i) => ({
                                src: image.src,
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
                                fugiat reprehenderit enim labore culpa sint ad
                                nisi Lorem pariatur mollit ex esse exercitation
                                amet. Nisi anim cupidatat excepteur officia.
                                Reprehenderit nostrud nostrud ipsum Lorem est
                                aliquip amet voluptate
                            </p>
                        </div>
                    </DrawerBody>
                    <DrawerFooter>
                        <div className="space-y-3 py-7">
                            <ColorSelector colors={colors} />
                            <SizeSelector sizes={sizes} />
                        </div>

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
                            className="flex gap-3 *:flex-1 *:font-semibold"
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
                            <AddToCartButton
                                item={productData}
                                isDisabled={isBuyDisabled}
                            >
                                Add To Cart
                            </AddToCartButton>
                        </div>
                    </DrawerFooter>
                </ProductProvider>
            </Drawer>
        );

    return (
        <Modal
            defaultOpen
            onClose={router.back}
            backdrop="blur"
            // hideCloseButton
        >
            <ModalContent className="max-w-fit !rounded-2xlarge bg-transparent">
                {/* <div className="absolute right-2 top-2 z-50"> */}
                {/*     <Button */}
                {/*         isIconOnly */}
                {/*         size="sm" */}
                {/*         variant="light" */}
                {/*         radius="full" */}
                {/*         onPress={router.back} */}
                {/*     > */}
                {/*         <XIcon */}
                {/*             size={22} */}
                {/*             className="stroke-foreground-500" */}
                {/*         /> */}
                {/*     </Button> */}
                {/* </div> */}

                <ProductShowcase product={productData} />
            </ModalContent>
        </Modal>
    );
}
