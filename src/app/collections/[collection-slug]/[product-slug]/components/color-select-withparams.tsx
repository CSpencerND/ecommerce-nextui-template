"use client";

import { Button } from "@nextui-org/button";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import Link from "next/link";

import { useQueryParams } from "@/hooks/use-query-params";
import { useMountEffect } from "@react-hookz/web/esm/useMountEffect";
import { useProductImageGroup } from "./product-image-group-context";

import { cn } from "@nextui-org/system";

import type { Colors, SearchParams } from "@/types";

type ColorSelectProps = {
    colors: Colors;
    searchParams: SearchParams<"color" | "size">;
};

export function ColorSelect({ colors, searchParams }: ColorSelectProps) {
    const { setActiveIndex } = useProductImageGroup();
    const { createQueryString } = useQueryParams();

    useMountEffect(() => {
        if (!searchParams.color) return;
        const i = colors.findIndex((color) => color.name === searchParams.color);
        setActiveIndex(i);
    });

    return (
        <menu
            aria-label="Select A Color"
            className="inline-flex flex-wrap gap-1.5"
        >
            {colors.map(({ name, code }, i) => {
                const queryString = "?" + createQueryString("color", name);
                const isActive = searchParams.color === name;

                return (
                    <Button
                        key={name}
                        as={Link}
                        href={queryString}
                        replace
                        scroll={false}
                        size="sm"
                        isIconOnly
                        onPress={() => setActiveIndex(i)}
                        className={cn(
                            "ring-2 ring-primary/0 !transition",
                            "ring-offset-1 ring-offset-default",
                            isActive && "ring-primary/100",
                        )}
                        style={{ backgroundColor: code }}
                    >
                        <VisuallyHidden>{name}</VisuallyHidden>
                    </Button>
                );
            })}
        </menu>
    );
}
