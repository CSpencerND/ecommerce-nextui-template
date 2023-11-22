import { NextResponse } from "next/server";
import { getCollectionDirectory } from "@/faker/faker-functions";

export async function GET() {
        const data = getCollectionDirectory();
        return new NextResponse(JSON.stringify(data));
}
