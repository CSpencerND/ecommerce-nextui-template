"use client";

import { RadioGroup, RadioGroupProps, RadioProps, useRadio } from "@nextui-org/radio";
import { VisuallyHidden } from "@nextui-org/react";
import { focusVisibleClasses } from "@nextui-org/theme";

export function ColorSwatchGroup(props: RadioGroupProps) {
    return (
        <RadioGroup
            as="menu"
            aria-label="Select A Color"
            orientation="horizontal"
            size="lg"
            classNames={{
                wrapper: [
                    "flex-nowrap justify-between overflow-x-hidden",
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
                {...getWrapperProps({
                    className: [
                        "aspect-square h-7 w-7 sm:h-8 sm:w-8",
                        "group-data-[selected=true]:border-large",
                        isSquare && "rounded-icon",
                    ],
                    style: { backgroundColor: color },
                })}
            />
        </Component>
    );
}
