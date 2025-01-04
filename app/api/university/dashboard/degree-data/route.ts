import Student from "@/models/Student";
import connectMongo from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try {
        await connectMongo();
        const {searchParams} = new URL(request.url);

        const degree = searchParams.get('degree');

        if(!degree){
            return NextResponse.json({error:"No degree value found."},{status:404});
        }

        const documents = await Student.aggregate(
            [
                {
                    $match:{
                        degree:{
                            $regex:new RegExp(`^${degree}$`, 'i')
                        }
                    }
                },
                {
                    $count:"TotalDocuments"
                }
            ]
        )

        if(!documents){
            return NextResponse.json({error:"No Document found"},{status:404});
        }

        return NextResponse.json({message:"Data fetched successfully",data:documents},{status:200});
    } catch (error) {
        return NextResponse.json({error:error.message||"internal Server Error"},{status:500});
    }
}