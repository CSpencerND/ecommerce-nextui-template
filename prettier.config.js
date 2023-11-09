/** @type {import("prettier").Config} */
const config = {
    tabWidth: 4,
    singleQuote: false,
    printWidth: 96,
    singleAttributePerLine: true,
    plugins: ["prettier-plugin-tailwindcss"],
    tailwindFunctions: ["clsx", "twMerge", "cn", "tv", "tw"]
};

export default config;
