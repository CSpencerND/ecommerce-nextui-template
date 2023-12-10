import { tv } from "tailwind-variants";

export const selectionGroup = tv({
    base: "inline-flex flex-wrap gap-2",
});

export const selectionItem = tv({
    base: [
        "!rounded-icon !transition",
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

export const selection = {
    group: selectionGroup,
    item: selectionItem,
};

export default selection;
