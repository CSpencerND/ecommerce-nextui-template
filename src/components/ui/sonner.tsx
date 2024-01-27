"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            // toastOptions={{
            //     classNames: {
            //         toast: "group toast group-[.toaster]:bg-content1 group-[.toaster]:text-foreground group-[.toaster]:border-divider group-[.toaster]:shadow-large",
            //         description: "group-[.toast]:text-foreground-700",
            //         actionButton:
            //             "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            //         cancelButton:
            //             "group-[.toast]:bg-default group-[.toast]:text-foreground-700",
            //     },
            // }}
            {...props}
        />
    );
};

export { Toaster };