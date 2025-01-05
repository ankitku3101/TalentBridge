import University from "@/models/University";
import connectMongo from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try {
        await connectMongo();
        const uniName = await University.find({},{name:1,_id:1}).sort({name:1});

        if(!uniName){
            return NextResponse.json({error:"Data could not fetched"},{status:404});
        }

        return NextResponse.json({message:"Successfully generated documents",data:uniName,count:uniName.length},{status:200})
    } catch (error) {
        return NextResponse.json({error:error.message||"Internal Server Error"},{status:500})
    }
}