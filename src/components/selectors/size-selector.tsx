"use client";

import { Button } from "@nextui-org/button";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import Link from "next/link";

import { useQueryParams } from "@/hooks/use-query-params";

import { selector } from ".";

import type { SearchParams } from "@/types";

type SizeSelectorProps = {
    sizes: string[];
    searchParams: SearchParams<"color" | "size">;
};

export function SizeSelector({ sizes, searchParams }: SizeSelectorProps) {
    const { createQueryString } = useQueryParams();

    return (
        <ToggleGroup.Root
            asChild
            aria-label="Select A Size"
            type="single"
        >
            <menu className={selector.group()}>
                {sizes.map((size) => {
                    const queryString = "?" + createQueryString("size", size);
                    const isActive = searchParams.size === size;

                    return (
                        <ToggleGroup.Item
                            key={size}
                            value={size}
                            asChild
                        >
                            <Button
                                as={Link}
                                href={queryString}
                                replace
                                scroll={false}
                                size="sm"
                                isIconOnly
                                className={selector.item({ active: isActive })}
                            >
                                {size}
                            </Button>
                        </ToggleGroup.Item>
                    );
                })}
            </menu>
        </ToggleGroup.Root>
    );
}
