import { NextResponse } from "next/server";
import { getFeaturedItems } from "@/faker/faker-functions";

export async function GET() {
    try {
        const data = getFeaturedItems();
        return NextResponse.json(data);
    } catch (error) {
        console.error("[FEATUREDITEMS_GET_ERROR]", error);
        return new NextResponse("Internal Error. Try again.", { status: 500 });
    }
}
