import type { ApiType } from "@/faker/faker-functions";
import type { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};
export type { SiteConfig } from "@/site.config";
export type Colors = ApiType["product"]["colors"];
