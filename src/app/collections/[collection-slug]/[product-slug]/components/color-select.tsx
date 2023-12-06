"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

type ColorSelectProps = {
    colors: string[];
    isSquared?: boolean;
    noWrap?: boolean;
    className?: string;
};

export function ColorSelect({ colors, isSquared, noWrap, className }: ColorSelectProps) {
    const [value, setValue] = useState(colors[0]);

    return (
        <ToggleGroup
            type="single"
            size="sm"
            value={value}
            onValueChange={(value) => {
                if (value) setValue(value);
            }}
            isSquared={isSquared}
            noWrap={noWrap}
            className={className}
        >
            {colors.map((color) => (
                <ToggleGroupItem
                    aria-label={color}
                    key={color}
                    value={color}
                    style={{ backgroundColor: color }}
                />
            ))}
        </ToggleGroup>
    );
}
