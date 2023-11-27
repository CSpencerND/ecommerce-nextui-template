"use client";

import { RadioGroup, RadioGroupProps, RadioProps, useRadio } from "@nextui-org/radio";
import { SmoothCorners } from "react-smooth-corners";

import { VisuallyHidden, cn } from "@nextui-org/react";
import { focusVisibleClasses, tv } from "@nextui-org/theme";

import { useProduct } from "./use-product";

const swatch = tv({
    base: [
        "flex-nowrap justify-between overflow-y-hidden overflow-x-scroll",
        "bg-content2 scrollbar-hide",
        "gap-1.5 p-1.5",
        ...focusVisibleClasses.concat("focus-visible:outline-none"),
    ],
    variants: {
        isSquared: {
            true: "rounded-large",
            false: "rounded-full",
        },
    },
    defaultVariants: {
        isSquared: false,
    },
});

export type ColorSwatchGroupProps = RadioGroupProps & {
    isSquared?: boolean;
};

export function ColorSwatchGroup({ isSquared, ...props }: ColorSwatchGroupProps) {
    const setIndex = useProduct((s) => s.setIndex);
    const selectedIndex = useProduct((s) => s.selectedIndex);

    // console.log(selectedIndex)

    return (
        <RadioGroup
            as="menu"
            aria-label="Select A Color"
            orientation="horizontal"
            size="lg"
            onValueChange={(v) => setIndex(v)}
            classNames={{ wrapper: swatch({ isSquared: isSquared }) }}
            {...props}
        />
    );
}

type ColorSwatchProps = Omit<RadioProps, "color"> & {
    color: string;
    /** @description false squircle */
    isSquared?: boolean;
};

export function ColorSwatch({ color, isSquared, ...props }: ColorSwatchProps) {
    const { Component, getBaseProps, getWrapperProps, getInputProps } = useRadio(props);

    return (
        <Component {...getBaseProps()}>
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <span
                className={cn(
                    "border-primary group-data-[selected=true]:border-medium",
                    "aspect-square h-8 w-8 sm:h-9 sm:w-9",
                    "grid place-items-center",
                    isSquared ? "rounded-[calc(15.625%+2px)]" : "rounded-full",
                )}
            >
                {isSquared ? (
                    <SmoothCorners
                        // NOTE: when css paint api is widely supported, change corners to 5
                        corners="7"
                        borderRadius="15.625%"
                        style={{ backgroundColor: color }}
                        {...getWrapperProps({
                            className: [
                                "border-0",
                                "aspect-square h-6 w-6 sm:h-7 sm:w-7 rounded-icon",
                            ],
                        })}
                    />
                ) : (
                    <span
                        style={{ backgroundColor: color }}
                        {...getWrapperProps({
                            className: ["border-0", "aspect-square h-6 w-6 sm:h-7 sm:w-7"],
                        })}
                    />
                )}
            </span>
        </Component>
    );
}
