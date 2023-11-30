import { tv } from "tailwind-variants";

export const section = tv({
    base: "flex flex-col items-center justify-center gap-8",
    variants: {
        row: {
            sm: "sm:flex-row",
            md: "md:flex-row",
            lg: "lg:flex-row",
        },
    },
});

export const grid = tv({
    base: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-6",
});
