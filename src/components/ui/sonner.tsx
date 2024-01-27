"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

import { tv } from "tailwind-variants";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    const { base, toast, description, actionButton, cancelButton } = sonner();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className={base()}
            toastOptions={{
                classNames: {
                    toast: toast(),
                    description: description(),
                    actionButton: actionButton(),
                    cancelButton: cancelButton(),
                },
            }}
            {...props}
        />
    );
};

const sonner = tv({
    base: "toaster group",
    slots: {
        toast: [
            "toast group",
            "group-[.toaster]:rounded-large group-[.toaster]:border-divider group-[.toaster]:shadow-medium",
            "group-[.toaster]:bg-background/60 group-[.toaster]:text-foreground",
            "group-[.toaster]:backdrop-blur group-[.toaster]:backdrop-saturate-150",
        ],
        description: "group-[.toast]:text-foreground-700",
        actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
        cancelButton:
            "group-[.toast]:bg-default group-[.toast]:text-foreground-700",
    },
});

export { Toaster };
