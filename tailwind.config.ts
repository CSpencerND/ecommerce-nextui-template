import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import plugin from "tailwindcss/plugin";

import { themeColorsDark, themeColorsDim, themeColorsLight } from "./src/theme";

import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            borderRadius: {
                xlarge: "26px",
            },
        },
    },
    darkMode: "class",
    plugins: [
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
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".h-screen-d": {
                    height: ["100vh", "100dvh"],
                },
                ".h-screen-s": {
                    height: ["100vh", "100svh"],
                },
                ".h-screen-l": {
                    height: ["100vh", "100lvh"],
                },
            });
        }),
    ],
};
export default config;
