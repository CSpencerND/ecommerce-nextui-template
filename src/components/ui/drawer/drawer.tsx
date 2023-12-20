"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { Button } from "@nextui-org/button";

import { drawer, type DrawerBackdropVariantProps } from "./style";
import { cn } from "@nextui-org/system";

const DrawerRoot = DrawerPrimitive.Root;
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerContent = DrawerPrimitive.Content;
const DrawerTitle = DrawerPrimitive.Title;
// const DrawerDescription = DrawerPrimitive.Description;
// const DrawerClose = DrawerPrimitive.Close;

export function Drawer() {
    return (
        <DrawerRoot open>
            <DrawerTrigger asChild>
                <Button
                    disableRipple
                    disableAnimation
                >
                    Open Drawer
                </Button>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerBackdrop variant="blur" />
                <DrawerContent
                    className={cn(
                        "prose prose-sm prose-invert prose-headings:m-0",
                        "fixed inset-x-0 bottom-0 z-50",
                        "flex h-fit max-w-none flex-col overflow-clip",
                        "rounded-t-xlarge bg-content1 p-3 shadow-small",
                    )}
                >
                    <div className="absolute inset-x-0 top-0 flex h-6 w-full items-center justify-center rounded-t-xlarge bg-content1/0">
                        <div
                            aria-hidden="true"
                            className="h-1 w-12 rounded-full bg-foreground-500 mix-blend-difference"
                        />
                    </div>
                    <div className="mt-3 max-h-svh space-y-3 overflow-y-scroll">
                        <DrawerTitle>Drawer Title</DrawerTitle>
                        <div>Drawer Body</div>
                        <div>Drawer Footer</div>
                    </div>
                </DrawerContent>
            </DrawerPortal>
        </DrawerRoot>
    );
}

const DrawerBackdrop = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> & DrawerBackdropVariantProps
>(({ className, variant, ...props }, ref) => (
    <DrawerPrimitive.Overlay
        ref={ref}
        className={drawer.backdrop({ variant })}
        {...props}
    />
));
DrawerBackdrop.displayName = "DrawerBackdrop";
