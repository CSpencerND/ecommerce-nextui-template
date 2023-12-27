"use client";

import * as React from "react";

import { Button, ButtonGroup } from "@nextui-org/button";
import { ChevronLeftIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { useCarousel } from "./carousel-context";

// import { motion } from "framer-motion";
import { controls, dots } from "./carousel-styles";

import type { VariantProps } from "tailwind-variants";

const { prev, next } = controls();

const CarouselControls = (
    props: Omit<VariantProps<typeof controls>, "orientation"> & {
        numSlides: number;
    },
) => {
    const { isFloating, numSlides } = props;

    if (isFloating) {
        return (
            <>
                <CarouselPrevious isFloating={isFloating} />
                <CarouselNext isFloating={isFloating} />
            </>
        );
    }
    return (
        <div className="mb-6 flex justify-center gap-3">
            <CarouselDots numSlides={numSlides} />
            <ButtonGroup
                aria-controls="carousel"
                isIconOnly
                size="sm"
                radius="full"
                className="rounded-full shadow-sm"
            >
                <CarouselPrevious isFloating={isFloating} />
                <CarouselNext isFloating={isFloating} />
            </ButtonGroup>
        </div>
    );
};

const CarouselPrevious = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof Button> & {
        isFloating: boolean;
    }
>(({ className, variant = "solid", size = "sm", isFloating, ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
        <Button
            ref={ref}
            isIconOnly
            size={size}
            variant={variant}
            className={prev({ orientation, isFloating, className })}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            {...props}
        >
            <ChevronLeftIcon size={16} />
            <span className="sr-only">Previous slide</span>
        </Button>
    );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof Button> & {
        isFloating: boolean;
    }
>(({ className, variant = "solid", size = "sm", isFloating, ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
        <Button
            ref={ref}
            isIconOnly
            size={size}
            variant={variant}
            className={next({ orientation, isFloating, className })}
            disabled={!canScrollNext}
            onClick={scrollNext}
            {...props}
        >
            <ChevronRightIcon size={16} />
            <span className="sr-only">Next slide</span>
        </Button>
    );
});
CarouselNext.displayName = "CarouselNext";

// const Indicator = motion(CircleIcon);

const CarouselDots = ({ numSlides }: { numSlides: number }) => {
    const { scrollTo, selectedScrollSnap } = useCarousel();
    const { base, button, icon } = dots();
    // const { base, button, icon, indicator } = dots();

    return (
        <ButtonGroup
            aria-hidden="true"
            isIconOnly
            variant="solid"
            size="sm"
            radius="full"
            className={base()}
        >
            {Array.from({ length: numSlides }).map((_, i) => (
                <Button
                    key={i}
                    onClick={() => scrollTo(i)}
                    className={button()}
                    style={{
                        WebkitTapHighlightColor: "transparent",
                    }}
                    tabIndex={-1}
                >
                    <CircleIcon
                        size={16}
                        className={icon({ isSelected: i === selectedScrollSnap })}
                    />
                </Button>
            ))}
        </ButtonGroup>
    );
    // return (
    //     <ButtonGroup
    //         aria-hidden="true"
    //         isIconOnly
    //         variant="solid"
    //         size="sm"
    //         radius="full"
    //         className={base()}
    //     >
    //         {Array.from({ length: numSlides }).map((_, i) => (
    //             <Button
    //                 key={i}
    //                 onClick={() => scrollTo(i)}
    //                 className={button()}
    //                 style={{
    //                     WebkitTapHighlightColor: "transparent",
    //                 }}
    //                 tabIndex={-1}
    //             >
    //                 {i === selectedScrollSnap && (
    //                     <Indicator
    //                         layoutId="indicator"
    //                         size={16}
    //                         className={indicator()}
    //                     />
    //                 )}
    //                 <CircleIcon
    //                     size={16}
    //                     className={icon()}
    //                 />
    //             </Button>
    //         ))}
    //     </ButtonGroup>
    // );
};

export { CarouselControls, CarouselDots, CarouselNext, CarouselPrevious };
