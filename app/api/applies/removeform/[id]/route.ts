import mongoose from "mongoose";
import connectMongo from "@/lib/mongodb";
import Application from "@/models/Application";
import { NextRequest,NextResponse } from "next/server";
import Job from "@/models/Job";
import Student from "@/models/Student";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

interface Params{
    params:{id:String}
}

export async function DELETE(request:NextRequest,{params}:Params){
    try {
        await connectMongo();
        const {id} = await params;
        if(!mongoose.Types.ObjectId.isValid(id.toString())) return NextResponse.json({message:"Invalid job ID"},{status:400});

        const session = await getServerSession(authOptions);
        const studentId = session?.user.id;
        const Suser = await Student.findById(studentId);
        if(!Suser){
            return NextResponse.json({error:"Unauthorized Access"},{status:403});
        }
        
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