/** @format */
/** @format */
"use client";
import {TeacherStudentAllocation} from "@/components/component/AllocatedStudentByTeacher";
import {LoginForm} from "@/components/component/LoggedInForm";
import {useState} from "react";

interface FormData {
  studentName: string;
  course: string;
  time: string;
  day: string;
  employee: string | null;
  employeeId: number;
  courseId: number;
}
export default function Page() {
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

    // You can save the token in localStorage or perform other actions
    sessionStorage.setItem("token", token);
    setVisible(true);
  };
  return (
    <>
      <div className="flex grid-cols-2">
        <TeacherStudentAllocation />
      </div>
    </>
  );
}
