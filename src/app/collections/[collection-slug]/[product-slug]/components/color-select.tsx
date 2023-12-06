"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { useProductImageGroup } from "./product-image-group-context";

type ColorSelectProps = {
    colors: string[];
    isSquared?: boolean;
    noWrap?: boolean;
    className?: string;
};

export function ColorSelect({ colors, isSquared, noWrap, className }: ColorSelectProps) {
    const { setActiveIndex } = useProductImageGroup();
    const [value, setValue] = useState(colors[0]);

    return (
        <ToggleGroup
            type="single"
            size="sm"
            value={value}
            onValueChange={(value) => {
                if (!value) return;
                setValue(value);
            }}
            isSquared={isSquared}
            noWrap={noWrap}
            className={className}
        >
            {colors.map((color, i) => (
                <ToggleGroupItem
                    aria-label={color}
                    key={color}
                    value={color}
                    onClick={() => {
                        setActiveIndex(i);
                    }}
                    style={{ backgroundColor: color }}
                />
            ))}
        </ToggleGroup>
    );
}
