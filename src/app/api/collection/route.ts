import { NextResponse } from "next/server";
import { getCollection } from "@/faker/faker-functions";

export async function GET() {
    try {
        const data = getCollection();
        return NextResponse.json(data);
    } catch (error) {
        console.error("[COLLECTION_GET_ERROR]", error);
        return new NextResponse("Internal Error. Try again.", { status: 500 });
    }
}
