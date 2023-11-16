import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

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
    ],
    daisyui: {
        themes: false,
        styled: false,
        logs: false,
    },
};
export default config;
