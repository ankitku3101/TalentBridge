import { getServerSession } from "next-auth";
import Student from "@/models/Student";
import Employer from "@/models/Employer";
import dbConnect from "@/lib/mongodb";
import { authOptions } from "@/lib/authOptions";

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
      profile = await Student.findById(userId);
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
    await dbConnect();

    let updatedProfile;
    if (userRole === "student") {
      updatedProfile = await Student.findByIdAndUpdate(userId, body, { new: true });
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
