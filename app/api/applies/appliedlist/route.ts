import mongoose from "mongoose";
import Application from "@/models/Application";
import { NextRequest,NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Student from "@/models/Student";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function GET(request:NextRequest){
    try{
        await connectMongo();

        const session = await getServerSession(authOptions);
        const studentId = session?.user.id;
        const Suser = await Student.findById(studentId);
        if(!Suser){
            return NextResponse.json({error:"Unauthorized Access"},{status:403});
        }

        const allJobApplied = await Application.aggregate(
            [
                {
                    $match:{
                        student: new mongoose.Types.ObjectId(studentId)
                    }
                },
                {
                    $project:{
                        job:1
                    }
                },
                {
                    $lookup:{
                        from:"jobs",
                        localField:"job",
                        foreignField:"_id",
                        as:"Job"
                    }
                },
                {
                    $unwind:"$Job"
                },
                {
                    $project:{
                        _id:1,
                        'Job._id': 1,
                        'Job.title': 1,
                        'Job.description': 1,
                        'Job.company': 1,
                        'Job.location': 1,
                        'Job.employmentType': 1,
                        'Job.minSalary': 1,
                        'Job.maxSalary': 1
                    }
                }
            ]
        )

        return NextResponse.json({message:"All Jobs fetched",data:allJobApplied},{status:200})
    }
    catch(error){
        return NextResponse.json({message:error.message},{status:500});
    }
}