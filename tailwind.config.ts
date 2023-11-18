import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import plugin from "tailwindcss/plugin";

// import { customDarkColors } from "./theme"

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
        nextui(),
        daisyui,
        nextui({
            addCommonColors: true,
            // themes: {
            //     dark: {
            //         colors: customDarkColors
            //     }
            // }
        }),
        plugin(function({ addUtilities }) {
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
    daisyui: {
        themes: false,
        styled: false,
        logs: false,
    },
};
export default config;
