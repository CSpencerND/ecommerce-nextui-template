import { createContext, useContext } from "react";

import useEmblaCarousel, {
    type EmblaCarouselType as CarouselApi,
    type EmblaOptionsType as CarouselOptions,
    type EmblaPluginType as CarouselPlugin,
} from "embla-carousel-react";

import type { CarouselStyles } from "./carousel-styles";

export type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin[];
    orientation?: "horizontal" | "vertical";
    setApi?: (api: CarouselApi) => void;
};

export type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: ReturnType<typeof useEmblaCarousel>[1];
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
    scrollSnaps: number[];
    scrollTo: (i: number) => void;
    selectedScrollSnap: number;
    setSelectedScrollSnap: (i: number) => void;
} & CarouselProps &
    Omit<CarouselStyles, "base">;

const CarouselContext = createContext<CarouselContextProps | null>(null);

export function useCarousel() {
    const context = useContext(CarouselContext);

    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />");
    }

    return context;
}

export function CarouselProvider({
    children,
    value,
}: {
    children: React.ReactNode;
    value: CarouselContextProps;
}) {
    return (
        <CarouselContext.Provider value={value}>
            {children}
        </CarouselContext.Provider>
    );
}
