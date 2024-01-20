"use client";

import * as React from "react";

import { Button, ButtonGroup } from "@nextui-org/button";
import { ChevronLeftIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import {
    CarouselProvider,
    useCarousel,
    // type CarouselApi,
    type CarouselProps,
} from "./carousel-context";

import { cn } from "@nextui-org/system";

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "group relative rounded-xlarge bg-content1 shadow-medium",
                    className,
                )}
                role="region"
                aria-roledescription="carousel"
                {...props}
            >
                <CarouselProvider {...props}>{children}</CarouselProvider>
            </div>
        );
    },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { carouselRef, handleKeyDown } = useCarousel();

    return (
        <div
            ref={carouselRef}
            onKeyDownCapture={handleKeyDown}
            className="overflow-clip rounded-xlarge px-3 py-6 focus-visible-within:ring-2"
        >
            <div
                ref={ref}
                className={cn("-ml-4 flex rounded-large", className)}
                {...props}
            />
        </div>
    );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            role="group"
            aria-roledescription="slide"
            className={cn("min-w-0 flex-none pl-4", className)}
            {...props}
        />
    );
});
CarouselItem.displayName = "CarouselItem";

const CarouselControls = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            role="complementary"
            aria-roledescription="slide controls"
            className={cn("mb-6 flex justify-center gap-3", className)}
            {...props}
        />
    );
});
CarouselControls.displayName = "CarouselControls";

const CarouselArrows = React.forwardRef<
    React.ElementRef<typeof ButtonGroup>,
    React.ComponentPropsWithoutRef<typeof ButtonGroup>
>(({ className, ...props }, ref) => {
    return (
        <ButtonGroup
            ref={ref}
            aria-controls="carousel"
            isIconOnly
            size="sm"
            radius="full"
            variant="flat"
            className={cn(
                "divide-x divide-background/20 rounded-full shadow-sm",
                className,
            )}
            {...props}
        >
            <CarouselPrev />
            <CarouselNext />
        </ButtonGroup>
    );
});
CarouselArrows.displayName = "CarouselArrows";

const CarouselPrev = () => {
    const { canScrollPrev, scrollPrev } = useCarousel();
    return (
        <Button
            disabled={!canScrollPrev}
            onClick={scrollPrev}
        >
            <ChevronLeftIcon size={16} />
            <span className="sr-only">Previous Slide</span>
        </Button>
    );
};

const CarouselNext = () => {
    const { canScrollNext, scrollNext } = useCarousel();
    return (
        <Button
            disabled={!canScrollNext}
            onClick={scrollNext}
        >
            <ChevronRightIcon size={16} />
            <span className="sr-only">Next Slide</span>
        </Button>
    );
};

const CarouselDots = ({ numSlides }: { numSlides: number }) => {
    const { scrollTo, selectedScrollSnap } = useCarousel();

    return (
        <ButtonGroup
            aria-hidden="true"
            isIconOnly
            variant="flat"
            size="sm"
            radius="full"
            className="overflow-clip rounded-full shadow-sm"
        >
            {Array.from({ length: numSlides }).map((_, i) => (
                <Button
                    key={i}
                    onClick={() => scrollTo(i)}
                    className="relative z-[unset] overflow-auto scrollbar-hide"
                    tabIndex={-1}
                >
                    <CircleIcon
                        size={16}
                        className={cn(
                            "p-1",
                            i === selectedScrollSnap
                                ? "fill-foreground stroke-foreground"
                                : "fill-content1 stroke-content1",
                        )}
                    />
                </Button>
            ))}
        </ButtonGroup>
    );
};

export {
    Carousel,
    CarouselArrows,
    CarouselContent,
    CarouselControls,
    CarouselDots,
    CarouselItem,
    // CarouselNext,
    // CarouselPrev,
    // type CarouselApi,
};
