"use client";
/**
 * TODO:
 * Possibly make the add to cart buttons fixed to the bottom of the screen in `DrawerFooter`.
 * Display the color and size above so they know what they're adding.
 * Disable or Hide the buttons until a variant is selected.
 */

import { Drawer, DrawerBody, DrawerTitle, useDrawer } from "@/components/ui/drawer";
import { useHydrated } from "@/hooks/use-hydrated";

type ProductDrawerProps = {};

export function ProductDrawer(props: ProductDrawerProps) {
    const data = useDrawer((s) => s.data);

    const hydrated = useHydrated();
    if (!hydrated || !data) return null;

    return (
        <Drawer>
            <DrawerBody>
                <DrawerTitle>{data.name}</DrawerTitle>
            </DrawerBody>
        </Drawer>
    );
}
