"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

type SizeSelectProps = {
    sizes: string[];
    isSquared?: boolean;
};

export function SizeSelect({ sizes, isSquared, ...props }: SizeSelectProps) {
    const [value, setValue] = useState(sizes[0]);

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
            className="max-sm:flex-wrap"
            {...props}
        >
            {sizes.map((size) => (
                <ToggleGroupItem
                    key={size}
                    value={size}
                    className="ring-offset-content1"
                >
                    {size}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}
