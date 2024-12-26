import { getServerSession } from "next-auth";
import Student from "@/models/Student";
import dbConnect from "@/lib/mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// API Route to fetch the student profile
export async function GET(request: Request) {
  try {
    // Get the session using getServerSession instead of getSession
    const session = await getServerSession(authOptions); // Get session from NextAuth
    console.log(session);
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    // Connect to MongoDB
    await dbConnect();

    // Fetch the student data from the database
    const student = await Student.findById(session.user.id);
    
    if (!student) {
      return new Response(JSON.stringify({ message: "Student not found" }), { status: 404 });
    }

    // Return the student profile
    return new Response(JSON.stringify(student), { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return new Response(JSON.stringify({ message: "Error fetching profile" }), { status: 500 });
  }
}
