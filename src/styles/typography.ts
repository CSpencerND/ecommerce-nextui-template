import { tv } from "tailwind-variants";

export const prose = tv({
    base: "prose dark:prose-invert prose-headings:m-0",
});

export const title = tv({
    variants: {
        color: {
            violet: "from-[#FF1CF7] to-[#b249f8]",
            yellow: "from-[#FF705B] to-[#FFB457]",
            blue: "from-[#5EA2EF] to-[#0072F5]",
            cyan: "from-[#00b7fa] to-[#01cfea]",
            green: "from-[#6FEE8D] to-[#17c964]",
            pink: "from-[#FF72E1] to-[#F54C7A]",
            fg: "from-foreground to-foreground/60",
        },
    },
    defaultVariants: {
        color: "fg",
    },
    compoundVariants: [
        {
            color: ["violet", "yellow", "blue", "cyan", "green", "pink", "fg"],
            class: "bg-gradient-to-b bg-clip-text text-transparent",
        },
    ],
});
