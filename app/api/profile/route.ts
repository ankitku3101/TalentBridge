import { getServerSession } from "next-auth";
import Student from "@/models/Student";
import Employer from "@/models/Employer";
import dbConnect from "@/lib/mongodb";
import { authOptions } from "@/lib/authOptions";
import mongoose from "mongoose";
import Skills from "@/models/Skills";

// API Route to fetch the profile (Student or Employer)
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const userRole = session?.user?.role;

    if (!session || !userId || !userRole) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    await dbConnect();

    let profile;
    if (userRole === "student") {
      if(!mongoose.models.Skills){mongoose.model('Skills', Skills.schema);}
      profile = await Student.findById(userId).populate('skills',"skillname -_id").populate('college','name -_id');
      console.log(profile);
    } else if (userRole === "employer") {
      profile = await Employer.findById(userId);
    } else {
      return new Response(JSON.stringify({ message: "Invalid role" }), { status: 400 });
    }

    if (!profile) {
      return new Response(JSON.stringify({ message: `${userRole} not found` }), { status: 404 });
    }

    return new Response(JSON.stringify(profile), { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return new Response(JSON.stringify({ message: "Error fetching profile" }), { status: 500 });
  }
}

// API Route to update the profile (Student or Employer)
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const userRole = session?.user?.role;

    if (!session || !userId || !userRole) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json();
    const {skills} = body;
    const SkillValues = skills.split(',').map(S=>S.trim());
    await dbConnect();

    let updatedProfile;
    if (userRole === "student") {

      const SkillIds:mongoose.Types.ObjectId[] = [];
      
      for(const name of SkillValues){
        let foundskill = await Skills.findOne({skillname:name.toUpperCase()});
    
        if(!foundskill){
          foundskill = await Skills.create({skillname:name});
        }
    
        SkillIds.push(foundskill._id);
      }
      updatedProfile = await Student.findByIdAndUpdate(userId, {...body,skills:SkillIds}, { new: true }).populate('skills',"skillname -_id");
    } else if (userRole === "employer") {
      updatedProfile = await Employer.findByIdAndUpdate(userId, body, { new: true });
    } else {
      return new Response(JSON.stringify({ message: "Invalid role" }), { status: 400 });
    }

    if (!updatedProfile) {
      return new Response(JSON.stringify({ message: "Profile not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedProfile), { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response(JSON.stringify({ message: "Error updating profile" }), { status: 500 });
  }
}
