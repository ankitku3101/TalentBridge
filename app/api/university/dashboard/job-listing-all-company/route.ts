import Job from "@/models/Job";
import connectMongo from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try {
        await connectMongo();

        const jobsByCompany = await Job.aggregate([
            // Group jobs by company
            {
                $group: {
                    _id: "$company",
                    companyName: { $first: "$company" },
                    jobCount: { $sum: 1 },
                    jobs: {
                        $push: {
                            _id: "$_id",
                            title: "$title",
                            description: "$description",
                            location: "$location",
                            salary: "$salary",
                            requirements: "$requirements",
                            // Add other job fields you need
                            postedAt: "$postedAt"
                        }
                    }
                }
            },
            // Sort companies by job count (optional)
            {
                $sort: {
                    jobCount: -1
                }
            },
            // Final shape of the data
            {
                $project: {
                    _id: 0,
                    companyName: 1,
                    jobCount: 1,
                    jobs: 1
                }
            }
        ]);

        return NextResponse.json({message:"Data fetched successfulyy",data:jobsByCompany},{status:200})
    } catch (error) {
        return NextResponse.json({error:error.message||"internal server error"},{status:500})
    }
}