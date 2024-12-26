import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      firstName: string | null | undefined;
      id: string; 
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null; 
    };
  }

  interface User {
    id: string; 
    name: string;
    email: string;
    role: string;
  }
}
