"use client";

import { Button } from "@nextui-org/button";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import Link from "next/link";

import { useQueryParams } from "@/hooks/use-query-params";
import { useMountEffect } from "@react-hookz/web/esm/useMountEffect";
import { useProductImageGroup } from "@/components/product-image";

import { selector } from ".";

import type { Colors, SearchParams } from "@/types";

type ColorSelectorProps = {
    colors: Colors;
    searchParams?: SearchParams<"color" | "size">;
};

export function ColorSelector({ colors, searchParams }: ColorSelectorProps) {
    const { activeIndex, setActiveIndex } = useProductImageGroup();
    const { createQueryString } = useQueryParams();

    useMountEffect(() => {
        if (!searchParams || !searchParams.color) return;
        const i = colors.findIndex((color) => color.name === searchParams.color);
        setActiveIndex(i);
    });

    if (searchParams) {
        return (
            <ToggleGroup.Root
                asChild
                aria-label="Select A Color"
                type="single"
            >
                <menu className={selector.group()}>
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
                                    className={selector.item({
                                        active: isActive,
                                        bordered: true,
                                    })}
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

    return (
        <ToggleGroup.Root
            asChild
            aria-label="Select A Color"
            type="single"
        >
            <menu
                className={selector.group({
                    noWrap: true,
                    class: "gap-3 rounded-large bg-content2 p-2 shadow-small @[146px]/footer:justify-between",
                })}
            >
                {colors.map(({ name, code }, i) => {
                    const isActive = i === activeIndex;

                    return (
                        <ToggleGroup.Item
                            key={name}
                            value={name}
                            asChild
                        >
                            <Button
                                key={name}
                                isIconOnly
                                size="sm"
                                onPress={() => setActiveIndex(i)}
                                className={selector.item({
                                    active: isActive,
                                    bordered: true,
                                    class: "size-6 sm:size-7",
                                })}
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
