"use client";

import { Button } from "@nextui-org/button";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import Link from "next/link";

import { useQueryParams } from "@/hooks/use-query-params";
import { cn } from "@nextui-org/system";

import type { SearchParams } from "@/types";

type SizeSelectProps = {
    sizes: string[];
    searchParams: SearchParams<"color" | "size">;
    className?: string;
};

export function SizeSelect({ sizes, searchParams }: SizeSelectProps) {
    const { createQueryString } = useQueryParams();

    return (
        <ToggleGroup.Root
            aria-label="Select A Size"
            type="single"
            className="inline-flex flex-wrap gap-2"
        >
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
                            className={cn(
                                "!rounded-icon",
                                "ring-2 ring-primary/0 !transition",
                                "ring-offset-1 ring-offset-content2",
                                isActive && "ring-primary/100",
                            )}
                        >
                            {size}
                        </Button>
                    </ToggleGroup.Item>
                );
            })}
        </ToggleGroup.Root>
    );
}
