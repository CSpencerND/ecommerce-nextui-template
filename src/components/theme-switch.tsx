"use client";

import { MoonFilledIcon, SunFilledIcon } from "@/components/icons";
import { useSwitch, type SwitchProps } from "@nextui-org/switch";
import { VisuallyHidden } from "@react-aria/visually-hidden";

import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { SunMoonIcon, PaletteIcon, CheckIcon } from "lucide-react";

import { useIsSSR } from "@react-aria/ssr";
import { useTheme } from "next-themes";

import { cn } from "@nextui-org/system";

export interface ThemeSwitchProps {
    type?: "toggle" | "menu";
    className?: string;
    classNames?: SwitchProps["classNames"];
}

export function ThemeSwitch(props: ThemeSwitchProps) {
    const { type = "toggle", className, classNames } = props;

    const { theme, setTheme } = useTheme();
    const isSSR = useIsSSR();

    const onChange = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };

    const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } =
        useSwitch({
            isSelected: theme === "light" || isSSR,
            "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`,
            onChange,
        });

    if (type === "toggle") {
        return (
            <Component
                {...getBaseProps({
                    className: cn(
                        "cursor-pointer px-px transition-opacity hover:opacity-80",
                        className,
                        classNames?.base,
                    ),
                })}
            >
                <VisuallyHidden>
                    <input {...getInputProps()} />
                </VisuallyHidden>
                <div
                    {...getWrapperProps()}
                    className={slots.wrapper({
                        class: cn(
                            [
                                "h-auto w-auto",
                                "bg-transparent",
                                "rounded-lg",
                                "flex items-center justify-center",
                                "group-data-[selected=true]:bg-transparent",
                                "!text-default-500",
                                "pt-px",
                                "px-0",
                                "mx-0",
                            ],
                            classNames?.wrapper,
                        ),
                    })}
                >
                    {!isSelected || isSSR ? (
                        <SunFilledIcon size={22} />
                    ) : (
                        <MoonFilledIcon size={22} />
                    )}
                </div>
            </Component>
        );
    }

    return (
        <Dropdown
            placement="bottom-end"
            className="min-w-0"
            classNames={{ content: "bg-opacity-60 backdrop-blur-lg backdrop-saturate-150" }}
        >
            <DropdownTrigger>
                <Button
                    variant="light"
                    isIconOnly
                    aria-label="Open Theme Menu"
                >
                    <PaletteIcon size={22} className="stroke-foreground-600" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Choose A Theme"
                onAction={(key) => setTheme(key.toString())}
                classNames={{ list: "[&>*]:gap-4" }}
            >
                <DropdownItem
                    key="light"
                    startContent={<SunFilledIcon size={22} />}
                    endContent={theme === "light" && <CheckIcon size={22} />}
                >
                    Light
                </DropdownItem>
                <DropdownItem
                    key="dim"
                    startContent={<SunMoonIcon size={22} />}
                    endContent={theme === "dim" && <CheckIcon size={22} />}
                >
                    Dim
                </DropdownItem>
                <DropdownItem
                    key="dark"
                    startContent={<MoonFilledIcon size={22} />}
                    endContent={theme === "dark" && <CheckIcon size={22} />}
                >
                    Dark
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
