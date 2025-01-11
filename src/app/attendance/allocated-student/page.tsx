/** @format */

"use client";
import {CapitalizeFirstLetter} from "@/components/ui/CapitaliseText";
import {getAllocatedByCurrentMonth} from "@/service/getAllocatedByCurrentMonth";

import {useEffect, useState} from "react";

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

const weakDays = [
  {value: "monday", label: "Monday"},
  {value: "tuesday", label: "Tuesday"},
  {value: "wednesday", label: "Wednesday"},
  {value: "thursday", label: "Thursday"},
  {value: "friday", label: "Friday"},
  {value: "saturday", label: "Saturday"},
];

export default function Page() {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [dayOfWeek, setDayOfWeek] = useState(""); // Corrected variable name
  const [filteredAllocations, setFilteredAllocations] = useState<Allocation[]>(
    []
  );
  const [lengthOfDays, setLengthOfDays] = useState(5); // Corrected variable name

  const getAllStudnet = async () => {
    return await getAllocatedByCurrentMonth(30);
  };
  // Fetch data when the component mounts or lengthOfDays changes
  useEffect(() => {
    const handleScheduleStudent = async (): Promise<void> => {
      try {
        const value = await getAllStudnet();

        const allocations: Allocation[] = value.map(
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

        // Update allocations
        setAllocations(allocations);
        setFilteredAllocations(allocations);
      } catch (error) {
        console.error("Error scheduling students:", error);
      }
    };

    handleScheduleStudent();
  }, [lengthOfDays]); // Fetch data when `lengthOfDays` changes

  // Handle filter by selected weekday
  const handleOnChangeWeakDay = (e: {target: {value: string}}) => {
    const selectedDay = e.target.value;
    setDayOfWeek(selectedDay);

    // Filter allocations based on selected day
    const filtered = allocations.filter((allocation) =>
      allocation.day.toLowerCase().includes(selectedDay.toLowerCase())
    );

    setFilteredAllocations(filtered);
  };

  return (
    <>
      <div className="flex justify-between mx-10">
        <SelectField
          id={""}
          label={"Select Weak Day"}
          options={weakDays}
          value={dayOfWeek}
          onChange={handleOnChangeWeakDay}
        />
        {/* <div className="flex grid-cols-4 gap-2">
          <button
            onClick={() => setLengthOfDays(5)}
            className="bg-blue-500 hover:bg-blue-600 px-6 rounded-lg">
            5 Days
          </button>
          <button
            onClick={() => setLengthOfDays(10)}
            className="bg-blue-500 hover:bg-blue-600 px-6 rounded-lg">
            10 Days
          </button>
          <button
            onClick={() => setLengthOfDays(20)}
            className="bg-blue-500 hover:bg-blue-600 px-6 rounded-lg">
            20 Days
          </button>
          <button
            onClick={() => setLengthOfDays(30)}
            className="bg-blue-500 hover:bg-blue-600 px-6 rounded-lg">
            30 Days
          </button>
        </div> */}
      </div>

      <div className="px-10 py-5">
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
        </div>
        {/* Body */}
        {filteredAllocations.map((allocation) => (
          <div
            key={allocation.id}
            className="grid grid-cols-4 gap-4 p-2 border-t border-gray-300">
            <CapitalizeFirstLetter
              className={`bg-gray-100 p-2 border-b border-gray-300`}
              text={allocation.studentName}
            />
            <div className="bg-gray-100 p-2 border-b border-gray-300">
              {allocation.course}
            </div>
            <div className="bg-gray-100 p-2 border-b border-gray-300">
              {allocation.time}
            </div>
            <div className=" bg-gray-100 p-2 border-b border-gray-300">
              {allocation.day}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: any;
  options: any[];
  onChange: (value: any) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
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
}) => {
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
};
