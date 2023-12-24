"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import { Card, CardFooter } from "@nextui-org/card";
import { Pagination } from "@nextui-org/pagination";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useCallback, useEffect, useState } from "react";

import useEmblaCarousel, { type EmblaCarouselType } from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { card } from "@/styles";
import { cn } from "@nextui-org/react";

export type CarouselProps = React.PropsWithChildren & {
    className?: string;
    numSlides: number;
    loop?: boolean;
    showControls?: boolean;
};

export function Carousel(props: CarouselProps) {
    const { children, className, numSlides, loop, showControls } = props;

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { align: "start", skipSnaps: true, containScroll: false, loop: loop },
        [WheelGesturesPlugin()],
    );

    const [currentSlide, setSlide] = useState<number>(0);

    const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
        const snap = emblaApi.selectedScrollSnap();
        setSlide(snap);
    }, []);

    const onKeyboardScroll = (e: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent) => {
        switch (e.key) {
            case "ArrowLeft":
                emblaApi?.scrollPrev();
                break;
            case "ArrowRight":
                emblaApi?.scrollNext();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (!emblaApi) return;

        onScroll(emblaApi);
        emblaApi.on("reInit", onScroll);
        emblaApi.on("scroll", onScroll);
    }, [emblaApi, onScroll]);

    return (
        <div
            aria-label="Carousel Container"
            ref={emblaRef}
            onKeyDown={onKeyboardScroll}
            className="max-w-prose overflow-clip rounded-xlarge bg-content1 p-3 py-6 shadow-medium"
        >
            <ul
                id="carousel"
                aria-label="Carousel"
                className={cn(
                    "inline-flex space-x-3 px-3 hover:cursor-grab active:cursor-grabbing",
                    className,
                )}
            >
                {children}
            </ul>
            <div
                aria-label="Carousel Control Panel"
                className="flex h-14 justify-center gap-6 pt-6 data-[hidden=true]:hidden"
                data-hidden={!showControls}
            >
                <CarouselPagination
                    numSlides={numSlides}
                    currentSlideIndex={currentSlide}
                    loop={loop}
                    setSlide={emblaApi?.scrollTo}
                />
                <CarouselControls
                    scrollPrevSlide={emblaApi?.scrollPrev}
                    scrollNextSlide={emblaApi?.scrollNext}
                />
            </div>
        </div>
    );
}

export type CarouselItemProps = React.PropsWithChildren & {
    className?: string;
    title?: string;
    index: number;
};

export function CarouselItem({ children, className, title, index }: CarouselItemProps) {
    return (
        <Card
            aria-label={`Carousel Item ${index + 1}`}
            as="li"
            disableAnimation
            shadow="none"
            isFooterBlurred
            className={card.root({ class: ["box-content flex-none", className] })}
        >
            {children}

            {title ? (
                <CardFooter className={card.title()}>
                    <h3 className="truncate text-medium font-bold text-white">{title}</h3>
                </CardFooter>
            ) : null}
        </Card>
    );
}

export type CarouselControlsProps = {
    scrollNextSlide?: () => void;
    scrollPrevSlide?: () => void;
};

export function CarouselControls({ scrollPrevSlide, scrollNextSlide }: CarouselControlsProps) {
    if (!scrollNextSlide || !scrollPrevSlide) return null;

    return (
        <>
            <ButtonGroup
                aria-controls="carousel"
                size="sm"
                radius="full"
                isIconOnly
                className="rounded-full"
            >
                <Button
                    aria-label="Go To Previous Slide"
                    onPress={scrollPrevSlide}
                    className="bg-content2 shadow-sm hover:bg-content3"
                >
                    <ChevronLeft size={14} />
                </Button>
                <Button
                    aria-label="Go To Next Slide"
                    onPress={scrollNextSlide}
                    className="bg-content2 shadow-sm hover:bg-content3"
                >
                    <ChevronRight size={14} />
                </Button>
            </ButtonGroup>
        </>
    );
}

export type CarouselPaginationProps = {
    loop?: boolean;
    numSlides: number;
    currentSlideIndex: number;
    setSlide?: (i: number) => void;
};

export function CarouselPagination(props: CarouselPaginationProps) {
    const { loop, numSlides, currentSlideIndex, setSlide } = props;

    if (!setSlide) return null;

    return (
        <Pagination
            aria-controls="Carousel"
            aria-label="Carousel Navigation"
            total={numSlides}
            size="sm"
            radius="full"
            color="default"
            loop={loop}
            isCompact
            page={currentSlideIndex + 1}
            onChange={(i: number) => setSlide(i - 1)}
            classNames={{
                item: "relative bg-content2 after:absolute after:size-2 after:bg-content1 after:rounded-full text-transparent",
                cursor: "text-transparent rounded-full bg-transparent after:absolute after:size-2 after:bg-default-600 after:rounded-full",
            }}
        />
    );
}
