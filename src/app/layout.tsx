import { Header } from "@/components/global";
import { ProductDrawer } from "@/components/product";
import { TailwindIndicator } from "@/components/utility/tailwind-indicator";
import { Suspense } from "react";
import { Providers } from "./providers";

import { siteConfig } from "@/site.config";

import "@/styles/globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import type { Metadata } from "next";
// import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
    },
};

// export const viewport: Viewport = {
//     themeColor: [
//         { media: "(prefers-color-scheme: dark)", color: "#000000" },
//         { media: "(prefers-color-scheme: light)", color: "#ffffff" },
//     ],
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={`${GeistSans.variable} ${GeistMono.variable} dark`}
            suppressHydrationWarning
        >
            <body className="min-h-screen bg-background text-foreground">
                <Providers
                    themeProps={{
                        defaultTheme: "system",
                        themes: ["light", "dark", "dim"],
                    }}
                >
                    <div
                        vaul-drawer-wrapper=""
                        className="relative flex h-svh flex-col"
                    >
                        <Header themeSwitchType="toggle" />
                        <main className="container mx-auto max-w-5xl flex-grow space-y-24 px-6 py-16">
                            {children}
                        </main>
                    </div>
                    <TailwindIndicator />
                    <Suspense>
                        <ProductDrawer />
                    </Suspense>
                </Providers>
            </body>
        </html>
    );
}
