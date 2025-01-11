/** @format */
"use client";
import {LoginForm} from "@/components/component/LoggedInForm";
import {getRoleFromToken} from "@/service/verification/getRoleFromToken";
import {getGreeting} from "../attendance/layout";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {CounselorSidebar} from "@/components/component/CounselorSidebar";
import {usePathname} from "next/navigation";
interface FormData {
  studentName: string;
  course: string;
  time: string;
  day: string;
  employee: string | null;
  employeeId: number;
  courseId: number;
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    course: "",
    time: "",
    day: "",
    employee: "",
    courseId: 0,
    employeeId: 0,
  });

  let pathname = usePathname();

  const [isVisible, setVisible] = useState(false);
  const router = useRouter();
  const handleLogin = (
    message: any,
    object: {employeeId: any; firstname: any; lastname: any},
    token: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      employeeId: object.employeeId,
      employee: object.firstname + " " + object.lastname || "",
    }));
    // Save the token to sessionStorage or perform any other necessary actions
    let role = getRoleFromToken(token);
    if (role === "Counsellor" || role === "Administrator") {
      router.push(pathname!);
    } else {
      router.push("/");
    }
    setVisible(true); // Set visibility to true after login
  };
  return (
    <>
      <div className="max-w-screen w-full flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-[250px] hidden lg:block flex-shrink-0 overflow-y-auto bg-gray-100 border-r">
          <CounselorSidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {isVisible ? (
            // Show content only if the user is logged in
            <>
              {/* Header Section */}
              <div className="w-full px-3 py-5 grid grid-cols-2 fixed bg-gray-100 border-b border-gray-300 items-center z-10">
                {/* Greeting Section */}
                <div className="text-blue-500 font-bold text-xl truncate">
                  {getGreeting()}
                </div>

                {/* Teacher Name Section */}
                <div className="text-blue-500 mr-80 font-bold text-xl truncate text-right">
                  Teacher name: {formData.employee}
                </div>
              </div>

              {/* Main Content */}
              <div className="  mt-[80px] overflow-y-auto h-full">
                {children}
              </div>
            </>
          ) : (
            // Show login form if not logged in
            <div className=" bg-gray-10">
              <LoginForm onLogin={handleLogin} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
