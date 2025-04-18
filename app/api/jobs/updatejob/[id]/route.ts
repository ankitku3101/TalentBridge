import Job from "@/models/Job";
import Employer from "@/models/Employer";
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

await connectMongo();

interface Params {
    params: { id: String };
}

export async function PATCH(request: NextRequest, { params }: Params) {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user.id;
        const employerPresence = await Employer.findById(userId);
        
        if (!employerPresence) {
            return NextResponse.json({ error: "Unauthorized request" }, { status: 403 });
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

        // Verification
        if (!id) {
            return NextResponse.json({ error: "ID is required." }, { status: 400 });
        }

        if (!Array.isArray(skillsRequired)) {
            return NextResponse.json({ error: "Invalid or mismatched data format, requires an array of string." }, { status: 400 });
        }

        // Update the job, but only change the fields that are provided
        const updatedJob = await Job.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    ...(description && { description }),
                    ...(location && { location }),
                    ...(employmentType && { employmentType }),
                    ...(minSalary && { minSalary }),
                    ...(maxSalary && { maxSalary }),
                    ...(skillsRequired?.length > 0 && { skillsRequired })
                }
            },
            { new: true }
        );

        if (!updatedJob) {
            return NextResponse.json({ error: "No such Id found or Update failed." }, { status: 404 });
        }

        return NextResponse.json({ message: "Job Updated", success: true, data: updatedJob }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
