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

        const StudentsWithSkill = await Student.aggregate([
            {
                $match:{
                    skills:{
                        $in:skillIds
                    }
                }
            },
            {
                $project:{
                    matchedSkills:{
                        $setIntersection:[
                            "$skills",
                            skillIds
                        ]
                    },
                }
            },
            {
                $addFields:{
                    matchedSkillCount:{$size:"$matchedSkills"}
                }
            },
            {
                $count: "totalStudents"
            },
            {
                $sort:{
                    matchedSkillsCount: -1
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