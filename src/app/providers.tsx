"use client";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";

import type { ThemeProviderProps } from "next-themes/dist/types";

type ProvidersProps = React.PropsWithChildren<{
    themeProps?: ThemeProviderProps;
}>;

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter();

    return (
        <NextUIProvider navigate={router.push}>
            <ThemeProvider
                enableSystem
                enableColorScheme
                attribute="class"
                {...themeProps}
            >
                {children}
            </ThemeProvider>
        </NextUIProvider>
    );
}
