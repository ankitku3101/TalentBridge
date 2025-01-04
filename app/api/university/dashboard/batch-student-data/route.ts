import Student from "@/models/Student";
import { NextRequest,NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";

export async function GET(request:NextRequest,){
    try {
        await connectMongo();
        const {searchParams} = new URL(request.url);
        const batch = Number(searchParams.get('batch'));

        if(!batch){
            return NextResponse.json({message:"No value found to search"},{status:400});
        }

        const foundStudents = await Student.aggregate(
            [
                {
                    $match:{
                        graduationYear:batch
                    }
                },
                {
                    $count:"TotalStudents"
                }
            ]
        );

        if(!foundStudents){
            return NextResponse.json({error:"not found any document"},{status:404});
        }
        return NextResponse.json({message:"Counted Total Number of Students",data:foundStudents},{status:200});
    } catch (error) {
        return NextResponse.json({error:error.message||"Internal server error"},{status:500});
    }
}