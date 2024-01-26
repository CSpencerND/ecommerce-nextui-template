"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

import useEmblaCarousel, {
    type UseEmblaCarouselType,
} from "embla-carousel-react";

import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin[];
    setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: ReturnType<typeof useEmblaCarousel>[1];
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
    handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    scrollTo: (i: number) => void;
    selectedScrollSnap: number;
    setSelectedScrollSnap: (i: number) => void;
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

function CarouselProvider(props: CarouselProps) {
    const { children, opts, plugins = [], setApi } = props;

    const [carouselRef, api] = useEmblaCarousel({ ...opts }, [
        WheelGesturesPlugin(),
        ...plugins,
    ]);

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const [selectedScrollSnap, setSelectedScrollSnap] = useState(0);

    const onSelect = useCallback((api: CarouselApi) => {
        if (!api) return;

        setSelectedScrollSnap(api.selectedScrollSnap());
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = useCallback(() => {
        api?.scrollPrev();
    }, [api]);

    const scrollNext = useCallback(() => {
        api?.scrollNext();
    }, [api]);

    const scrollTo = useCallback(
        (i: number) => {
            api?.scrollTo(i);
        },
        [api],
    );

    const handleKeyDown = useCallback(
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

    useEffect(() => {
        if (!api || !setApi) return;

        setApi(api);
    }, [api, setApi]);

    useEffect(() => {
        if (!api) return;

        onSelect(api);
        api.on("reInit", onSelect);
        api.on("select", onSelect);

        return () => {
            api?.off("select", onSelect);
        };
    }, [api, onSelect]);

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                api,
                opts,
                scrollNext,
                scrollPrev,
                canScrollNext,
                canScrollPrev,
                handleKeyDown,
                selectedScrollSnap,
                setSelectedScrollSnap,
                scrollTo,
            }}
        >
            {children}
        </CarouselContext.Provider>
    );
}

function useCarousel() {
    const context = useContext(CarouselContext);

    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />");
    }

    return context;
}

export {
    // CarouselContext,
    CarouselProvider,
    useCarousel,
};
export type {
    // CarouselApi,
    CarouselProps,
};
