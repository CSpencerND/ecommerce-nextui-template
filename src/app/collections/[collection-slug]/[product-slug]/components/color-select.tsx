"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

type ColorSelectProps = {
    colors: string[];
    isSquared?: boolean;
};

export function ColorSelect({ colors, isSquared, ...props }: ColorSelectProps) {
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
            className="max-sm:flex-wrap"
            {...props}
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
