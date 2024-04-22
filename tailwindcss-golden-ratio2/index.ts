import plugin from "tailwindcss/plugin";

const phi = 1.61803398875;

const m = 1;
const s = m / phi;
const xs = s / phi;
const xxs = xs / phi;
const l = m * phi;
const xl = l * phi;
const xxl = xl * phi;

const sizes = { xxs, xs, s, m, l, xl, xxl };

type Props = {
    css: Record<string, string>;
    tw: Record<string, string>;
};

const props = Object.entries(sizes).reduce(
    (props: Props, [k, v]: [string, number]) => {
        props.css[`--gr-${k}`] = `${v}em`;
        props.tw[`gr-${k}`] = `var(--gr-${k})`;
        return props;
    },
    { css: {}, tw: {} },
);

export const goldenRatio2 = plugin(
    ({ addBase }) => {
        addBase({
            ":root": props.css,
        });
    },
    {
        theme: {
            extend: {
                spacing: props.tw,
                borderRadius: props.tw,
            },
        },
    },
);
