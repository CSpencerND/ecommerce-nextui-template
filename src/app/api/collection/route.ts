import { NextResponse } from "next/server";
import { getCollection } from "@/faker/faker-functions";

export async function GET() {
        const data = getCollection();
        return new NextResponse(JSON.stringify(data));
}
