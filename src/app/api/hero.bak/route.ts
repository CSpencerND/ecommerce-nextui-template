import { NextResponse } from "next/server";
import { getHero } from "@/faker/faker-functions";

export async function GET() {
        const data = getHero();
        return new NextResponse(JSON.stringify(data));
}
