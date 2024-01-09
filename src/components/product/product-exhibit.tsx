"use client";

import { ProductImageGroup, ProductProvider } from "@/components/product";
import { ColorSelector, SizeSelector } from "@/components/selectors";

import { VisuallyHidden } from "@react-aria/visually-hidden";
import { Button } from "@nextui-org/button";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { useSearchParams } from "next/navigation";

import { prose } from "@/styles";
import { cn } from "@nextui-org/system";

import type { Product } from "@/types";

export function ProductExhibitWrapper({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "grid place-items-center gap-6 overflow-clip rounded-2xlarge bg-content1/80 p-6",
                "shadow-large backdrop-blur-md backdrop-saturate-150 sm:grid-cols-[auto_1fr]",
                className,
            )}
            {...props}
        />
    );
}

export function ProductExhibit({
    productData,
}: {
    productData: Product;
    className?: string;
}) {
    const { images, name, description, price, colors, sizes } = productData;

    const searchParams = useSearchParams();

    const selectedColor = searchParams.get("color");
    const selectedSize = searchParams.get("size");

    const isBuyDisabled = !selectedColor || !selectedSize;

    return (
        <>
            <div className="flex max-h-[calc(100dvh-12rem)] flex-col md:hidden">
                <ProductProvider>
                    <ScrollShadow
                        size={80}
                        className="pb-12"
                    >
                        <ProductImageGroup
                            images={images.map((image, i) => ({
                                src: image,
                                alt: `Product Image ${i}`,
                            }))}
                            size="full"
                            isBordered
                        />

                        <div className="mt-6 flex items-baseline justify-between">
                            <h2 className="text-2xl font-bold">{name}</h2>
                            <p className="font-semibold">{price}</p>
                        </div>
                        <aside
                            className={prose({
                                class: "my-3 space-y-3 prose-p:m-0",
                            })}
                        >
                            <p>{description}.</p>
                            <p>
                                Lorem ipsum dolor sit amet, qui minim labore
                                adipisicing minim sint cillum sint consectetur
                                cupidatat.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, qui minim labore
                                adipisicing minim sint cillum sint consectetur
                                cupidatat.
                            </p>
                        </aside>
                    </ScrollShadow>
                    <div className="-m-6 rounded-b-2xlarge rounded-t-2xl p-6 shadow-small backdrop-blur-sm">
                        <div className="space-y-6 self-end">
                            <div className="space-y-3">
                                <ColorSelector colors={colors} />
                                <SizeSelector sizes={sizes} />
                            </div>

                            {/* <SingleSlider> */}
                            {/*     <ColorSelector colors={colors} /> */}
                            {/*     <SizeSelector sizes={sizes} /> */}
                            {/* </SingleSlider> */}

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
                                className="flex gap-3"
                                onClick={() => {
                                    if (!isBuyDisabled) return;
                                    alert("Select your options");
                                }}
                            >
                                <Button
                                    color="primary"
                                    variant="shadow"
                                    fullWidth
                                    isDisabled={isBuyDisabled}
                                >
                                    Buy Now
                                </Button>
                                <Button
                                    color="primary"
                                    variant="ghost"
                                    fullWidth
                                    isDisabled={isBuyDisabled}
                                >
                                    Add To Bag
                                </Button>
                            </div>
                        </div>
                    </div>
                </ProductProvider>
            </div>

            <div className="max-md:hidden">
                <ProductProvider>
                    <ProductImageGroup
                        images={images.map((image, i) => ({
                            src: image,
                            alt: `Product Image ${i}`,
                        }))}
                        size="full"
                        isBordered
                    />

                    <div className="grid h-full max-h-[28rem] max-w-sm pt-3 sm:max-h-96">
                        <div className="flex items-baseline justify-between">
                            <h2 className="text-2xl font-bold">{name}</h2>
                            <p className="font-bold">{price}</p>
                        </div>
                        <ScrollShadow
                            size={80}
                            className={prose({
                                class: "my-3 space-y-3 pb-6 prose-p:m-0",
                            })}
                        >
                            <p>{description}.</p>
                            <p>
                                Lorem ipsum dolor sit amet, qui minim labore
                                adipisicing minim sint cillum sint consectetur
                                cupidatat.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, qui minim labore
                                adipisicing minim sint cillum sint consectetur
                                cupidatat.
                            </p>
                        </ScrollShadow>
                        <div className="-mx-6 space-y-6 self-end rounded-t-2xl border-t border-divider px-6 pt-6 backdrop-blur-sm">
                            <div className="space-y-3">
                                <ColorSelector colors={colors} />
                                <SizeSelector sizes={sizes} />
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    color="primary"
                                    variant="shadow"
                                    fullWidth
                                >
                                    Buy Now
                                </Button>
                                <Button
                                    color="primary"
                                    variant="solid"
                                    fullWidth
                                >
                                    Add To Bag
                                </Button>
                            </div>
                        </div>
                    </div>
                </ProductProvider>
            </div>
        </>
    );
}
