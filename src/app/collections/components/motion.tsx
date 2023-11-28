"use client";

import { motion, type Variants } from "framer-motion";
import { forwardRef } from "react";

import { useHydrated } from "@/hooks/use-hydrated";

const fadeInUp: Variants = {
    animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.075 * i,
        },
    }),
};

export type MotionListItemProps = React.ComponentProps<typeof motion.li> & {
    index: number;
};

/**
 * @deprecated It's been built-in to the ProductPreviewCard
 * @link ../components/product-preview-card.tsx
 */
export const MotionListItem = forwardRef(
    (props: MotionListItemProps, ref: React.Ref<HTMLLIElement>) => {
        const hydrated = useHydrated();
        if (!hydrated) return null;

        return (
            <motion.li
                ref={ref}
                variants={fadeInUp}
                initial={false}
                style={{ opacity: 0, y: -24 }}
                whileInView="animate"
                viewport={{ once: true }}
                custom={props.index}
                {...props}
            />
        );
    },
);

MotionListItem.displayName = "MotionListItem";
