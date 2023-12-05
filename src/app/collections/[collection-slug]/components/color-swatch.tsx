"use client";

import { RadioGroup, useRadio, type RadioGroupProps, type RadioProps } from "@nextui-org/radio";

import { VisuallyHidden, tv } from "@nextui-org/react";

import { useProductPreview } from "./product-preview-context";

export type ColorSwatchGroupProps = RadioGroupProps & {
    isSquared?: boolean;
};

export function ColorSwatchGroup({ isSquared, className, ...props }: ColorSwatchGroupProps) {
    const { getActiveIndexAsString, setActiveIndex } = useProductPreview();

    return (
        <RadioGroup
            as="menu"
            aria-label="Select A Color"
            orientation="horizontal"
            size="lg"
            defaultValue={getActiveIndexAsString()}
            onValueChange={(v) => setActiveIndex(Number(v))}
            classNames={{
                wrapper: swatchGroupWrapper({ isSquared: isSquared, class: className }),
            }}
            {...props}
        />
    );
}

type ColorSwatchProps = Omit<RadioProps, "color"> & {
    color: string;
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
                aria-hidden="true"
                style={{ backgroundColor: color }}
                {...getWrapperProps({
                    className: swatch({ isSquared: isSquared }),
                })}
            />
            <span
                aria-hidden="true"
                className={swatchIndicator({ isSquared: isSquared })}
            />
        </Component>
    );
}

const swatchGroupWrapper = tv({
    base: [
        "flex-nowrap justify-between overflow-y-hidden overflow-x-scroll",
        "bg-content2 p-2.5 scrollbar-hide",
    ],
    variants: {
        isSquared: {
            false: "rounded-full",
            true: "rounded-large",
        },
    },
    defaultVariants: {
        isSquared: false,
    },
});

const swatch = tv({
    /** focus ring is handled by `swatchIndicator` */
    base: ["aspect-square h-6 w-6 border-0 sm:h-7 sm:w-7"],
    /** only displays ring if selected */
    // base: [
    //     "aspect-square h-6 w-6 border-0 sm:h-7 sm:w-7",
    //     "ring-primary ring-offset-1 ring-offset-content2",
    //     "group-data-[selected=true]:ring-2",
    // ],
    /** displays default ring if not selected */
    // base: [
    //     "aspect-square h-6 w-6 border-0 sm:h-7 sm:w-7",
    //     "ring-default ring-2 ring-offset-1 ring-offset-content2",
    //     "group-data-[selected=true]:ring-primary",
    // ],
    variants: {
        isSquared: {
            false: "rounded-full",
            true: "rounded-icon",
        },
    },
    defaultVariants: {
        isSquared: false,
    },
});

const swatchIndicator = tv({
    base: [
        "absolute inset-[5px]",
        "border-medium border-primary border-opacity-0",
        "transform-gpu transition-colors-opacity",
        "group-data-[selected=true]:border-opacity-100",
        "aspect-square h-auto w-[calc(100%-10px)]",
        // "shadow-inner shadow-foreground/20",
    ],
    variants: {
        isSquared: {
            false: "rounded-full",
            true: "rounded-[calc(22.37%+2px)]",
        },
    },
    defaultVariants: {
        isSquared: false,
    },
});
