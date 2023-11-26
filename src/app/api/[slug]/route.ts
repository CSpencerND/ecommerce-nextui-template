import { fakerFunctions, type ApiType } from "@/faker/faker-functions";
import { NextResponse } from "next/server";

type RouteParams = {
    params: {
        slug: keyof ApiType;
    };
};

/**
 * Can't use edge for free
 * :( sadge
 *
 * export const runtime = "edge";
 */

export async function GET(_req: Request, { params }: RouteParams) {
    const getData = fakerFunctions[params.slug];
    const data = getData();
    return NextResponse.json(data);
}
