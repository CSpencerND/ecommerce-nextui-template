"use client";

import { Drawer as DrawerPrimitive } from "vaul";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDrawer } from ".";

import { cn } from "@nextui-org/system";
import { drawer } from "./style";

const DrawerRoot = DrawerPrimitive.Root;
const DrawerBackdrop = DrawerPrimitive.Overlay;
// const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerContent = DrawerPrimitive.Content;
const DrawerTitle = DrawerPrimitive.Title;
// const DrawerClose = DrawerPrimitive.Close;

function Drawer({ children }: React.PropsWithChildren) {
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

    return (
        <DrawerRoot
            open={isOpen}
            onOpenChange={(open) => {
                if (open === false) {
                    onClose();
                    router.replace(pathname);
                }
            }}
        >
            <DrawerPortal>
                <DrawerBackdrop className={drawer.backdrop()} />
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
                    {children}
                </DrawerContent>
            </DrawerPortal>
        </DrawerRoot>
    );
}

function DrawerBody(props: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div
            className="mt-3 max-h-svh space-y-3 overflow-y-scroll"
            {...props}
        />
    );
}

export { Drawer, DrawerBody, DrawerTitle };

// type DrawerBackdropProps = DrawerBackdropVariantProps &
//     React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>;
// type DrawerBackdropRef = React.ElementRef<typeof DrawerPrimitive.Overlay>;

// const DrawerBackdrop = forwardRef<DrawerBackdropRef, DrawerBackdropProps>(
//     ({ className, variant, ...props }, ref) => {
//         return (
//             <DrawerPrimitive.Overlay
//                 ref={ref}
//                 className={drawer.backdrop({ variant })}
//                 {...props}
//             />
//         );
//     },
// );
// DrawerBackdrop.displayName = "DrawerBackdrop";
