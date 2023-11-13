import { Header } from "@/components/header";
import { Providers } from "./providers";

import { siteConfig } from "@/config";
import { cn } from "@nextui-org/react";

import { GeistSans } from "geist/font/sans";
import "./globals.css";

import type { Metadata } from "next";

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
                    <div className="relative flex h-screen flex-col">
                        <Header />
                        <main className="container mx-auto max-w-5xl flex-grow px-6 pt-16">
                            {children}
                        </main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
