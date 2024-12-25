import Job from "@/models/Job";
import { NextRequest,NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";

await connectMongo();

interface Params{
    params:{id : String};
}

export async function DELETE(request: NextRequest,{ params }:Params){
    try {
        const { id } = await params;

        if(!id){
            return NextResponse.json({error:"ID is Required."},{status:400});
        }

        await Job.findByIdAndDelete({_id:id});

        return NextResponse.json({message:"Job Deleted."},{status:200});
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500});
    }
}