"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useQueryString } from "@/hooks/use-query-string";
import { useState } from "react";

type SizeSelectProps = {
    sizes: string[];
    isSquared?: boolean;
};

export function SizeSelect({ sizes, isSquared, ...props }: SizeSelectProps) {
    const [value, setValue] = useState(sizes[0]);

    const { updatePathname } = useQueryString("size", value);

    return (
        <ToggleGroup
            type="single"
            size="sm"
            value={value}
            onValueChange={(value) => {
                if (!value) return;
                setValue(value);
                updatePathname();
            }}
            isSquared={isSquared}
            className="max-sm:flex-wrap"
            {...props}
        >
            {sizes.map((size) => (
                <ToggleGroupItem
                    key={size}
                    value={size}
                >
                    {size}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}
