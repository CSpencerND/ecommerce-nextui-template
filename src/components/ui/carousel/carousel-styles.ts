import { tv, type VariantProps } from "tailwind-variants";

const carousel = tv({
    slots: {
        base: "group relative rounded-xlarge bg-content1 shadow-medium",
        wrapper: [
            "overflow-clip rounded-xlarge px-3 py-6",
            "focus-visible-within:ring-2",
        ],
        content: "flex rounded-large",
        item: "min-w-0 shrink-0 grow-0 basis-auto",
    },
    variants: {
        orientation: {
            horizontal: {
                content: "-ml-4",
                item: "pl-4",
            },
            vertical: {
                content: "-mt-4 flex-col",
                item: "pt-4",
            },
        },
    },
    defaultVariants: {
        orientation: "horizontal",
    },
});
// type CarouselVariants = VariantProps<typeof carousel>;

const controls = tv({
    slots: {
        prev: "",
        next: "",
    },
    variants: {
        isFloating: {
            true: {
                prev: "absolute",
                next: "absolute",
            },
            false: {
                prev: "bg-content2 hover:bg-content3",
                next: "bg-content2 hover:bg-content3",
            },
        },
        orientation: {
            horizontal: "",
            vertical: "",
        },
    },
    defaultVariants: {
        isFloating: false,
    },
    compoundVariants: [
        {
            isFloating: true,
            orientation: "horizontal",
            class: {
                prev: "-left-12 top-1/2 -translate-y-1/2",
                next: "-right-12 top-1/2 -translate-y-1/2",
            },
        },
        {
            isFloating: true,
            orientation: "vertical",
            class: {
                prev: "-top-12 left-1/2 -translate-x-1/2 rotate-90",
                next: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
            },
        },
    ],
});
// type ControlsVariants = VariantProps<typeof controls>;

const dots = tv({
    slots: {
        base: "overflow-clip rounded-full shadow-sm",
        button: "relative z-[unset] overflow-auto bg-content2 hover:bg-content3",
        icon: "stroke-content1 p-1",
        indicator: "absolute z-10 fill-foreground stroke-foreground p-1",
    },
    variants: {
        isSelected: {
            true: {
                icon: "fill-foreground",
            },
            false: {
                icon: "fill-content1",
            },
        },
    },
    defaultVariants: {
        isSelected: false,
    },
});
// type DotsVariants = VariantProps<typeof dots>;

export type CarouselStyles = ReturnType<typeof carousel>;
export { carousel, controls, dots };
