"use client";

import { RadioGroup, RadioGroupProps, RadioProps, useRadio } from "@nextui-org/radio";
import { VisuallyHidden, cn } from "@nextui-org/react";
import { focusVisibleClasses } from "@nextui-org/theme";
import { SmoothCorners } from "react-smooth-corners";

import { useProduct } from "./use-product";

export function ColorSwatchGroup(props: RadioGroupProps) {
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
                    "border-primary group-data-[selected=true]:border-medium",
                    "aspect-square h-8 w-8 sm:h-9 sm:w-9",
                    "grid place-items-center",
                    isSquare ? "rounded-[calc(15.625%+2px)]" : "rounded-full",
                )}
            >
                {isSquare ? (
                    <SmoothCorners
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
