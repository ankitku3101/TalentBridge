import University from "@/models/University";
import { NextRequest,NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";

export async function POST(request:NextRequest){
    try {
        await connectMongo();
        const requestBody = await request.json();
        const {
            name,
            email,
            password
        } = requestBody;

        if([name,email,password].some((fields)=>fields.trim()==="")){
            return NextResponse.json({error:"Some values are missing"},{status:406})
        }

        const isExists = await University.exists({name,email});

        if(isExists){
            return NextResponse.json({error:"Account Already exists"},{status:400});
        }

        const newAcc = await University.create({
            name,
            email,
            password
        })

        if(!newAcc){
            return NextResponse.json({error:"Account Creation failed"},{status:400});
        }

        const myAccountData = await University.findById(newAcc._id).select('-adminpassword');

        if(!myAccountData){
            return NextResponse.json({error:"Account Fetching failed"},{status:403});
        }

        return NextResponse.json({message:"Account Created",data:myAccountData},{status:201});
    } catch (error) {
        return NextResponse.json({error:error.message||"Internal Server Error"},{status:500});
    }
}