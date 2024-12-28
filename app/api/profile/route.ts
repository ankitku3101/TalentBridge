import { getServerSession } from "next-auth";
import Student from "@/models/Student";
import Employer from "@/models/Employer";
import dbConnect from "@/lib/mongodb";
import { authOptions } from "@/lib/authOptions";

// API Route to fetch the profile (Student or Employer)
export async function GET(request: Request) {
  try {
    // Fetch session to verify the user's identity and role
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const userRole = session?.user?.role;

    if (!session || !userId || !userRole) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    await dbConnect();

    // Dynamically fetch data based on the user's role
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

    // Return the profile
    return new Response(JSON.stringify(profile), { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return new Response(JSON.stringify({ message: "Error fetching profile" }), { status: 500 });
  }
}
