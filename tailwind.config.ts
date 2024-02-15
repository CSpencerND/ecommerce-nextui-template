import { nextui } from "@nextui-org/theme";

import goldenRatio from "./tailwindcss-golden-ratio";
import container from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";

import {
    // themeColorsDark,
    // themeColorsDim,
    // themeColorsLight,
    fibi,
    nextuiTailwindContentPath,
} from "./nextui-config";

import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        nextuiTailwindContentPath,
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

            // padding: fibi,
            // margin: fibi,
            // gap: fibi,
            // width: fibi,
            // height: fibi,
            // maxWidth: fibi,
            // maxHeight: fibi,
            // size: fibi,

            borderRadius: {
                xlarge: "26px",
                "2xlarge": "38px",
                icon: "22.37%",
                // ...fibi,
            },

            // padding: {
            //     xsmall: "3px",
            //     small: "6px",
            //     medium: "12px",
            //     large: "24px",
            //     xlarge: "36px",
            // },

            // borderRadius: {
            //     xsmall: "3px",
            //     small: "6px",
            //     medium: "12px",
            //     large: "24px",
            //     xlarge: "36px",
            //     icon: "22.37%",
            // },
        },

        goldenRatio: {
            /**
             * Use a prefix instead of overwriting existing spacing utilities
             * @type {Boolean|String}
             * default: true|'gr-'
             * example: 'golden-ratio-' would generate classes like mt-golden-ratio-2);
             */
            prefix: "f",

            /**
             * The spacing unit
             * @type {String}
             * default: 'rem'
             */
            spacerUnit: "px",

            /**
             * The starting point for spacing
             * @type {Number}
             * default: 1.5
             * example: `m-gr-6` will be `1.5rem`. You have 1-5 for smaller values and 7-11 for larger values
             */
            spacerBase: 34,

            /**
             * Use css variables for generated values
             * @type {Boolean}
             */
            useCssVars: true,
        },
    },
    darkMode: "class",
    plugins: [
        container,
        typography,
        animate,
        goldenRatio,
        nextui({
            addCommonColors: true,
            themes: {
                dark: {
                    // colors: themeColorsDark,
                },
                light: {
                    // colors: themeColorsLight,
                    layout: {
                        boxShadow: {
                            small: "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06)",
                            medium: "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08)",
                            large: "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12)",
                        },
                    },
                },
                // dim: themeColorsDim,
            },
        }),
        plugin(function ({ addUtilities, addVariant }) {
            addUtilities({
                ".main-grid": {
                    "--gutter": "24px",
                    "--max-width": "65ch",

                    position: "relative",
                    display: "grid",
                    gridTemplateColumns:
                        "1fr min(var(--max-width), calc(100% - calc(var(--gutter) * 2))) 1fr",
                    gridColumnGap: "var(--gutter)",

                    "& > *": {
                        gridColumn: "2",
                    },

                    "& > .full-bleed": {
                        width: "100%",
                        gridColumn: "1 / -1",
                    },
                },
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
                    zIndex: "50",
                    outline: "2px solid transparent",
                    outlineOffset: "2px",
                    outlineWidth: "2px",
                    outlineColor:
                        "hsl(var(--nextui-focus) / var(--nextui-focus-opacity, 1))",
                },
            });

            /** HACK: Experimental - May not work as expected */
            addVariant("focus-visible-within", "&:has(:focus-visible)");
        }),
    ],
};

export default config;
