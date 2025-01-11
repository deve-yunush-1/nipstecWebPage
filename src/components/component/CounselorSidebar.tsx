/** @format */

import Link from "next/link";
import {usePathname} from "next/navigation";

const dashboard = [
  {
    title: "Leave Request",
    link: "/dashboard/leave-request",
  },

  {
    title: "Allocated Student",
    link: "/dashboard/allocated-student",
  },
  {
    title: "Allocate Student",
    link: "/students?studentStatus=complete",
  },
];

export const CounselorSidebar = () => {
  const currentPath = usePathname(); // Get the current route

  return (
    <div className="sidebar fixed">
      <div className="sidebar__menu mt-10 p-3">
        <div className="grid">
          {dashboard.map((item, index) => (
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
