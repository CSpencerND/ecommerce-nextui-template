import { Header } from "@/components/header";
import { Providers } from "./providers";

import { siteConfig } from "@/site.config";
import { cn } from "@nextui-org/react";

import { TailwindIndicator } from "@/components/tailwind-indicator";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";

import type { Metadata, Viewport } from "next";

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
            className="dark"
            style={{ colorScheme: "dark" }}
        >
            <body
                className={cn(
                    "min-h-screen bg-background text-foreground",
                    GeistSans.className,
                )}
            >
                <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
                    <div className="relative flex flex-col h-screen-s">
                        <Header />
                        <main className="container mx-auto max-w-5xl flex-grow space-y-24 px-6 py-16">
                            {children}
                        </main>
                    </div>
                </Providers>
                <TailwindIndicator />
            </body>
        </html>
    );
}
