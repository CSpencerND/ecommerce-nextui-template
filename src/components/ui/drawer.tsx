"use client";

import * as React from "react";

import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Drawer as DrawerPrimitive } from "vaul";

import { prose } from "@/styles";
import { cn } from "@nextui-org/system";

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerClose = DrawerPrimitive.Close;

const Drawer = ({
    className,
    shouldScaleBackground = true,
    children,
    ...props
}: {
    className?: string;
} & React.ComponentProps<typeof DrawerPrimitive.Root>) => (
    <DrawerPrimitive.Root
        shouldScaleBackground={shouldScaleBackground}
        {...props}
    >
        <DrawerPrimitive.Portal>
            <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-overlay/60" />
            <div className="fixed inset-x-0 bottom-0 z-50 mx-px mt-24 flex justify-center">
                <DrawerPrimitive.Content
                    className={cn(
                        "flex max-w-[25.5rem] flex-col overflow-clip",
                        "h-auto max-h-[calc(100dvh-3rem)]",
                        "rounded-t-xlarge bg-content1/80 shadow-small backdrop-blur-md backdrop-saturate-150",
                        className,
                    )}
                >
                    <div
                        data-drawer-thumb
                        aria-hidden="true"
                        className="flex justify-center py-2"
                    >
                        <div className="h-1 w-16 rounded-full bg-foreground-500 mix-blend-difference" />
                    </div>
                    {children}
                </DrawerPrimitive.Content>
            </div>
        </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
);
Drawer.displayName = "Drawer";

const DrawerHeader = ({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <header
        className={cn("min-h-6 px-6", className)}
        {...props}
    >
        <div
            className={prose({
                sm: true,
                class: "flex w-full justify-between pb-6",
            })}
        >
            {children}
        </div>
    </header>
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerBody = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <ScrollShadow size={80}>
        <figure
            className={cn(
                "flex flex-col gap-3 overflow-y-scroll px-6 pt-1",
                className,
            )}
            {...props}
        />
    </ScrollShadow>
);

const DrawerFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <footer
        className={cn(
            "flex w-full flex-col rounded-t-xlarge px-6 pb-6 shadow-small",
            className,
        )}
        {...props}
    />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Title
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className,
        )}
        {...props}
    />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Description
        ref={ref}
        className={cn("text-sm text-foreground-700", className)}
        {...props}
    />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
    Drawer,
    DrawerBody,
    DrawerClose,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
};
