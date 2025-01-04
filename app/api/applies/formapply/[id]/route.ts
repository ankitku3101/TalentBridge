import Application from "@/models/Application";
import { NextRequest,NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import mongoose from "mongoose";
import Job from "@/models/Job";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Student from "@/models/Student";

interface Params{
    params:{id : String};
}

export async function POST(request:NextRequest,{params}:Params){
    await connectMongo();
    try {
        //Job ID
        const {id} = await params;
        console.log("HI");
        
        if(!mongoose.Types.ObjectId.isValid(id.toString())) return NextResponse.json({message:"Invalid job ID"},{status:400});
        
        //User Id
        const session = await getServerSession(authOptions);
        const studentId = session?.user.id;
        const Suser = await Student.findById(studentId);
        if(!Suser){
            return NextResponse.json({error:"Unauthorized Access"},{status:403});
        }
        
        //student verification
        if(!mongoose.Types.ObjectId.isValid(String(studentId).toString())) return NextResponse.json({message:"Invalid student ID"},{status:400});
        
        const requestBody = await request.json();
        const {
            status,
            coverLetter
        } = requestBody;
        
        const theJob = await Job.findById({_id:id});
        
        const application = await Application.create({
            student:studentId,
            job:id,
            coverLetter,
            status
        })
        console.log("Here lies the error")
        
        theJob.applicants.push(studentId);
        await theJob.save();

        return NextResponse.json({message:"Application accepted.",application},{status:200})
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500});
    }
}