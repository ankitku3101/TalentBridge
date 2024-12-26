import Job from "@/models/Job";
import { NextRequest,NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import mongoose from "mongoose";

interface Params{
    params:{id:string};
}

export async function GET(request:NextRequest,{params}:Params){
    try {
        await connectMongo();

        const {id} = await params;

        const AggregatedDocument = await Job.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(id)
                }
            },{
                $lookup:{
                    from:"students",
                    localField:"applicants",
                    foreignField:"_id",
                    as:"applicantDetails"
                }
            },
            {
                $unwind:"$applicantDetails"
            },
            {
                $project:{
                    _id: 0,
                    "applicantDetails._id":1,
                    "applicantDetails.name":1,
                    "applicantDetails.degree":1,
                    "applicantDetails.graduationYear":1,
                    "applicantDetails.email":1,
                    "applicantDetails.skills":1,
                }
            }
        ])

        return NextResponse.json({message:"Applicants fetched successful",data:AggregatedDocument},{status:200})
    } catch (error) {
        return NextResponse.json({message:error.message},{status:500});
    }
}