"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import { Card, CardFooter } from "@nextui-org/card";
import { Pagination } from "@nextui-org/pagination";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useHydrated } from "@/hooks/use-hydrated";
import { useCallback, useEffect, useState } from "react";

import useEmblaCarousel, { type EmblaCarouselType } from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { cn } from "@nextui-org/react";

export type CarouselProps = {
    children: React.ReactNode[];
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
            className="max-w-prose overflow-hidden rounded-xlarge bg-content1 p-3 shadow-medium"
        >
            <ul
                id="carousel"
                aria-label="Carousel"
                className={cn(
                    "flex flex-row space-x-3 px-3 hover:cursor-grab active:cursor-grabbing",
                    className,
                )}
            >
                {children}
            </ul>
            <CarouselFooter show={showControls}>
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
            </CarouselFooter>
        </div>
    );
}

export type CarouselItemProps = React.PropsWithChildren & {
    title?: string;
    index: number;
};

export function CarouselItem({ children, title, index }: CarouselItemProps) {
    return (
        <Card
            aria-label={`Carousel Item ${index + 1}`}
            as="li"
            disableAnimation
            shadow="none"
            isFooterBlurred
            className="min-w-fit flex-none !transition-none"
        >
            {children}

            {title ? (
                <CardFooter className="prose absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] truncate rounded-medium border-1 border-white/20 bg-black/30 py-1 shadow-small dark:prose-invert">
                    <h4>{title}</h4>
                </CardFooter>
            ) : null}
        </Card>
    );
}

export type CarouselFooterProps = React.PropsWithChildren & {
    show?: boolean;
};

export function CarouselFooter({ show, children }: CarouselFooterProps) {
    const hydrated = useHydrated();
    if (!hydrated) return null;

    if (!show) return null;
    return (
        <footer
            aria-label="Carousel Control Panel"
            className="flex justify-center gap-6 pt-6"
        >
            {children}
        </footer>
    );
}

export type CarouselControlsProps = {
    scrollNextSlide?: () => void;
    scrollPrevSlide?: () => void;
};

export function CarouselControls({ scrollPrevSlide, scrollNextSlide }: CarouselControlsProps) {
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
                    onPress={() => (scrollPrevSlide ? scrollPrevSlide() : {})}
                    className="bg-content2 shadow-sm hover:bg-content4"
                >
                    <ChevronLeft size={14} />
                </Button>
                <Button
                    aria-label="Go To Next Slide"
                    onPress={() => (scrollNextSlide ? scrollNextSlide() : {})}
                    className="bg-content2 shadow-sm hover:bg-content4"
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
            onChange={(i: number) => (setSlide ? setSlide(i - 1) : {})}
            classNames={{
                item: "relative after:absolute after:h-2 after:w-2 after:bg-content1 after:rounded-full text-transparent",
                cursor: "text-transparent rounded-full w-2 h-2 ml-3 bg-default-600",
            }}
        />
    );
}
