import Employer from "@/models/Employer";
import connectMongo from "@/lib/mongodb";
import { NextRequest,NextResponse } from "next/server";

export async function GET(requst:NextRequest){
    try {
        await connectMongo();

        const employerDocument = await Employer.aggregate([
            {
                $facet: {
                    documents: [
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                email: 1,
                                company: 1
                            }
                        }
                    ],
                    totalCount: [
                        {
                            $count: "count"
                        }
                    ]
                }
            },
            {
                $project: {
                    documents: 1,
                    totalCount: { $arrayElemAt: ["$totalCount.count", 0] }
                }
            }
        ]);

        return NextResponse.json({message:"Document fetched successfully",data:employerDocument},{status:200});
    } catch (error) {
        return NextResponse.json({error:error.message||"Internal Server Error"},{status:500})
    }
}