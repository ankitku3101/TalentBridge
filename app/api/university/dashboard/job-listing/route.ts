import Job from "@/models/Job";
import connectMongo from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try {
        await connectMongo();
        const {searchParams} = new URL(request.url);
        const company = searchParams.get('company');

        let data;

        if(company){
            data = await Job.aggregate(
                [
                    {
                        $match:{
                            company:{
                                $regex:new RegExp(`^${company}$`, 'i')
                            }
                        }
                    },
                    {
                        $count:"totalDocuments"
                    }
                ]
            )
        }else{
            data = await Job.aggregate(
                [
                    {
                        $count:"totalDocuments"
                    }
                ]
            )
        }

        if(!data){
            return NextResponse.json({error:"No Document found"},{status:404});
        }

        return NextResponse.json({message:"Successfully Document fetched",data},{status:200});
    } catch (error) {
        
    }
}