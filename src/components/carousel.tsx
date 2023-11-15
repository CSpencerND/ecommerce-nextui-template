"use client";

import { Button } from "@nextui-org/button";
import { Card, CardFooter } from "@nextui-org/card";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useHydrated } from "@/hooks/use-hydrated";
import { useCallback, useEffect, useState } from "react";

import useEmblaCarousel, { type EmblaCarouselType } from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { cn } from "@nextui-org/react";

export type CarouselProps = {
    title: string;
    items: {
        image: string;
        name: string;
        alt?: string;
    }[];
};

export function Carousel({ title, items }: CarouselProps) {
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
            <div className="prose dark:prose-invert">
                <h1>{title}</h1>
            </div>

            <Card
                tabIndex={0}
                onKeyDown={onKeyboardScroll}
                className="max-w-prose p-3 hover:cursor-grab focus-visible:ring-2 focus-visible:ring-primary active:cursor-grabbing"
                ref={emblaRef}
                disableAnimation
            >
                <ul className="flex">
                    {items.map(({ image, name, alt }, i) => (
                        <Card
                            key={i}
                            data-slideindex={i}
                            tabIndex={0}
                            as="li"
                            isFooterBlurred
                            radius="sm"
                            className="relative mx-1.5 min-w-0 max-w-full flex-none !transition-none focus-visible:ring-2 focus-visible:ring-primary"
                            disableAnimation
                            shadow="none"
                        >
                            <Image
                                as={NextImage}
                                src={image}
                                alt={alt ?? name}
                                width={192}
                                height={192}
                                className="object-cover object-center"
                                radius="sm"
                            />
                            <CardFooter className="prose absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] truncate rounded-md border-1 border-white/20 bg-black/30 py-1 shadow-small dark:prose-invert">
                                <h4>{name}</h4>
                            </CardFooter>
                        </Card>
                    ))}
                </ul>
            </Card>
            <div className="relative flex w-full max-w-prose flex-row items-center justify-center lg:justify-evenly">
                <Card
                    aria-hidden="true"
                    className="flex h-fit w-fit flex-row items-center gap-2 rounded-xl bg-content1 p-1.5"
                    disableAnimation
                >
                    {items.map((_, i) => (
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
                <div className="flex gap-3 max-lg:hidden">
                    <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => emblaApi?.scrollPrev()}
                    >
                        <ChevronLeft size={20} />
                    </Button>
                    <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => emblaApi?.scrollNext()}
                    >
                        <ChevronRight size={20} />
                    </Button>
                </div>
            </div>
        </>
    );
}
