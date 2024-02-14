import { tv } from "tailwind-variants";

export const section = tv({
    base: "flex flex-col items-center justify-center gap-f6",
    variants: {
        row: {
            sm: "sm:flex-row",
            md: "md:flex-row",
            lg: "lg:flex-row",
        },
    },
});

export const grid = tv({
    base: "grid gap-f4 min-[375px]:grid-cols-2 sm:grid-cols-3 md:gap-f5",
});
