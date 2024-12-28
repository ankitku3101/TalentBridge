import { NextRequest,NextResponse } from "next/server";
import Employer from "@/models/Employer";
import connectMongo from "@/lib/mongodb";
import { stat } from "fs";

const generateAccessTokenFromUser = async (userId)=>{
    try{
        const user = await Employer.findById(userId);

        const AccessToken = user.generateAccessToken();

        return {AccessToken};
    }catch{
        return NextResponse.json({message:"Something went wrong."},{status:500});
    }
}

export async function POST(request:NextRequest,response:NextResponse){
    try {

        await connectMongo();
        
        const requestBody = await request.json();

        const {
            email,password
        } = requestBody
        
        const user = await Employer.findOne({email});

        if(!user){
            return NextResponse.json({message:"user not found"},{status:404})
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if(!isPasswordValid) return NextResponse.json({message:"incorrect password"},{status:401})
        
    } catch (error) {
        
    }
}