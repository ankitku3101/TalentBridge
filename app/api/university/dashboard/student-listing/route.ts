import { NextRequest,NextResponse } from "next/server";
import Application from "@/models/Application";
import connectMongo from "@/lib/mongodb";

export async function GET(request:NextRequest){
    try {
        await connectMongo();
        
    } catch (error) {
        return NextResponse.json({message:error.message||"Internal server error"},{status:500})
    }
}