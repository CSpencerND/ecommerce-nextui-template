"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as React from "react";

import { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@nextui-org/react";
import { type VariantProps } from "@nextui-org/theme";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
    size: "default",
    variant: "default",
    isSquared: false,
});

type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants> & {
        noWrap?: boolean;
    };

const ToggleGroup = React.forwardRef<
    React.ElementRef<typeof ToggleGroupPrimitive.Root>,
    ToggleGroupProps
>(({ className, variant, size, isSquared, noWrap, children, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn(
            "flex items-center gap-2",
            noWrap ? "!flex-nowrap overflow-x-scroll p-2" : "",
            isSquared ? "rounded-large" : "rounded-full",
            className,
        )}
        {...props}
    >
        <ToggleGroupContext.Provider value={{ variant, size, isSquared }}>
            {children}
        </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

type ToggleGroupItemProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>;

const ToggleGroupItem = React.forwardRef<
    React.ElementRef<typeof ToggleGroupPrimitive.Item>,
    ToggleGroupItemProps
>(({ className, children, variant, size, isSquared, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext);

    return (
        <ToggleGroupPrimitive.Item
            ref={ref}
            className={toggleVariants({
                variant: context.variant ?? variant,
                size: context.size ?? size,
                isSquared: context.isSquared ?? isSquared,
                className,
            })}
            {...props}
        >
            {children}
        </ToggleGroupPrimitive.Item>
    );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupItemProps, ToggleGroupProps };
