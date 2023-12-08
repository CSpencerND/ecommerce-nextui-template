"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import * as React from "react";

import { tv, type VariantProps } from "@nextui-org/theme";

const toggleVariants = tv({
    base: [
        "inline-flex aspect-square items-center justify-center",
        "transform-gpu text-small font-medium transition",
        "ring-2 ring-primary/0 ring-offset-1 ring-offset-default",
        "data-[state=on]:ring-primary/100",
        "focus-visible:outline-none focus-visible:ring-primary/100",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-primary-500",
        "hover:opacity-80",
        "disabled:pointer-events-none disabled:opacity-50",
    ],
    variants: {
        variant: {
            default: "bg-default",
            outline: [
                "data-[state=off]:ring-default bg-transparent",
            ],
        },
        size: {
            sm: "h-7",
            default: "h-8",
            lg: "h-9",
        },
        isSquared: {
            false: "rounded-full",
            true: "rounded-icon",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
        isSquared: false,
    },
});

type ToggleProps = React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>;

const Toggle = React.forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
    ({ className, variant, size, ...props }, ref) => (
        <TogglePrimitive.Root
            ref={ref}
            className={toggleVariants({ variant, size, className })}
            {...props}
        />
    ),
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants, type ToggleProps };
