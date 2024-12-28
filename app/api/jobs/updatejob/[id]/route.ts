import Job from "@/models/Job";
import Employer from "@/models/Employer";
import { NextRequest,NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

await connectMongo();

interface Params{
    params:{id : String};
}

export async function PATCH(request: NextRequest,{ params }:Params){
    try {

        const session = await getServerSession(authOptions);
        const userId = session?.user.id;
                    
        const employerPresence = await Employer.findById(userId);
        if(!employerPresence){
            return NextResponse.json({error:"Unauthorized request"},{status:403});
        }
        
        const { id } = await params;
        const requestBody = await request.json();
        const {
            description,
            location,
            employmentType,
            salaryRange,
            skillsRequired,
            minSalary,
            maxSalary,
        } = requestBody;

        //Verification

        if(!id){
            return NextResponse.json({error:"ID is required."},{status:400});
        }

        if(!Array.isArray(skillsRequired)){
            return NextResponse.json({error:"Invalid or mismatched data format, requires an array of string."},{status:400});
        }

        const udpatedJob = await Job.findByIdAndUpdate({_id:id},{
            description,
            location,
            employmentType,
            minSalary,
            maxSalary,
            skillsRequired
        },{new:true});

        if(!udpatedJob){
            return NextResponse.json({error:"No such Id found or Update failed."},{status:404});
        }

        const response =  NextResponse.json({message:"Job Updated",success:true,data:udpatedJob},{status:201});
        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}