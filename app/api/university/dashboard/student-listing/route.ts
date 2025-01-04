import { NextRequest,NextResponse } from "next/server";
import Application from "@/models/Application";
import Student from "@/models/Student";
import connectMongo from "@/lib/mongodb";

export async function POST(request: NextRequest){
    try {
        /**
         * University Verification needed from session.
         */

        await connectMongo();
        const resquestBody = await request.json();
        const { skills } = resquestBody;

        const StudentsWithSkill = await Student.aggregate([
            {
                $match:{
                    skills:{
                        $in:skills
                    }
                }
            },
            {
                $project:{
                    name:1,
                    skills:1,
                    matchedSkills:{
                        $setIntersection:[
                            "$skills",
                            skills
                        ]
                    },
                    rollNumber:1,
                    degree:1,
                    email:1,
                    phone:1,
                    yoe:1
                }
            },
            {
                $addFields:{
                    matchedSkillCount:{$size:"$matchedSkills"}
                }
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