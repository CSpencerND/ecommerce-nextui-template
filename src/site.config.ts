import { faker } from "@faker-js/faker";

/**
 * WARNING: Leave this true for testing purposes. Switch it to false for production.
 */
const isImageUnoptimized: boolean = true;

const PORT = 3000;
const URL = "https://ecommerce-nextui-template.vercel.app";

const NODE_ENV = process.env.NODE_ENV;

const API_URL =
    NODE_ENV === "production" ? `${URL}/api` : `http://localhost:${PORT}/api`;

const siteConfig = {
    name: faker.science.chemicalElement().name,
    description: "Store Description",
    logo: "",
    navItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Docs",
            href: "/docs",
        },
        {
            label: "Pricing",
            href: "/pricing",
        },
        {
            label: "Blog",
            href: "/blog",
        },
        {
            label: "About",
            href: "/about",
        },
    ],

    navMenuItems: [
        {
            label: "Profile",
            href: "/profile",
        },
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Projects",
            href: "/projects",
        },
        {
            label: "Team",
            href: "/team",
        },
        {
            label: "Calendar",
            href: "/calendar",
        },
        {
            label: "Settings",
            href: "/settings",
        },
        {
            label: "Help & Feedback",
            href: "/help-feedback",
        },
        {
            label: "Logout",
            href: "/logout",
        },
    ],

    links: {
        github: "https://github.com/nextui-org/nextui",
        twitter: "https://twitter.com/getnextui",
        docs: "https://nextui.org",
        discord: "https://discord.gg/9b6yyZKmH4",
        sponsor: "https://patreon.com/jrgarciadev",
    },
} as const;

export {
    isImageUnoptimized,
    // NODE_ENV,
    API_URL,
    siteConfig,
};

// export type SiteConfig = typeof siteConfig;
