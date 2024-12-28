import Job from "@/models/Job";
import { NextRequest,NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import mongoose from "mongoose";
import Employer from "@/models/Employer";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

interface Params{
    params:{id:string};
}

export async function GET(request:NextRequest,{params}:Params){
    try {
        await connectMongo();

        const session = await getServerSession(authOptions);
        const userId = session?.user.id;
        
        const employerPresence = await Employer.findById(userId);
        if(!employerPresence){
            return NextResponse.json({error:"Unauthorized request"},{status:403});
        }

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