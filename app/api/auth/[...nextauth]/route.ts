import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Student from "@/models/Student";
import Employer from "@/models/Employer";
import dbConnect from "@/lib/mongodb";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials: any) {
        try {
          const { username: email, password } = credentials;

          if (!email || !password) {
            throw new Error("Email and password are required");
          }

          await dbConnect();

          let user = await Student.findOne({ email }) || await Employer.findOne({ email });

          if (!user) {
            throw new Error("Invalid email or password");
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error("Invalid email or password");
          }

          return {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.company ? "employer" : "student",
          };
        } catch (error) {
          console.error("Authorization error:", error.message);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", 
  },
});

export { handler as GET, handler as POST };
