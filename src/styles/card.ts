import { tv } from "tailwind-variants";

const cardRoot = tv({
    base: "!transition-none",
    variants: {
        isCarouselItem: {
            true: "box-content flex-none",
        },
        radius: {
            lg: "rounded-2xl",
            xl: "rounded-xlarge",
        },
    },
    defaultVariants: {
        isCarouselItem: false,
        radius: "lg",
    },
});

const cardTitle = tv({
    base: [
        "absolute z-10 ml-1 rounded-[10px] border-1 border-white/10",
        "bg-white/10 py-1 shadow-small backdrop-contrast-75",
        "[&>h3]:truncate [&>h3]:text-medium [&>h3]:font-bold [&>h3]:text-white",
    ],
    variants: {
        hasPadding: {
            true: "bottom-4 w-[calc(100%-2rem)]",
            false: "bottom-1 w-[calc(100%-0.5rem)]",
        },
    },
    defaultVariants: {
        hasPadding: false,
    },
});

export const card = {
    root: cardRoot,
    title: cardTitle,
};
