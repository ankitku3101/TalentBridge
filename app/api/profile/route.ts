import { getServerSession } from "next-auth";
import Student from "@/models/Student";
import dbConnect from "@/lib/mongodb";
import { authOptions } from "@/lib/authOptions";

// API Route to fetch the student profile
export async function GET(request: Request) {
  try {
    // Fetch session to verify the user's identity and role
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    // const userRole = session?.user?.role;

    if (!session || !userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

  
    await dbConnect();

    // Fetch the student data from the database using the userId
    const student = await Student.findById(userId);

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
