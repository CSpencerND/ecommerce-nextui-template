"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useQueryString } from "@/hooks/use-query-string";
import { useState } from "react";
import { useProductImageGroup } from "./product-image-group-context";

import type { Colors } from "@/types";

type ColorSelectProps = {
    colors: Colors;
    isSquared?: boolean;
    noWrap?: boolean;
    className?: string;
};

export function ColorSelect({ colors, isSquared, noWrap, className }: ColorSelectProps) {
    const { setActiveIndex } = useProductImageGroup();
    const [value, setValue] = useState(colors[0]?.name);

    const { updatePathname } = useQueryString("color", value);

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
            noWrap={noWrap}
            className={className}
        >
            {colors.map(({name, code}, i) => (
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
