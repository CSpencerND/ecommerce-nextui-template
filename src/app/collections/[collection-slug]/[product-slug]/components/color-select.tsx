"use client";

import { Tab, Tabs, type TabsProps } from "@nextui-org/tabs";

import { useState } from "react";
import { useProductImageGroup } from "./product-image-group-context";

import type { Colors } from "@/types";

type ColorSelectProps = {
    colors: Colors;
    noWrap?: boolean;
    classNames?: TabsProps["classNames"];
};

export function ColorSelect(props: ColorSelectProps) {
    const { colors, noWrap, classNames } = props;

    const { setActiveIndex } = useProductImageGroup();

    return (
        <Tabs
            as="menu"
            aria-label="Select A Color"
            items={colors}
            classNames={{
                base: classNames?.base,
                panel: classNames?.panel,
                tabList: ["bg-transparent", noWrap ? "" : "!flex-wrap", classNames?.tabList],
                cursor: [
                    "!bg-transparent !rounded-icon ring-1 ring-primary ring-offset-2 ring-offset-content2",
                    classNames?.tabList,
                ],
                tab: [
                    "ring-1 ring-default size-8 aspect-square !rounded-icon",
                    classNames?.tab,
                ],
            }}
            onSelectionChange={(key) => setActiveIndex(Number(key))}
        >
            {colors.map((color, i) => (
                <Tab
                    key={i}
                    className=""
                    style={{ backgroundColor: color.code }}
                />
            ))}
        </Tabs>
    );
}
