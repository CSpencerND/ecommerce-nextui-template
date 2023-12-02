"use client";

import { MoonFilledIcon, SunFilledIcon } from "@/components/icons";
import { type SwitchProps, useSwitch } from "@nextui-org/switch";
import { VisuallyHidden } from "@react-aria/visually-hidden";

import { useIsSSR } from "@react-aria/ssr";
import { useTheme } from "next-themes";

import { cn } from "@nextui-org/system";

export interface ThemeSwitchProps {
    className?: string;
    classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ className, classNames }) => {
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
};
