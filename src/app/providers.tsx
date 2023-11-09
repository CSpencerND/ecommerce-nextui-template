"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";

import type { ThemeProviderProps } from "next-themes/dist/types";

export type ProvidersProps = React.PropsWithChildren<{
    themeProps?: ThemeProviderProps;
}>;

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter()

    return (
        <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </NextUIProvider>
    );
}
