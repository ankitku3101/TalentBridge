import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id || null;
        return NextResponse.json({
            userId,
            session, 
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Unable to fetch session", details: error.message },
            { status: 500 }
        );
    }
}
