import { Header } from "@/components/global";
import { Toaster } from "@/components/ui/sonner";
import { TailwindIndicator } from "@/components/utility/tailwind-indicator";
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
            <body className="h-svh min-h-screen bg-background text-foreground">
                <Providers
                    themeProps={{
                        defaultTheme: "system",
                        // themes: ["light", "dark", "dim"],
                    }}
                >
                    {/* NOTE: Do we need this div? */}
                    <div vaul-drawer-wrapper="">
                        <Header themeSwitchType="toggle" />
                        <main className="space-y-16 py-12 main-grid">
                            {children}
                        </main>
                    </div>
                    <Toaster />
                    <TailwindIndicator />
                </Providers>
            </body>
        </html>
    );
}
