'use client';

import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle, FaBell, FaSearch, FaBars, FaSignOutAlt } from "react-icons/fa";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const StudentDashboard = () => {
  const router = useRouter();
  const [userFirstName, setUserFirstName] = useState<string | null>(null); // state to store first name
  const [loading, setLoading] = useState(true); // state to manage loading state

  useEffect(() => {
    const validateSession = async () => {
      const session = await getSession();
      if (!session || session?.user?.role !== "student") {
        router.push("/auth/signin");
      } else {
        // Log the session to inspect its structure
        console.log("Session Data:", session);
        
        // Safe access to firstName and check if it exists
        const firstName = session?.user?.name || null;  // Use `name` instead of `firstName` if needed
        setUserFirstName(firstName);
      }
      setLoading(false); // Set loading to false after session is checked
    };
    validateSession();
  }, [router]);

  // Sign out handler
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/auth/signin" });
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state until session is validated
  }

  return (
    <div className="flex flex-col min-h-screen p-0">
      {/* Dashboard Header */}
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <FaBars size={28} className="text-white cursor-pointer" />
          <h1 className="text-2xl font-bold text-white">
            {userFirstName ? `${userFirstName}'s Dashboard` : 'Student Dashboard'}
          </h1>
        </div>
        <div className="flex items-center bg-white text-black rounded-md p-2 max-w-sm mx-4">
          <FaSearch className="mr-2" />
          <input
            type="text"
            placeholder="Search jobs"
            className="outline-none w-full"
          />
        </div>
        <div className="flex items-center space-x-4">
          <FaUserCircle size={28} />
          <FaBell size={28} />
          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            <FaSignOutAlt className="mr-2" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Dashboard Body */}
      <main className="flex-1 bg-gray-100 p-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Card
            key={index}
            className="shadow-md rounded-lg hover:shadow-xl hover:shadow-blue-500 transition-all duration-300"
          >
            <CardHeader>
              <CardTitle>Job Title {index + 1}</CardTitle>
              <p className="text-gray-700 text-sm">Company Name</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                feugiat libero eget felis vulputate, at tincidunt ante scelerisque.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="text-gray-500 text-xs">Location: City, Country</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Apply
              </button>
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  );
};

export default StudentDashboard;
