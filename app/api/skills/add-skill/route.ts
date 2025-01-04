import Skills from "@/models/Skills";
import { NextRequest,NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";

export async function POST(request: NextRequest){
    try {
        await connectMongo();

        const requestBody = await request.json();
        const {skillname} = requestBody;

        const isExists = await Skills.exists({skillname});

        if(isExists){
            return NextResponse.json({error:"Skill already exists, Thank you"},{status:400});
        }

        if(!skillname){
            return NextResponse.json({error:"Skill name doesn't exist or undefined"},{status:400});
        }

        const skillAdded = await Skills.create({skillname});

        if(!skillAdded){
            return NextResponse.json({error:"Skill couldn't added"},{status:400});
        }

        return NextResponse.json({message:"Skill added succesfully",data:skillAdded},{status:201});
    } catch (error) {
        return NextResponse.json({error:error.message||"Internal Server Error"},{status:500});
    }
}