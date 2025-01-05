import { NextRequest, NextResponse } from "next/server";
import Skills from "@/models/Skills";
import connectMongo from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectMongo();

    // Aggregate all skills and their associated students
    const StudentsWithSkill = await Skills.aggregate([
      {
        $lookup: {
          from: "students",
          let: { skillId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$$skillId", "$skills"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1,
              },
            },
          ],
          as: "students",
        },
      },
      {
        $addFields: {
          studentCount: { $size: "$students" },
        },
      },
      {
        $project: {
          skillname: 1,
          studentCount: 1,
        },
      },
      {
        $sort: {
          studentCount: -1, // Sort by student count in descending order
        },
      },
    ]);

    if (!StudentsWithSkill || StudentsWithSkill.length === 0) {
      return NextResponse.json(
        { message: "No skills or associated students found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: StudentsWithSkill, message: "Skills data fetched successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
