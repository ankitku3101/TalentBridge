import { authOptions } from "@/lib/authOptions";
import connectMongo from "@/lib/mongodb";
import Employer from "@/models/Employer";
import Job from "@/models/Job";
import Student from "@/models/Student";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Params{
    params:{id:String}
}

export async function GET(request: NextRequest,{params}:Params){
    try {
        /**
         * Session employer verification
         */

        const session = await getServerSession(authOptions);
        const userId = session?.user.id;
        const doesUserExistsInEmploye = await Employer.exists({_id:userId});
        const doesUserExistsInStudent = await Student.exists({_id:userId});
        if(!(doesUserExistsInEmploye||doesUserExistsInStudent)){
            return NextResponse.json({error:"Unauthorized Access"},{status:403});
        }

        await connectMongo();
        
        //Job Id
        const {id} = params;
        if(!mongoose.Types.ObjectId.isValid(id.toString())){
            return NextResponse.json({error:"Invalid ID"},{status:403});
        }
        
        const JobData = await Job.findById(id);
        
        if(!JobData){
            return NextResponse.json({error:"No document found on the id"},{status:404});
        }

        return NextResponse.json({message:"Data fetched",data:JobData},{status:201});
    } catch (error) {
        return NextResponse.json({error:error.message||"Internal Server Error"},{status:500});
    }
}