"use client";

import * as React from "react";

import useEmblaCarousel, {
    type EmblaCarouselType as CarouselApi,
} from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import {
    CarouselProvider,
    useCarousel,
    type CarouselProps,
} from "./carousel-context";

import { carousel } from "./carousel-styles";

const Carousel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
    (
        {
            orientation = "horizontal",
            opts,
            setApi,
            plugins = [],
            className,
            children,
            ...props
        },
        ref,
    ) => {
        const [carouselRef, api] = useEmblaCarousel(
            {
                ...opts,
                axis: orientation === "horizontal" ? "x" : "y",
            },
            [WheelGesturesPlugin(), ...plugins],
        );
        const [canScrollPrev, setCanScrollPrev] = React.useState(false);
        const [canScrollNext, setCanScrollNext] = React.useState(false);

        const [selectedScrollSnap, setSelectedScrollSnap] = React.useState(0);
        const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

        const onInit = React.useCallback((api: CarouselApi) => {
            if (!api) return;

            setScrollSnaps(api.scrollSnapList());
        }, []);

        const onSelect = React.useCallback((api: CarouselApi) => {
            if (!api) return;

            setSelectedScrollSnap(api.selectedScrollSnap());
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        }, []);

        const scrollPrev = React.useCallback(() => {
            api?.scrollPrev();
        }, [api]);

        const scrollNext = React.useCallback(() => {
            api?.scrollNext();
        }, [api]);

        const scrollTo = React.useCallback(
            (i: number) => {
                api?.scrollTo(i);
            },
            [api],
        );

        const handleKeyDown = React.useCallback(
            (event: React.KeyboardEvent<HTMLDivElement>) => {
                if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    scrollPrev();
                } else if (event.key === "ArrowRight") {
                    event.preventDefault();
                    scrollNext();
                }
            },
            [scrollPrev, scrollNext],
        );

        React.useEffect(() => {
            if (!api || !setApi) {
                return;
            }

            setApi(api);
        }, [api, setApi]);

        React.useEffect(() => {
            if (!api) return;

            onInit(api);
            onSelect(api);
            api.on("reInit", onSelect);
            api.on("select", onSelect);

            return () => {
                api?.off("select", onInit);
                api?.off("select", onSelect);
            };
        }, [api, onInit, onSelect]);

        const { base, ...rest } = carousel({ orientation, className });

        return (
            <CarouselProvider
                value={{
                    carouselRef,
                    api: api,
                    opts,
                    orientation:
                        orientation ||
                        (opts?.axis === "y" ? "vertical" : "horizontal"),
                    scrollPrev,
                    scrollNext,
                    canScrollPrev,
                    canScrollNext,
                    scrollSnaps,
                    scrollTo,
                    selectedScrollSnap,
                    setSelectedScrollSnap,
                    ...rest,
                }}
            >
                <div
                    ref={ref}
                    onKeyDownCapture={handleKeyDown}
                    className={base({ className })}
                    role="region"
                    aria-roledescription="carousel"
                    {...props}
                >
                    {children}
                </div>
            </CarouselProvider>
        );
    },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { carouselRef, orientation, wrapper, content } = useCarousel();

    return (
        <div
            ref={carouselRef}
            className={wrapper()}
        >
            <div
                ref={ref}
                className={content({ orientation, className })}
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
    const { orientation, item } = useCarousel();

    return (
        <div
            ref={ref}
            role="group"
            aria-roledescription="slide"
            className={item({ orientation, className })}
            {...props}
        />
    );
});
CarouselItem.displayName = "CarouselItem";

export { Carousel, CarouselContent, CarouselItem, type CarouselApi };
