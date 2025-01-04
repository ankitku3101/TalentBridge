import Skills from "@/models/Skills";
import { NextRequest,NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import mongoose from "mongoose";

interface Params{
    params:{id:String};
}

export async function DELETE(request:NextRequest,{params}:Params){
    try {
        await connectMongo();

        //Skill Id
        const {id} = await params;

        if(!mongoose.Types.ObjectId.isValid(id.toString())){
            return NextResponse.json({error:"Invalid Object ID"},{status:401});
        }

        const isRemoved = await Skills.findByIdAndDelete(id);

        if(!isRemoved){
            return NextResponse.json({error:"Removing Skill failure"},{status:400});
        }

        return NextResponse.json({message:"Skill Removed Successfully"},{status:200});

    } catch (error) {
        return NextResponse.json({error:error.message||"Internal Server Error"},{status:500});
    }
}