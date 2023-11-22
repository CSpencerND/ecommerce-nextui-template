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
 
export const title = tv({
    base: "m-0 bg-gradient-to-br from-default-900 to-default-400 bg-clip-text text-transparent",
});
