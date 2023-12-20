import { tv, type VariantProps } from "tailwind-variants";

const drawerBackdrop = tv({
    base: "fixed inset-0 z-50 bg-overlay/60",
    variants: {
        variant: {
            transparent: "hidden",
            blur: "bg-overlay/30 backdrop-blur-md backdrop-saturate-150",
        },
    },
});

export const drawer = {
    backdrop: drawerBackdrop,
};

export type DrawerBackdropVariantProps = VariantProps<typeof drawerBackdrop>;
