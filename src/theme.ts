import { commonColors as common } from "@nextui-org/react";
import { readableColor } from "color2k";

import type { SemanticBaseColors, ThemeColors, ConfigTheme } from "@nextui-org/react";

const base: SemanticBaseColors = {
    light: {
        background: {
            DEFAULT: common.zinc[300],
        },
        foreground: {
            ...common.zinc,
            DEFAULT: "#11181C",
        },
        divider: {
            DEFAULT: "rgba(17 17 17 / 7.5%)",
        },
        focus: {
            DEFAULT: common.blue[500],
        },
        overlay: {
            DEFAULT: "#000000",
        },
        content1: {
            DEFAULT: common.zinc[200],
            foreground: "#11181C",
        },
        content2: {
            DEFAULT: common.zinc[100],
            foreground: common.zinc[800],
        },
        content3: {
            DEFAULT: common.zinc[50],
            foreground: common.zinc[700],
        },
        content4: {
            DEFAULT: "#ffffff",
            foreground: common.zinc[600],
        },
    },
    dark: {
        background: {
            DEFAULT: "#000000",
        },
        foreground: {
            ...swapColorValues(common.zinc),
            DEFAULT: "#ECEDEE",
        },
        focus: {
            DEFAULT: common.blue[500],
        },
        overlay: {
            DEFAULT: "#000000",
        },
        divider: {
            DEFAULT: "rgba(255 255 255 / 7.5%)",
        },
        content1: {
            DEFAULT: common.zinc[900],
            foreground: common.zinc[50],
        },
        content2: {
            DEFAULT: common.zinc[800],
            foreground: common.zinc[100],
        },
        content3: {
            DEFAULT: common.zinc[700],
            foreground: common.zinc[200],
        },
        content4: {
            DEFAULT: common.zinc[600],
            foreground: common.zinc[300],
        },
    },
};

export const themeColorsLight: ThemeColors = {
    ...base.light,
    default: {
        ...common.zinc,
        foreground: readableColor(common.zinc[300]),
        DEFAULT: common.zinc[300],
    },
    primary: {
        ...common.blue,
        foreground: readableColor(common.blue[500]),
        DEFAULT: common.blue[500],
    },
    secondary: {
        ...common.purple,
        foreground: readableColor(common.purple[500]),
        DEFAULT: common.purple[500],
    },
    success: {
        ...common.green,
        foreground: readableColor(common.green[500]),
        DEFAULT: common.green[500],
    },
    warning: {
        ...common.yellow,
        foreground: readableColor(common.yellow[500]),
        DEFAULT: common.yellow[500],
    },
    danger: {
        ...common.red,
        foreground: common.white,
        DEFAULT: common.red[500],
    },
};

export const themeColorsDark: ThemeColors = {
    ...base.dark,
    default: {
        ...swapColorValues(common.zinc),
        foreground: readableColor(common.zinc[700]),
        DEFAULT: common.zinc[700],
    },
    primary: {
        ...swapColorValues(common.blue),
        foreground: readableColor(common.blue[500]),
        DEFAULT: common.blue[500],
    },
    secondary: {
        ...swapColorValues(common.purple),
        foreground: readableColor(common.purple[400]),
        DEFAULT: common.purple[400],
    },
    success: {
        ...swapColorValues(common.green),
        foreground: readableColor(common.green[500]),
        DEFAULT: common.green[500],
    },
    warning: {
        ...swapColorValues(common.yellow),
        foreground: readableColor(common.yellow[500]),
        DEFAULT: common.yellow[500],
    },
    danger: {
        ...swapColorValues(common.red),
        foreground: common.white,
        DEFAULT: common.red[500],
    },
};

const main = {
    50: "rgb(245 245 247)",
    100: "rgb(225 225 228)",
    200: "rgb(210 210 214)",
    300: "rgb(180 180 185)",
    400: "rgb(145 145 151)",
    500: "rgb(113 113 121)",
    600: "rgb(83 83 90)",
    700: "rgb(65 65 71)",
    800: "rgb(45 45 50)",
    900: "rgb(28 28 32)",
    950: "rgb(16 16 19)",
};

export const themeColorsDim: ConfigTheme = {
    extend: "dark",
    colors: {
        background: main[950],
        foreground: main[50],
        content1: main[900],
        content2: main[800],
        content3: main[700],
        content4: main[600],
        divider: main[500],
    },
};

function swapColorValues<T extends Object>(colors: T) {
    const swappedColors = {};
    const keys = Object.keys(colors);
    const length = keys.length;

    for (let i = 0; i < length / 2; i++) {
        const key1 = keys[i];
        const key2 = keys[length - 1 - i];

        // @ts-ignore
        swappedColors[key1] = colors[key2];
        // @ts-ignore
        swappedColors[key2] = colors[key1];
    }
    if (length % 2 !== 0) {
        const middleKey = keys[Math.floor(length / 2)];

        // @ts-ignore
        swappedColors[middleKey] = colors[middleKey];
    }

    return swappedColors;
}
