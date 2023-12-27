"use client";

import { Button } from "@nextui-org/button";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import Link from "next/link";

import { useQueryParams } from "@/hooks/use-query-params";

import { selector } from "./selector-styles";

type SizeSelectorProps = {
    sizes: string[];
} & React.HTMLAttributes<HTMLMenuElement>;

export function SizeSelector({ sizes, ...props }: SizeSelectorProps) {
    const { createQueryString, searchParams } = useQueryParams();
    const sizeParams = searchParams.get("size");

    return (
        <ToggleGroup.Root
            asChild
            aria-label="Select A Size"
            type="single"
        >
            <menu
                className={selector.group()}
                {...props}
            >
                {sizes.map((size) => {
                    const queryString = createQueryString({
                        name: "size",
                        value: size,
                    });
                    const isActive = sizeParams === size;

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
