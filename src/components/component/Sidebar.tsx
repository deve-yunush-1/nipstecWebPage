/** @format */

import Link from "next/link";
import {usePathname} from "next/navigation";

const teacherSiderItem = [
  {
    title: "Student Attendance",
    link: "/attendance/student-attendance",
  },

  {
    title: "Allocated Student",
    link: "/attendance/allocated-student",
  },
  {
    title: "Leave Request",
    link: "/attendance",
  },
];

export const Sidebar = () => {
  const currentPath = usePathname(); // Get the current route

  return (
    <div className="sidebar fixed">
      <div className="sidebar__menu mt-10 p-3">
        <div className="grid">
          {teacherSiderItem.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`m-2 py-2 px-4 text-xl duration-300 ${
                currentPath === item.link
                  ? "text-white bg-blue-500 rounded-full"
                  : "text-blue-500 hover:bg-blue-200 bg-blue-100 hover:rounded-full"
              }`}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
