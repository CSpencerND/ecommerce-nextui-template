"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { Button } from "@nextui-org/button";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import Link from "next/link";

import { useProductImage } from "@/components/product";
import { useQueryParams } from "@/hooks/use-query-params";
import { useMountEffect } from "@react-hookz/web";

import { selector } from "./selector-styles";

import type { Colors } from "@/types";

type ColorSelectorProps = {
    colors: Colors;
    className?: string;
} & React.HTMLAttributes<HTMLMenuElement>;

export function ColorSelector({ colors, ...props }: ColorSelectorProps) {
    const { setActiveIndex } = useProductImage();
    const { createQueryString, searchParams } = useQueryParams();

    const colorParams = searchParams.get("color");

    useMountEffect(() => {
        if (!searchParams || !colorParams) return;
        const i = colors.findIndex((color) => color.name === colorParams);
        setActiveIndex(i);
    });

    return (
        <ToggleGroup.Root
            asChild
            aria-label="Select A Color"
            type="single"
        >
            <menu
                className={selector.group()}
                {...props}
            >
                {colors.map(({ name, code }, i) => {
                    const queryString = createQueryString({
                        name: "color",
                        value: name,
                    });
                    const isActive = colorParams === name;

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

export function ColorSelectorPreview({ colors, className }: ColorSelectorProps) {
    const { activeIndex, setActiveIndex } = useProductImage();

    return (
        <ToggleGroup.Root
            asChild
            aria-label="Select A Color"
            type="single"
        >
            <menu
                className={selector.group({
                    noWrap: true,
                    class: [
                        "gap-3 rounded-large bg-content2 p-2 shadow-small",
                        className,
                    ],
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
                                onPress={() => setActiveIndex(i)}
                                className={selector.item({
                                    active: isActive,
                                    bordered: true,
                                    size: "xs",
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
