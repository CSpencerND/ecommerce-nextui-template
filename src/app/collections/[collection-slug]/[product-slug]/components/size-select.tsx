"use client";

import { Tab, Tabs } from "@nextui-org/tabs";
import Link from "next/link";

type SizeSelectProps = {
    sizes: string[];
    sizeParams: string;
    className?: string;
};

export function SizeSelect({ sizes, sizeParams }: SizeSelectProps) {
    let currentSelection: string | undefined;

    if (!sizeParams) {
        currentSelection = sizes[0];
    } else {
        currentSelection = sizeParams;
    }

    const newSearchParams = new URLSearchParams({ size: sizeParams ?? sizes[0] ?? "" });

    return (
        <Tabs
            as="menu"
            aria-label="Select A Size"
            items={sizes}
            selectedKey={`?${newSearchParams}`}
            defaultSelectedKey={`?${newSearchParams}`}
            classNames={{
                tabList: "!flex-wrap bg-transparent",
                cursor: "!bg-transparent !rounded-icon ring-1 ring-primary ring-offset-2 ring-offset-content2",
                tab: "bg-default font-medium !rounded-icon size-8 aspect-square",
            }}
        >
            {sizes.map((size) => {
                const sizeParams = new URLSearchParams({ size: size });

                return (
                    <Tab
                        as={Link}
                        key={`?${sizeParams}`}
                        title={size}
                        href={`?${sizeParams}`}
                    />
                );
            })}
        </Tabs>
    );

    /** Incredibly simplified version */
    // return (
    //     <menu className="inline-flex gap-1.5 flex-wrap">
    //         {sizes.map((size) => (
    //             <Button key={size} size="sm" isIconOnly as={Link} href="/">{size}</Button>
    //         ))}
    //     </menu>
    // )
}
