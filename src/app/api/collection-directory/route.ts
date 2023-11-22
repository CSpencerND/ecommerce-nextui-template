import { NextResponse } from "next/server";
import { getCollectionDirectory } from "@/faker/faker-functions";

export async function GET() {
    try {
        const data = getCollectionDirectory();
        return NextResponse.json(data);
    } catch (error) {
        console.error("[COLLECTION_DIRECTORY_GET_ERROR]", error);
        return new NextResponse("Internal Error. Try again.", { status: 500 });
    }
}
