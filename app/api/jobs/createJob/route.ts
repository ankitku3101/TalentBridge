import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Job from "@/models/Job";

await connectDB();

export async function POST(request:NextRequest) {
    try {
        const requestBody = await request.json();
        const {
            title,
            description,
            company,
            location,
            employmentType,
            salaryRange,
            skillsRequired,
            postedBy
        } = requestBody;

        //Employe verification.
        //const employeId=;
        if(!Array.isArray(skillsRequired)){
            return NextResponse.json({error:"Invalid or mismatched data format, requires an array of string."},{status:400});
        }

        const JobCreated = await Job.create({
            title,
            description,
            company,
            location,
            employmentType,
            salaryRange,
            skillsRequired,
            postedBy
        })

        const response = NextResponse.json({message:"Job created",success:true,data:JobCreated},{status:201});
        return response;
    } catch (error: any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}