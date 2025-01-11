/** @format */
"use client";
import {LoginForm} from "@/components/component/LoggedInForm";
import {getRoleFromToken} from "@/service/verification/getRoleFromToken";
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
                  {getGreeting(formData.employee! || "")}
                </div>

                {/* Teacher Name Section */}
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

function getGreeting(name: string): string {
  const currentHour = new Date().getHours(); // Get the current hour (0-23)

  if (currentHour >= 5 && currentHour < 12) {
    return `Good Morning  \t--${name}-- \t Have a good day`;
  } else if (currentHour >= 12 && currentHour < 18) {
    return `Good Afternoon --${name}-- Have a good day`;
  } else if (currentHour >= 18 && currentHour < 22) {
    return `Good Evening --${name}-- I hope you have a wonderful day`;
  } else {
    return `Good night --${name}-- Sleep well and sweet dreams!`;
  }
}
