/** @format */
"use client";
import {CapitalizeFirstLetter} from "@/components/ui/CapitaliseText";
import {getAllocatedByTeacherAndCurrentMonth} from "@/service/getAllocatedStudentByTeacherAndCurrentMonth";
import {getEmployeeByTeacher} from "@/service/getEmployeeByTeacher";
import {useEffect, useState} from "react";

interface FormData {
  course: string | null;
  duration: number;
  courseId: string | null;
  userId: string | null;
  day: string[] | null;
  time: string | null;
  name: string | null;
  date: string | null;
  employeeId: string | null;
  employee: string | null;
}

interface Allocation {
  id: string; // Unique identifier for each allocation
  studentName: string;
  course: string;
  courseId: any;
  time: string;
  day: string;
  duration: number;
  userId: any;
}

export default function Page() {
  const [employees, setEmployees] = useState([]);
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [formData, setFormData] = useState<FormData>({
    userId: "",
    course: "",
    courseId: "",
    employeeId: "",
    employee: "",
    day: [],
    time: "",
    duration: 0, // Course duration dynamically set
    name: "",
    date: new Date().toISOString().slice(0, 10),
  });
  useEffect(() => {
    // Your code here
    getEmployeeByTeacher().then((value) => {
      const teacherOption = value.map((item: any) => ({
        value: item.id,
        label: item.firstname + " " + item.lastname,
      }));

      setEmployees(teacherOption);
    });
  }, []);

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      employee: e.target.value || "",
      employeeId: e.target.value,
    }));
    getAllocatedStudent(e.target.value);
  };

  const getAllocatedStudent = async (employeeId: string) => {
    getAllocatedByTeacherAndCurrentMonth(employeeId).then((res) => {
      const allocations: Allocation[] = res.map(
        (item: {
          id: number;
          user: {id: any; firstName: string; lastName: string};
          product: {id: any; title: string};
          time: string;
          dayOfWeek: string;
          duration: string;
        }) => ({
          id: item.id,
          studentName: `${item.user.firstName} ${item.user.lastName}`,
          course: item.product.title,
          courseId: item.product.id,
          time: item.time,
          day: item.dayOfWeek,
          duration: item.duration,
          userId: item.user.id,
        })
      );
      console.log(allocations);
      setAllocations(allocations);
    });
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-4">
          <SelectField
            id="course"
            label="Choose Teacher"
            value={formData.employeeId}
            options={employees}
            onChange={handleEmployeeChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border border-gray-300 p-4">
          {/* Header */}

          <div className="font-bold bg-gray-100 p-2 border-b border-gray-300">
            Student Name
          </div>
          <div className="font-bold bg-gray-100 p-2 border-b border-gray-300">
            Course
          </div>
          <div className="font-bold bg-gray-100 p-2 border-b border-gray-300">
            Time
          </div>
          <div className="font-bold bg-gray-100 p-2 border-b border-gray-300">
            Day
          </div>

          {/* Body */}
          {allocations.map((allocation) => (
            <>
              <div className="p-2 border-t border-gray-300">
                <CapitalizeFirstLetter text={allocation.studentName} />
              </div>
              <div className="p-2 border-t border-gray-300">
                {allocation.course}
              </div>
              <div className="p-2 border-t border-gray-300">
                {allocation.time}
              </div>
              <div className="p-2 border-t border-gray-300">
                {allocation.day}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: any;
  label: any;
  options: any;
  value: any;
  onChange: any;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt: {value: any; label: any; courseId: string}) => (
          <option
            key={`${opt.value}`}
            data-product-id={opt.courseId}
            value={`${opt.value}`}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
