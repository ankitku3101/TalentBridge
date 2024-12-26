import mongoose from "mongoose";
import connectMongo from "@/lib/mongodb";
import Application from "@/models/Application";
import { NextRequest,NextResponse } from "next/server";
import Job from "@/models/Job";

interface Params{
    params:{id:String}
}

export async function DELETE(request:NextRequest,{params}:Params){
    try {
        await connectMongo();
        const {id} = await params;
        if(!mongoose.Types.ObjectId.isValid(id.toString())) return NextResponse.json({message:"Invalid job ID"},{status:400});

        //Student Id
        //This will be obtained from session or cookies 
        //

        const studentId = "676d61e17501110503524fc6";
        if(!mongoose.Types.ObjectId.isValid(String(studentId).toString())) return NextResponse.json({message:"Invalid student ID"},{status:400});

        await Application.findOneAndDelete({student:studentId,job:id})
        
        await Job.updateOne(
            {
                _id:id
            },
            {
                $pull:{
                    applicants:studentId
                }
            }
        )

        return NextResponse.json({message:"Application removed"},{status:200})

    } catch (error) {
        return NextResponse.json({message:error.message},{status:500});
    }
}