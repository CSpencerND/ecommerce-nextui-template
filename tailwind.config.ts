import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";
import container from "@tailwindcss/container-queries";
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
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            borderRadius: {
                xlarge: "26px",
                icon: "22.37%",
            },
        },
        /** NOTE: @update will not be needed on the next update */
        size: {
            "0": "0px",
            px: "1px",
            "0.5": "0.125rem",
            1: "0.25rem",
            "1.5": "0.375rem",
            2: "0.5rem",
            "2.5": "0.625rem",
            3: "0.75rem",
            "3.5": "0.875rem",
            4: "1rem",
            5: "1.25rem",
            6: "1.5rem",
            7: "1.75rem",
            8: "2rem",
            9: "2.25rem",
            10: "2.5rem",
            11: "2.75rem",
            12: "3rem",
            14: "3.5rem",
            16: "4rem",
            20: "5rem",
            24: "6rem",
            28: "7rem",
            32: "8rem",
            36: "9rem",
            40: "10rem",
            44: "11rem",
            48: "12rem",
            52: "13rem",
            56: "14rem",
            60: "15rem",
            64: "16rem",
            72: "18rem",
            80: "20rem",
            96: "24rem",
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
        plugin(function ({ addUtilities, matchUtilities, addVariant, theme }) {
            addUtilities({
                /** NOTE: @update will not be needed on the next update */
                ".h-screen-d": {
                    height: ["100vh", "100dvh"],
                },
                ".h-screen-s": {
                    height: ["100vh", "100svh"],
                },
                ".h-screen-l": {
                    height: ["100vh", "100lvh"],
                },
                ".outline-debug": {
                    outline: "1px solid red",
                },
            });

            matchUtilities(
                /** NOTE: @update will not be needed on the next update */
                {
                    size: (value) => ({
                        width: value,
                        height: value,
                    }),
                },
                { values: theme("size") },
            );

            /** HACK: Experimental - May not work as expected */
            addVariant("focus-visible-within", "&:has(:focus-visible)");
        }),
    ],
};

export default config;
