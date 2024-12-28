import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Job from "@/models/Job";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

await connectDB();

export async function POST(request: NextRequest) {
    try {
        // Fetch session to verify the user's identity and role
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;
        const userRole = session?.user?.role; // Assuming the role is stored in the session

        if (!userId || !userRole) {
            return NextResponse.json(
                { error: "Unauthorized access. Please log in to post a job." },
                { status: 401 }
            );
        }

        // Check if the user is an employer
        if (userRole !== "employer") {
            return NextResponse.json(
                { error: "Forbidden. Only employers can create jobs." },
                { status: 403 }
            );
        }

        // Parse the request body
        const requestBody = await request.json();
        const {
            title,
            description,
            company,
            location,
            employmentType,
            minSalary,
            maxSalary,
            skillsRequired,
        } = requestBody;

        // Validate request body fields
        if (
            !title ||
            !description ||
            !company ||
            !location ||
            !employmentType ||
            !skillsRequired
        ) {
            return NextResponse.json(
                { error: "Missing required fields in the request body." },
                { status: 400 }
            );
        }

        if (!Array.isArray(skillsRequired)) {
            return NextResponse.json(
                {
                    error:
                        "Invalid or mismatched data format. 'skillsRequired' must be an array of strings.",
                },
                { status: 400 }
            );
        }

        // Create a new job entry in the database
        const jobCreated = await Job.create({
            title,
            description,
            company,
            location,
            employmentType,
            minSalary,
            maxSalary,
            skillsRequired,
            postedBy: userId, // Use the logged-in user's ID as the poster
        });

        return NextResponse.json(
            { message: "Job created successfully.", success: true, data: jobCreated },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: "An error occurred while creating the job.", details: error.message },
            { status: 500 }
        );
    }
}
