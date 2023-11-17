import { NextResponse } from "next/server";
import { getHero } from "@/faker/faker-functions";

export async function GET() {
    try {
        const data = getHero();
        return NextResponse.json(data);
    } catch (error) {
        console.error("[HERO_GET_ERROR]", error);
        return new NextResponse("Internal Error. Try again.", { status: 500 });
    }
}
