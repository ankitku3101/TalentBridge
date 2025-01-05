import { NextRequest,NextResponse } from "next/server";
import Student from "@/models/Student";
import Skills from "@/models/Skills";
import connectMongo from "@/lib/mongodb";
import mongoose from "mongoose";

interface SkillDocument {
    _id: mongoose.Types.ObjectId;
    skillname: string;
}

export async function POST(request: NextRequest){
    try {
        /**
         * University Verification needed from session.
         */

        await connectMongo();
        const resquestBody = await request.json();
        const { skills } = resquestBody;

        const skillDocuments: SkillDocument[] = await Skills.find(
            { skillname: { $in: skills } },
            '_id'
        );

        const skillIds: mongoose.Types.ObjectId[] = skillDocuments.map(skill => skill._id);

        const StudentsWithSkill = await Skills.aggregate([
            {
                $match: {
                    _id: { $in: skillIds }
                }
            },
            {
                $lookup: {
                    from: "students",
                    let: { skillId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$$skillId", "$skills"]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                email: 1,
                            }
                        }
                    ],
                    as: "students"
                }
            },
            {
                $addFields: {
                    studentCount: { $size: "$students" }
                }
            },
            {
                $project: {
                    skillname: 1,
                    studentCount: 1,
                    students: 1
                }
            },
            {
                $sort: {
                    studentCount: -1
                }
            }
        ])

        if(!StudentsWithSkill){
            return NextResponse.json({message:"Student with required skills not available"},{status:404});
        }
        
        return NextResponse.json({data:StudentsWithSkill,message:"Student documents fetched succesfully"},{status:200})

    } catch (error) {
        return NextResponse.json({message:error.message||"Internal server error"},{status:500})
    }
}