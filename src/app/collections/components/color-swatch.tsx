"use client";

import { RadioGroup, RadioGroupProps, RadioProps, useRadio } from "@nextui-org/radio";
import { VisuallyHidden, cn } from "@nextui-org/react";
import { focusVisibleClasses } from "@nextui-org/theme";
import { SmoothCorners } from "react-smooth-corners";

export function ColorSwatchGroup(props: RadioGroupProps) {
    return (
        <RadioGroup
            as="menu"
            aria-label="Select A Color"
            orientation="horizontal"
            size="lg"
            classNames={{
                wrapper: [
                    "flex-nowrap justify-between overflow-x-scroll overflow-y-hidden",
                    "rounded-large bg-content2 scrollbar-hide",
                    "p-1.5 gap-1.5",
                    ...focusVisibleClasses.concat("focus-visible:outline-none"),
                ],
            }}
            {...props}
        />
    );
}

type ColorSwatchProps = Omit<RadioProps, "color"> & {
    color: string;
    /** @description false squircle */
    isSquare?: boolean;
};

export function ColorSwatch({ color, isSquare, ...props }: ColorSwatchProps) {
    const { Component, getBaseProps, getWrapperProps, getInputProps } = useRadio(props);

    return (
        <Component {...getBaseProps()}>
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <span
                className={cn(
                    "group-data-[selected=true]:border-medium border-primary rounded-[11px]",
                    "aspect-square h-8 w-8 sm:h-9 sm:w-9",
                    "grid place-items-center",
                )}
            >
                <SmoothCorners
                    corners="5"
                    borderRadius="7px"
                    style={{ backgroundColor: color }}
                    {...getWrapperProps({
                        className: ["border-0", "aspect-square h-6 w-6 sm:h-7 sm:w-7", isSquare && "rounded-icon"],
                    })}
                />
            </span>
            {/* <span */}
            {/*     {...getWrapperProps({ */}
            {/*         className: [ */}
            {/*             "aspect-square h-7 w-7 sm:h-8 sm:w-8", */}
            {/*             "group-data-[selected=true]:border-large", */}
            {/*             isSquare && "rounded-icon", */}
            {/*         ], */}
            {/*         style: { backgroundColor: color }, */}
            {/*     })} */}
            {/* /> */}
        </Component>
    );
}
