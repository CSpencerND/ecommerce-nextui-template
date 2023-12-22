"use client";

import { Button } from "@nextui-org/button";
import { XIcon } from "lucide-react";
import { Drawer as DrawerPrimitive } from "vaul";

import { useHydrated } from "@/hooks/use-hydrated";
import { useIsMobile } from "@nextui-org/use-is-mobile";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDrawer } from ".";

import { prose } from "@/styles";
import { cn } from "@nextui-org/system";
import { drawer } from "./style";

const DrawerRoot = DrawerPrimitive.Root;
const DrawerBackdrop = DrawerPrimitive.Overlay;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerContent = DrawerPrimitive.Content;
const DrawerTitle = DrawerPrimitive.Title;
const DrawerClose = DrawerPrimitive.Close;

type DrawerProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Root> & {
    title?: string;
    className?: string;
};

function Drawer({ children, title, className, ...props }: DrawerProps) {
    const [snap, setSnap] = useState<number | string | null>(1);

    const router = useRouter();
    const pathname = usePathname();

    const isOpen = useDrawer((s) => s.isOpen);
    const onClose = useDrawer((s) => s.onClose);

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
        <DrawerRoot
            open={isOpen}
            onOpenChange={(open) => {
                if (open === false) {
                    onClose();
                    router.replace(pathname);
                }
            }}
            shouldScaleBackground
            snapPoints={[0.725, 1]}
            activeSnapPoint={snap}
            setActiveSnapPoint={setSnap}
            // closeThreshold={0.275}
            {...props}
        >
            <DrawerPortal>
                <DrawerBackdrop className={drawer.backdrop({ variant: "blur" })} />
                <DrawerContent
                    className={cn(
                        "fixed inset-x-0 bottom-0 z-50 mx-0.5",
                        "flex max-h-[calc(100svh-4rem)] max-w-none flex-col overflow-clip",
                        "rounded-t-xlarge bg-content1/80 shadow-small",
                        className,
                    )}
                >
                    <DrawerHeader title={title} />
                    <div
                        className={cn(
                            "max-h-[calc(100svh-4rem-3.5rem)] px-6 pb-6 pt-16",
                            snap === 1 ? "overflow-y-scroll" : "overflow-clip",
                        )}
                    >
                        {children}
                    </div>
                </DrawerContent>
            </DrawerPortal>
        </DrawerRoot>
    );
}

type DrawerHeaderProps = {
    title?: string;
};

function DrawerHeader({ title }: DrawerHeaderProps) {
    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full px-6 pb-1",
                "backdrop-blur-md backdrop-saturate-150",
                "bg-inherit",
                // "bg-content1/0",
                // "bg-content1/80 border-b border-b-divider"
            )}
        >
            <div className="flex flex-col items-center justify-center">
                <div
                    data-drawer-thumb=""
                    className="py-2"
                >
                    <div
                        aria-hidden="true"
                        className="h-1 w-12 rounded-full bg-foreground-500 mix-blend-difference"
                    />
                </div>
                {title && (
                    <div className="flex w-full justify-between">
                        <div className={prose({ sm: true })}>
                            <DrawerTitle>{title}</DrawerTitle>
                        </div>
                        <DrawerClose asChild>
                            <Button
                                isIconOnly
                                variant="light"
                                size="sm"
                            >
                                <XIcon
                                    size={22}
                                    className="stroke-foreground-500"
                                />
                            </Button>
                        </DrawerClose>
                    </div>
                )}
            </div>
        </header>
    );
}

export { Drawer, DrawerTitle };
