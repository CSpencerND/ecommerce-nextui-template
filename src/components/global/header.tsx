import { Cart } from "@/components/cart";
import { ThemeSwitch } from "@/components/global/theme-switch";
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

export const Header = ({
    themeSwitchType,
    className,
}: {
    themeSwitchType?: "toggle" | "menu";
    className?: string;
}) => (
    <Navbar
        isBordered
        className={className}
    >
        <NavbarBrand>
            <Link
                href="/"
                color="foreground"
            >
                {siteConfig.logo ? (
                    <Image
                        src={siteConfig.logo}
                        alt="Company Logo"
                    />
                ) : (
                    <h1 className="text-2xl font-bold">{siteConfig.name}</h1>
                )}
            </Link>
        </NavbarBrand>
        <NavbarContent
            className="flex gap-4 max-lg:hidden"
            justify="center"
        >
            {siteConfig.navItems.map(({ label, href }, i) => (
                <NavbarItem
                    key={i}
                /* isActive={false} */
                >
                    <Link
                        color="foreground"
                        href="#"
                    /* aria-current="page" */
                    >
                        {label}
                    </Link>
                </NavbarItem>
            ))}
        </NavbarContent>
        <NavbarContent
            justify="end"
            className="gap-2"
        >
            {/* <NavbarItem className="flex max-sm:hidden"> */}
            {/*     <Link href="#">Login</Link> */}
            {/* </NavbarItem> */}
            {/* <NavbarItem className="max-sm:hidden"> */}
            {/*     <Button */}
            {/*         as={Link} */}
            {/*         color="primary" */}
            {/*         href="#" */}
            {/*         variant="flat" */}
            {/*     > */}
            {/*         Sign Up */}
            {/*     </Button> */}
            {/* </NavbarItem> */}
            {/* <NavbarItem */}
            {/*     as={Button} */}
            {/*     isIconOnly */}
            {/*     variant="light" */}
            {/* > */}
            {/*     <ThemeSwitch type={themeSwitchType} /> */}
            {/* </NavbarItem> */}
            <NavbarItem>
                <Cart />
            </NavbarItem>
            <NavbarMenuToggle
                // as={Button}
                // isIconOnly
                // variant="light"
                className="lg:hidden"
            />
        </NavbarContent>
        <NavbarMenu>
            {siteConfig.navMenuItems.map(({ label, href }, i) => (
                <NavbarMenuItem key={`${label}-${i}`}>
                    <Link
                        color={
                            i === 2
                                ? "primary"
                                : i === siteConfig.navMenuItems.length - 1
                                    ? "danger"
                                    : "foreground"
                        }
                        className="w-full"
                        href="#"
                        size="lg"
                    >
                        {label}
                    </Link>
                </NavbarMenuItem>
            ))}
        </NavbarMenu>
    </Navbar>
);
