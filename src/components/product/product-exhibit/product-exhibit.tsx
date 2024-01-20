"use client";

import {
    ProductExhibitProvider,
    useProductExhibit,
} from "./product-exhibit-context";

import { ColorSelector, SizeSelector } from "@/components/selectors";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { VisuallyHidden } from "@react-aria/visually-hidden";

import { useSearchParams } from "next/navigation";

import { prose } from "@/styles";
import { cn } from "@nextui-org/system";

import type { Product } from "@/types";

export function ProductExhibit({
    children,
    productData,
    className,
}: {
    children: React.ReactNode;
    productData: Product;
    className?: string;
}) {
    const searchParams = useSearchParams();

    const selectedColor = searchParams.get("color");
    const selectedSize = searchParams.get("size");

    const isBuyDisabled = !selectedColor || !selectedSize;

    return (
        <Card className="!rounded-2xlarge">
            <CardBody className={cn("p-6", className)}>
                <ProductExhibitProvider
                    productData={productData}
                    selectedColor={selectedColor}
                    selectedSize={selectedSize}
                    isBuyDisabled={isBuyDisabled}
                >
                    {children}
                </ProductExhibitProvider>
            </CardBody>
        </Card>
    );
}

export function ProductExhibitHeader({ className }: { className?: string }) {
    const { name, price } = useProductExhibit((s) => s.productData);

    return (
        <header
            className={cn("flex h-fit items-baseline justify-between", className)}
        >
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="font-semibold">{price}</p>
        </header>
    );
}

export function ProductExhibitDescription() {
    const { description } = useProductExhibit((s) => s.productData);

    return (
        <ScrollShadow
            as="aside"
            size={80}
            className={prose({
                class: "space-y-3 prose-p:m-0",
            })}
        >
            <p>{description}.</p>
            <p>
                Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
                sint cillum sint consectetur cupidatat.
            </p>
            <p>
                Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
                sint cillum sint consectetur cupidatat.
            </p>
        </ScrollShadow>
    );
}

export function ProductExhibitButtons() {
    const {
        productData: { colors, sizes },
        selectedColor,
        selectedSize,
        isBuyDisabled,
    } = useProductExhibit();

    return (
        <div className="space-y-6">
            <div className="space-y-3">
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
    );
}

// export function ProductExhibit({
//     productData,
// }: {
//     productData: Product;
//     className?: string;
// }) {
//     const { images, name, description, price, colors, sizes } = productData;
//
//     const [scrollPadding, setScrollPadding] = useState(0);
//
//     const controlsRef: React.MutableRefObject<null | HTMLDivElement> =
//         useRef(null);
//     useResizeObserver(controlsRef, ({ borderBoxSize }) => {
//         const blockSize = borderBoxSize[0]?.blockSize;
//         if (!blockSize) return;
//         setScrollPadding(blockSize);
//     });
//
//     const searchParams = useSearchParams();
//
//     const selectedColor = searchParams.get("color");
//     const selectedSize = searchParams.get("size");
//
//     const isBuyDisabled = !selectedColor || !selectedSize;
//
//     return (
//         <div className="relative overflow-clip rounded-2xlarge bg-content1/80 p-6 shadow-large backdrop-blur-md backdrop-saturate-150">
//             <div className="flex max-h-[calc(100dvh-12rem)] gap-6 max-lg:max-w-96 max-lg:flex-col lg:max-h-[384px]">
//                 <ProductProvider>
//                     <ProductImageGroup
//                         images={images.map((image, i) => ({
//                             src: image,
//                             alt: `Product Image ${i}`,
//                         }))}
//                         size="full"
//                         isBordered
//                     />
//
//                     <ScrollShadow
//                         size={80}
//                         className="flex-1"
//                         style={{ paddingBlockEnd: scrollPadding }}
//                     >
//                         <div className="flex h-fit items-baseline justify-between">
//                             <h2 className="text-2xl font-bold">{name}</h2>
//                             <p className="font-semibold">{price}</p>
//                         </div>
//                         <aside
//                             className={prose({
//                                 class: "my-3 space-y-3 prose-p:m-0",
//                             })}
//                         >
//                             <p>{description}.</p>
//                             <p>
//                                 Lorem ipsum dolor sit amet, qui minim labore
//                                 adipisicing minim sint cillum sint consectetur
//                                 cupidatat.
//                             </p>
//                             <p>
//                                 Lorem ipsum dolor sit amet, qui minim labore
//                                 adipisicing minim sint cillum sint consectetur
//                                 cupidatat.
//                             </p>
//                         </aside>
//                     </ScrollShadow>
//
//                     <div
//                         ref={controlsRef}
//                         className={cn(
//                             "absolute bottom-0 z-50",
//                             "rounded-t-2xl border-b border-r border-t border-divider p-6 backdrop-blur-lg",
//                             "left-0 w-full lg:left-[calc(384px+24px)] lg:w-[calc(100%-384px-24px)]",
//                         )}
//                     >
//                         <div className="space-y-6 self-end">
//                             <div className="space-y-3">
//                                 <ColorSelector colors={colors} />
//                                 <SizeSelector sizes={sizes} />
//                             </div>
//
//                             <VisuallyHidden>
//                                 <aside className="text-small">
//                                     {!selectedColor && !selectedSize ? (
//                                         <p>{"Select your color & size"}</p>
//                                     ) : !selectedColor && selectedSize ? (
//                                         <p>Select your color</p>
//                                     ) : selectedColor && !selectedSize ? (
//                                         <p>Select your size</p>
//                                     ) : (
//                                         <p className="-ml-2 space-x-2 divide-x divide-foreground-500 *:pl-2">
//                                             <span>{selectedColor}</span>
//                                             <span>{selectedSize}</span>
//                                         </p>
//                                     )}
//                                 </aside>
//                             </VisuallyHidden>
//
//                             <div
//                                 className="flex max-w-96 gap-3"
//                                 onClick={() => {
//                                     if (!isBuyDisabled) return;
//                                     alert("Select your options");
//                                 }}
//                             >
//                                 <Button
//                                     color="primary"
//                                     variant="shadow"
//                                     fullWidth
//                                     isDisabled={isBuyDisabled}
//                                 >
//                                     Buy Now
//                                 </Button>
//                                 <Button
//                                     color="primary"
//                                     variant="ghost"
//                                     fullWidth
//                                     isDisabled={isBuyDisabled}
//                                 >
//                                     Add To Bag
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </ProductProvider>
//             </div>
//         </div>
//     );
// }
