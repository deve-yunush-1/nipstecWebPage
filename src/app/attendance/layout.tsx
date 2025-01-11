/** @format */
"use client";
import {TeacherStudentAllocation} from "@/components/component/AllocatedStudentByTeacher";
import {LoginForm} from "@/components/component/LoggedInForm";
import {Sidebar} from "@/components/component/Sidebar";
import {getRoleFromToken} from "@/service/verification/getRoleFromToken";
import {useState} from "react";
import {useRouter} from "next/navigation";

interface FormData {
  studentName: string;
  course: string;
  time: string;
  day: string;
  employee: string | null;
  employeeId: number;
  courseId: number;
}

export default function Page({children}: {children: any}) {
  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    course: "",
    time: "",
    day: "",
    employee: "",
    courseId: 0,
    employeeId: 0,
  });

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
    if (role === "Teacher" || role === "Administrator") {
      router.push("/attendance");
    } else {
      router.push("/");
    }
    setVisible(true); // Set visibility to true after login
  };

  return (
    <>
      <div className="w-full flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-[280px] hidden lg:block flex-shrink-0 overflow-y-auto bg-gray-100 border-r">
          <Sidebar />
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
              <div className=" mt-[80px] overflow-y-auto h-full">
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

export function getGreeting(): string {
  const currentHour = new Date().getHours(); // Get the current hour (0-23)

  if (currentHour >= 5 && currentHour < 12) {
    return "Good Morning! Have a good day";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good Afternoon! Have a good day";
  } else if (currentHour >= 18 && currentHour < 22) {
    return "Good Evening! Have a good day";
  } else {
    return "Good Night! Sweet dreams";
  }
}
