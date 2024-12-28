import Job from "@/models/Job";
import { NextRequest,NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Employer from "@/models/Employer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


interface Params{
    params:{id : String};
}

export async function DELETE(request: NextRequest,{ params }:Params){
    try {
        await connectMongo();

        const session = await getServerSession(authOptions);
        const userId = session?.user.id;

        const employerPresence = await Employer.findById(userId);
        if(!employerPresence){
            return NextResponse.json({error:"Unauthorized request"},{status:403});
        }

        const { id } = await params;

        if(!id){
            return NextResponse.json({error:"ID is Required."},{status:400});
        }

        await Job.findByIdAndDelete({_id:id});

        return NextResponse.json({message:"Job Deleted."},{status:200});
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500});
    }
}