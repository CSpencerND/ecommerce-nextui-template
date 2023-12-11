import { tv } from "tailwind-variants";

export const selectorGroup = tv({
    base: "inline-flex gap-2",
    variants: {
        noWrap: {
            true: "flex-nowrap overflow-x-scroll max-lg:scrollbar-hide [&>*]:min-w-0 [&>*]:flex-none",
            false: "flex-wrap",
        },
    },
    defaultVariants: {
        noWrap: false,
    },
});

export const selectorItem = tv({
    base: [
        "aspect-square !rounded-icon !transition",
        "ring-2 ring-primary/0",
        "ring-offset-1 ring-offset-content1",
    ],
    variants: {
        active: {
            true: "ring-primary/100",
        },
        bordered: {
            true: "ring-offset-default",
        },
    },
});

export const selector = {
    group: selectorGroup,
    item: selectorItem,
};

export default selector;