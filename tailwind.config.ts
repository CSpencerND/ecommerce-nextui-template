import { nextui } from "@nextui-org/react";
import container from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";
import plugin from "tailwindcss/plugin";

import { themeColorsDark, themeColorsDim, themeColorsLight } from "./src/theme";

import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-geist-sans)"],
                mono: ["var(--font-geist-mono)"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            borderRadius: {
                xlarge: "26px",
                "2xlarge": "38px",
                icon: "22.37%",
            },
        },
    },
    darkMode: "class",
    plugins: [
        container,
        typography,
        nextui({
            addCommonColors: true,
            themes: {
                dark: {
                    colors: themeColorsDark,
                },
                light: {
                    colors: themeColorsLight,
                    layout: {
                        boxShadow: {
                            small: "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06)",
                            medium: "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08)",
                            large: "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12)",
                        },
                    },
                },
                dim: themeColorsDim,
            },
        }),
        plugin(function ({ addUtilities, addVariant }) {
            addUtilities({
                ".debug": {
                    outline: "1px solid red",
                },
                ".debug-nested": {
                    outline: "1px solid red",
                    "*": {
                        outline: "1px solid red",
                    },
                },
                ".focus-ring": {
                    zIndex: "10",
                    outline: "2px solid transparent",
                    outlineOffset: "2px",
                    outlineWidth: "2px",
                    outlineColor: "hsl(var(--nextui-focus) / var(--nextui-focus-opacity, 1))",
                },
            });

            /** HACK: Experimental - May not work as expected */
            addVariant("focus-visible-within", "&:has(:focus-visible)");
        }),
    ],
};

export default config;
