import { NextResponse } from "next/server";
import { getFeaturedItems } from "@/faker/faker-functions";

export async function GET() {
        const data = getFeaturedItems();
        return new NextResponse(JSON.stringify(data));
}
