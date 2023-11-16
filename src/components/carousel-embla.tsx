"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import { Card, CardFooter } from "@nextui-org/card";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useHydrated } from "@/hooks/use-hydrated";
import { useCallback, useEffect, useState } from "react";

import useEmblaCarousel, { type EmblaCarouselType } from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { cn } from "@nextui-org/react";

export type CarouselProps = React.PropsWithChildren & {
    className?: string;
    numSlides: number;
    showControls?: boolean;
};

export function Carousel(props: CarouselProps) {
    const { children, className, numSlides, showControls } = props;

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { align: "center", skipSnaps: true, containScroll: false, loop: true },
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

    const hydrated = useHydrated();
    if (!hydrated) return null;

    return (
        <>
            <Card
                tabIndex={0}
                onKeyDown={onKeyboardScroll}
                className="max-w-prose p-3 hover:cursor-grab focus-visible:ring-2 focus-visible:ring-primary active:cursor-grabbing"
                ref={emblaRef}
                disableAnimation
            >
                <ul className={cn("flex", className)}>{children}</ul>
            </Card>
            {showControls ? (
                <div className="relative flex w-full max-w-prose flex-row items-center justify-center lg:justify-evenly">
                    <Card
                        aria-hidden="true"
                        className="flex h-fit w-fit flex-row items-center gap-2 rounded-xl bg-content1 p-1.5"
                        disableAnimation
                    >
                        {Array(numSlides)
                            .fill(null)
                            .map((_, i) => (
                                <Button
                                    isIconOnly
                                    size="sm"
                                    key={i}
                                    onPress={() => emblaApi?.scrollTo(i)}
                                    className={cn(
                                        "transition-color relative h-1 rounded-full bg-content4 py-0.5",
                                        currentSlide === i && "bg-foreground",
                                    )}
                                />
                            ))}
                    </Card>
                    <ButtonGroup
                        size="sm"
                        variant="flat"
                        isIconOnly
                        className="divide-x divide-content2 rounded-[10px] border border-content2 max-lg:hidden"
                        radius="sm"
                    >
                        <Button onPress={() => emblaApi?.scrollPrev()}>
                            <ChevronLeft size={20} />
                        </Button>
                        <Button onPress={() => emblaApi?.scrollNext()}>
                            <ChevronRight size={20} />
                        </Button>
                    </ButtonGroup>
                </div>
            ) : null}
        </>
    );
}

export type CarouselItemProps = React.PropsWithChildren & {
    title?: string;
};

export function CarouselItem({ children, title }: CarouselItemProps) {
    return (
        <Card
            tabIndex={0}
            as="li"
            isFooterBlurred
            radius="sm"
            className="relative mx-1.5 min-w-0 max-w-full flex-none !transition-none focus-visible:ring-2 focus-visible:ring-primary"
            disableAnimation
            shadow="none"
        >
            {children}

            {title ? (
                <CardFooter className="prose absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] truncate rounded-md border-1 border-white/20 bg-black/30 py-1 shadow-small dark:prose-invert">
                    <h4>{title}</h4>
                </CardFooter>
            ) : null}
        </Card>
    );
}
