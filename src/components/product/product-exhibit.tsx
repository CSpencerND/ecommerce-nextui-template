import { ProductImageGroup, ProductProvider } from "@/components/product";
import { ColorSelector, SizeSelector } from "@/components/selectors";

import { Button } from "@nextui-org/button";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { prose } from "@/styles";
import { cn } from "@nextui-org/system";

import type { Product } from "@/types";

export function ProductExhibit({
    productData,
    className,
}: {
    productData: Product;
    className?: string;
}) {
    const { images, name, description, price, colors, sizes } = productData;

    return (
        <div
            className={cn(
                "grid place-items-center gap-6 rounded-2xlarge bg-content1/80 p-6",
                "shadow-large backdrop-blur-md backdrop-saturate-150 sm:grid-cols-[auto_1fr]",
                className,
            )}
        >
            <ProductProvider>
                <ProductImageGroup
                    images={images.map((image, i) => ({
                        src: image,
                        alt: `Product Image ${i}`,
                    }))}
                    size="full"
                    isBordered
                />

                <div className="grid h-full max-h-[28rem] max-w-sm sm:max-h-96">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <ScrollShadow
                        size={80}
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
                    </ScrollShadow>
                    <div className="space-y-6 self-end">
                        <p className="font-bold">{price}</p>
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
    );
}
