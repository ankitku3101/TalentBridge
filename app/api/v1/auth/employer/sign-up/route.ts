import { NextRequest,NextResponse } from "next/server";
import Employer from "@/models/Employer";
import connectMongo from "@/lib/mongodb";

export async function POST(request:NextRequest){
    try {
        await connectMongo();
        const requestBody = await request.json();
        const {
            name,
            company,
            email,
            password,
            position,
            contactNumber,
            role,
            hiringFor
        } = requestBody;
        
        if(
            [email,password,name,position,role,company,contactNumber].some((field)=>field?.trim()==="")
        )
        {
            return NextResponse.json({message:"Some fields are empty"},{status:400});
        }

        if(!Array.isArray(hiringFor)){
            return NextResponse.json({message:"Hiring for field must be an array"},{status:400});
        }
        
        const EmployerUser = await Employer.findOne({email});

        if(EmployerUser){
            return NextResponse.json({message:"User already exists"},{status:409})
        }

        const NewEmployerUser = await Employer.create({
            name,
            company,
            email,
            password,
            position,
            hiringFor,
            contactNumber,
            role
        })

        if(!NewEmployerUser){
            return NextResponse.json({message:"User creation failed"},{status:500})
        }

        return NextResponse.json({message:"User created successfully"},{status:200})
    } catch (error) {
        return NextResponse.json({message:error.message},{status:500});
    }
}