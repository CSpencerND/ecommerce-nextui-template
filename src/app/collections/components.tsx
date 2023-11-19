"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useHydrated } from "@/hooks/use-hydrated";

import { forwardRef } from "react";

const animationVariants: Variants = {
    initial: {
        opacity: 0,
        y: -24,
    },
    animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.05 * i,
        },
    }),
};

export type MotionListItemProps = React.ComponentProps<typeof motion.li> & {
    index: number;
};

export const MotionListItem = forwardRef(
    (props: MotionListItemProps, ref: React.Ref<HTMLLIElement>) => {
        const hydrated = useHydrated();
        if (!hydrated) return null;

        return (
            <AnimatePresence>
                <motion.li
                    ref={ref}
                    variants={animationVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    custom={props.index}
                    {...props}
                />
            </AnimatePresence>
        );
    },
);

MotionListItem.displayName = "MotionListItem";
