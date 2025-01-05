import connectMongo from "@/lib/mongodb";
import Job from "@/models/Job";
import { NextResponse,NextRequest } from "next/server";

export async function GET(request:NextRequest){
    try {
        await connectMongo();

        const jobsWithApplicants = await Job.aggregate([
            // First lookup the employer who posted the job
            {
                $lookup: {
                    from: "employers", // Collection name is lowercase and plural
                    localField: "postedBy",
                    foreignField: "_id",
                    as: "employer"
                }
            },
            // Then lookup all applicant details
            {
                $lookup: {
                    from: "students", // Collection name is lowercase and plural
                    localField: "applicants",
                    foreignField: "_id",
                    as: "applicantDetails"
                }
            },
            // Get employer as an object instead of array
            {
                $addFields: {
                    employer: { $arrayElemAt: ["$employer", 0] }
                }
            },
            // Project only the fields we need
            {
                $project: {
                    title: 1,
                    description: 1,
                    company: 1,
                    location: 1,
                    employmentType: 1,
                    // Employer fields
                    employer: {
                        _id: 1,
                        name: 1,
                        email: 1
                        
                    },
                    // Applicant fields
                    applicantDetails: {
                        _id: 1,
                        name: 1,
                        email: 1,
                        skills: 1
                    },
                    totalApplicants: { $size: "$applicantDetails" }
                }
            },
            // Sort by creation date (newest first)
            {
                $sort: {
                    createdAt: -1
                }
            }
        ]);

        return NextResponse.json({message:"Jobs and student under it fetched.",data:jobsWithApplicants},{status:200});
    } catch (error) {
        return NextResponse.json({error:error.message||"Internal Server Error"},{status:500});
    }
}