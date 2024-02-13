import { tv } from "tailwind-variants";

export const section = tv({
    base: "gap-f6 flex flex-col items-center justify-center",
    variants: {
        row: {
            sm: "sm:flex-row",
            md: "md:flex-row",
            lg: "lg:flex-row",
        },
    },
});

export const grid = tv({
    base: "gap-f4 md:gap-f5 grid grid-cols-2 sm:grid-cols-3",
});
