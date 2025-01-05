import Student from "@/models/Student";
import connectMongo from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectMongo();

        const documents = await Student.aggregate([
            // Group students by degree
            {
                $group: {
                    _id: "$degree",
                    degreeName: { $first: "$degree" },
                    studentCount: { $sum: 1 },
                    students: {
                        $push: {
                            _id: "$_id",
                            name: "$name",
                            email: "$email",
                            // Include other student fields you need
                            skills: "$skills",
                            createdAt: "$createdAt"
                        }
                    }
                }
            },
            // Lookup skills for each student
            {
                $unwind: {
                    path: "$students",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "skills",
                    localField: "students.skills",
                    foreignField: "_id",
                    as: "students.skillDetails"
                }
            },
            // Group back to original structure
            {
                $group: {
                    _id: "$_id",
                    degreeName: { $first: "$degreeName" },
                    studentCount: { $first: "$studentCount" },
                    students: {
                        $push: {
                            $mergeObjects: [
                                "$students",
                                { skills: "$students.skillDetails" }
                            ]
                        }
                    }
                }
            },
            // Sort by degree name
            {
                $sort: {
                    degreeName: 1
                }
            },
            // Final projection
            {
                $project: {
                    _id: 0,
                    degreeName: 1,
                    studentCount: 1,
                    students: 1
                }
            }
        ]);

        if (!documents.length) {
            return NextResponse.json({
                error: "No students found"
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Data fetched successfully",
            data: documents
        }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({
            error: error.message || "Internal Server Error"
        }, { status: 500 });
    }
}