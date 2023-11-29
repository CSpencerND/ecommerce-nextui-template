"use client";

import { RadioGroup, RadioGroupProps, RadioProps, useRadio } from "@nextui-org/radio";
import { SmoothCorners } from "react-smooth-corners";

import { VisuallyHidden, tv } from "@nextui-org/react";

import { useProductPreview } from "@collections/components/product-preview-store";

export type ColorSwatchGroupProps = RadioGroupProps & {
    isSquared?: boolean;
};

export function ColorSwatchGroup({ isSquared, ...props }: ColorSwatchGroupProps) {
    const activeIndex = useProductPreview((s) => s.activeIndex);
    const setActiveIndex = useProductPreview((s) => s.setActiveIndex);

    return (
        <RadioGroup
            as="menu"
            aria-label="Select A Color"
            orientation="horizontal"
            size="lg"
            defaultValue={activeIndex}
            onValueChange={(v) => setActiveIndex(v)}
            classNames={{ wrapper: swatchGroupWrapper({ isSquared: isSquared }) }}
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
                className={swatchIndicator({ isSquared: isSquared })}
            >
                {isSquared ? (
                    <SmoothCorners
                        corners="5"
                        borderRadius="22.37%"
                        style={{ backgroundColor: color }}
                        {...getWrapperProps({
                            className: swatch({ isSquared: isSquared }),
                        })}
                    />
                ) : (
                    <span
                        style={{ backgroundColor: color }}
                        {...getWrapperProps({
                            className: swatch({ isSquared: isSquared }),
                        })}
                    />
                )}
            </span>
        </Component>
    );
}

const swatchGroupWrapper = tv({
    base: [
        "flex-nowrap justify-between overflow-y-hidden overflow-x-scroll",
        "gap-1.5 bg-content2 p-1.5 scrollbar-hide",
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
    base: "aspect-square h-6 w-6 border-0 sm:h-7 sm:w-7",
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
        "grid place-items-center",
        "aspect-square h-8 w-8 sm:h-9 sm:w-9",
        "shadow-inner shadow-foreground/20",
        "border-medium border-primary border-opacity-0",
        "transition-opacity group-data-[selected=true]:border-opacity-100",
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
