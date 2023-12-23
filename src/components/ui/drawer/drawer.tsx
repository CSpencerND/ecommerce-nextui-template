"use client";

import { Button } from "@nextui-org/button";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { XIcon } from "lucide-react";
import { Drawer as DrawerPrimitive } from "vaul";

import { useHydrated } from "@/hooks/use-hydrated";
import { useIsMobile } from "@nextui-org/use-is-mobile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDrawer } from "./drawer-store";

import { prose } from "@/styles";
import { cn } from "@nextui-org/system";

const DrawerTitle = DrawerPrimitive.Title;
const DrawerDescription = DrawerPrimitive.Description;

type DrawerProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Root> & {
    disableThumb?: boolean;
    className?: string;
};

function Drawer({ disableThumb, children, className, ...props }: DrawerProps) {
    const isOpen = useDrawer((s) => s.isOpen);
    const onClose = useDrawer((s) => s.onClose);

    const router = useRouter();

    useEffect(() => {
        window.addEventListener("popstate", onClose);

        return () => {
            window.removeEventListener("popstate", onClose);
        };
    }, [onClose]);

    const isMobile = useIsMobile();
    const hydrated = useHydrated();
    if (!hydrated || !isMobile) return null;

    return (
        <DrawerPrimitive.Root
            open={isOpen}
            onOpenChange={(open) => {
                if (open === false) {
                    onClose();
                    router.back();
                }
            }}
            shouldScaleBackground
            {...props}
        >
            <DrawerPrimitive.Portal>
                <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-overlay/50" />
                <DrawerPrimitive.Content
                    className={cn(
                        "fixed inset-x-0 bottom-0 z-50 mx-0.5",
                        "flex max-h-[calc(100dvh-3rem)] flex-col overflow-clip",
                        "rounded-t-xlarge bg-content1 shadow-small",
                        className,
                    )}
                >
                    {!disableThumb && <DrawerThumb />}
                    {children}
                </DrawerPrimitive.Content>
            </DrawerPrimitive.Portal>
        </DrawerPrimitive.Root>
    );
}

function DrawerThumb({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div className="flex justify-center py-2">
            <div
                aria-hidden="true"
                className={cn(
                    "h-1 w-12 rounded-full bg-foreground-500 mix-blend-difference",
                    className,
                )}
                {...props}
            />
        </div>
    );
}

function DrawerCloseButton(props: React.ComponentPropsWithoutRef<typeof Button>) {
    return (
        <DrawerPrimitive.Close asChild>
            <Button
                isIconOnly
                variant="light"
                size="sm"
                {...props}
            >
                <XIcon
                    size={22}
                    className="stroke-foreground-500"
                />
            </Button>
        </DrawerPrimitive.Close>
    );
}

type DrawerHeaderProps = React.ComponentPropsWithoutRef<"header"> & {
    title?: string;
    showCloseButton?: boolean;
};

function DrawerHeader({ title, showCloseButton, className, ...props }: DrawerHeaderProps) {
    return (
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
                {title && <DrawerTitle>{title}</DrawerTitle>}
                {showCloseButton && <DrawerCloseButton />}
                {props.children}
            </div>
        </header>
    );
}

function DrawerBody({ className, ...props }: React.ComponentPropsWithoutRef<"figure">) {
    return (
        <ScrollShadow>
            <figure
                className={cn("flex flex-col gap-3 overflow-y-scroll px-6 pt-1", className)}
                {...props}
            />
        </ScrollShadow>
    );
}

function DrawerFooter({ className, ...props }: React.ComponentPropsWithoutRef<"footer">) {
    return (
        <footer
            className={cn("flex w-full flex-col px-6 pb-6 shadow-small", className)}
            {...props}
        />
    );
}

export {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
};
