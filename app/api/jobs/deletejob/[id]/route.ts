import Job from "@/models/Job";
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Employer from "@/models/Employer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

interface Params {
    params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        await connectMongo();

        const session = await getServerSession(authOptions);
        const userId = session?.user.id;

        // Check if the employer exists
        const employerPresence = await Employer.findById(userId);
        if (!employerPresence) {
            return NextResponse.json(
                { error: "Unauthorized request" },
                { status: 403 }
            );
        }

        const { id } = params;

        // Validate the ID parameter
        if (!id) {
            return NextResponse.json(
                { error: "Job ID is required." },
                { status: 400 }
            );
        }

        // Check if the job exists
        const jobToDelete = await Job.findById(id);
        if (!jobToDelete) {
            return NextResponse.json(
                { error: "Job not found." },
                { status: 404 }
            );
        }

        // Delete the job
        await Job.findByIdAndDelete(id);

        return NextResponse.json(
            { message: "Job deleted successfully." },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
