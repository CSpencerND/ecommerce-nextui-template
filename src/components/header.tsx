import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/navbar";

import { siteConfig } from "@/site.config";

const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
];

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => (
    <Navbar isBordered>
        <NavbarContent>
            <NavbarBrand>
                {siteConfig.logo ? (
                    <Image
                        src={siteConfig.logo}
                        alt="Company Logo"
                    />
                ) : (
                    <h1 className="text-2xl font-bold">{siteConfig.name}</h1>
                )}
            </NavbarBrand>
        </NavbarContent>

        <NavbarContent
            className="flex gap-4 max-lg:hidden"
            justify="center"
        >
            <NavbarItem>
                <Link
                    color="foreground"
                    href="#"
                >
                    Features
                </Link>
            </NavbarItem>
            <NavbarItem isActive>
                <Link
                    href="#"
                    aria-current="page"
                >
                    Customers
                </Link>
            </NavbarItem>
            <NavbarItem>
                <Link
                    color="foreground"
                    href="#"
                >
                    Integrations
                </Link>
            </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
            <NavbarItem className="flex">
                <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
                <Button
                    as={Link}
                    color="primary"
                    href="#"
                    variant="flat"
                >
                    Sign Up
                </Button>
            </NavbarItem>
            <NavbarMenuToggle className="lg:hidden" />
        </NavbarContent>
        <NavbarMenu>
            {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                    <Link
                        color={
                            index === 2
                                ? "primary"
                                : index === menuItems.length - 1
                                  ? "danger"
                                  : "foreground"
                        }
                        className="w-full"
                        href="#"
                        size="lg"
                    >
                        {item}
                    </Link>
                </NavbarMenuItem>
            ))}
        </NavbarMenu>
    </Navbar>
);
