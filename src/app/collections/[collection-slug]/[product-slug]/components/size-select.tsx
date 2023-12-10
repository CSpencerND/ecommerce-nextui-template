"use client";

import { Button } from "@nextui-org/button";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import Link from "next/link";

import { useQueryParams } from "@/hooks/use-query-params";

import selection from "@/styles/selection";

import type { SearchParams } from "@/types";

type SizeSelectProps = {
    sizes: string[];
    searchParams: SearchParams<"color" | "size">;
};

export function SizeSelect({ sizes, searchParams }: SizeSelectProps) {
    const { createQueryString } = useQueryParams();

    return (
        <ToggleGroup.Root
            asChild
            aria-label="Select A Size"
            type="single"
        >
            <menu className={selection.group()}>
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
                                className={selection.item({ active: isActive })}
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
