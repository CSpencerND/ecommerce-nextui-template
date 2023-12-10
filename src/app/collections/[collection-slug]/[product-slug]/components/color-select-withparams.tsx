"use client";

import { Button } from "@nextui-org/button";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import Link from "next/link";

import { useQueryParams } from "@/hooks/use-query-params";
import { useMountEffect } from "@react-hookz/web/esm/useMountEffect";
import { useProductImageGroup } from "./product-image-group-context";

import selection from "@/styles/selection";

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
        <ToggleGroup.Root
            asChild
            aria-label="Select A Color"
            type="single"
        >
            <menu className={selection.group()}>
                {colors.map(({ name, code }, i) => {
                    const queryString = "?" + createQueryString("color", name);
                    const isActive = searchParams.color === name;

                    return (
                        <ToggleGroup.Item
                            key={name}
                            value={name}
                            asChild
                        >
                            <Button
                                key={name}
                                as={Link}
                                href={queryString}
                                replace
                                scroll={false}
                                size="sm"
                                isIconOnly
                                onPress={() => setActiveIndex(i)}
                                className={selection.item({ active: isActive, bordered: true })}
                                style={{ backgroundColor: code }}
                            >
                                <VisuallyHidden>{name}</VisuallyHidden>
                            </Button>
                        </ToggleGroup.Item>
                    );
                })}
            </menu>
        </ToggleGroup.Root>
    );
}
