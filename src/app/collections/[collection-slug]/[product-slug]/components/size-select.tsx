"use client";

import {
    ToggleGroup,
    ToggleGroupItem,
    type ToggleGroupItemProps,
} from "@/components/ui/toggle-group";

import { useState } from "react";

import { cn } from "@nextui-org/system";

type SizeSelectProps = {
    sizes: string[];
    isSquared?: boolean;
    buttonSize?: ToggleGroupItemProps["size"];
    className?: string;
};

export function SizeSelect(props: SizeSelectProps) {
    const { sizes, isSquared, buttonSize = "default", className } = props;

    const [value, setValue] = useState(sizes[0]);

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
            className={cn("max-sm:flex-wrap", className)}
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
