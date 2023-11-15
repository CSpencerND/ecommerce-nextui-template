"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Nuka, { type CarouselProps as NukaConfig } from "nuka-carousel";

export type CarouselProps = React.PropsWithChildren;

const nukaConfig: NukaConfig = {
    // autoplay: true,
    cellAlign: "center",
    cellSpacing: 12,
    enableKeyboardControls: true,
    // slidesToScroll: 1,
    // slidesToShow: 2.5,
    slideWidth: 192,
    // wrapAround: true,
    renderCenterRightControls: () => null,
    renderCenterLeftControls: () => null,
    renderBottomCenterControls: ({ nextSlide, previousSlide }) => (
        <div className="absolute -bottom-16 left-0 flex w-full flex-row justify-end gap-3">
            <ButtonGroup
                size="sm"
                variant="flat"
                isIconOnly
                className="divide-x divide-content2 rounded-xl border border-content2 max-lg:hidden"
            >
                <Button onPress={previousSlide}>
                    <ChevronLeft size={20} />
                </Button>
                <Button onPress={nextSlide}>
                    <ChevronRight size={20} />
                </Button>
            </ButtonGroup>
        </div>
    ),
};

export function Carousel({ children }: CarouselProps) {
    return (
        <Nuka
            {...nukaConfig}
            className="cursor-grab rounded-lg active:cursor-grabbing"
        >
            {children}
        </Nuka>
    );
}
