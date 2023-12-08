"use client";

import {
    ToggleGroup,
    ToggleGroupItem,
    type ToggleGroupItemProps,
} from "@/components/ui/toggle-group";

import { useState } from "react";
import { useProductImageGroup } from "./product-image-group-context";

import type { Colors } from "@/types";

type ColorSelectProps = {
    colors: Colors;
    isSquared?: boolean;
    noWrap?: boolean;
    buttonSize?: ToggleGroupItemProps["size"];
    className?: string;
};

export function ColorSelect(props: ColorSelectProps) {
    const { colors, isSquared, noWrap, buttonSize = "default", className } = props;

    const { setActiveIndex } = useProductImageGroup();
    const [value, setValue] = useState(colors[0]?.name);

    return (
        <ToggleGroup
            type="single"
            size={buttonSize}
            value={value}
            onValueChange={(value) => {
                if (!value) return;
                setValue(value);
            }}
            isSquared={isSquared}
            noWrap={noWrap}
            className={className}
            {...props}
        >
            {colors.map(({ name, code }, i) => (
                <ToggleGroupItem
                    aria-label={name}
                    key={i}
                    value={name}
                    onClick={() => {
                        setActiveIndex(i);
                    }}
                    style={{ backgroundColor: code }}
                />
            ))}
        </ToggleGroup>
    );
}
