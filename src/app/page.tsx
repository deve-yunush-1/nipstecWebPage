/** @format */

"use client";

import React, {useContext, useEffect, useState} from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import Image from "next/image";
import {useWebSocket} from "@/hooks/useWebSocket";
import {notification_url} from "@/modal/db_url";

// Mock data for labels and carousel images
const LabelList = [
  {
    title: "Allocate Holiday list",
    link: "/holiday",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width="50"
        height="50">
        <rect
          x="10"
          y="10"
          width="180"
          height="180"
          rx="15"
          fill="#f3f4f6"
          stroke="#d1d5db"
          stroke-width="2"
        />

        <rect x="10" y="10" width="180" height="40" rx="10" fill="#3b82f6" />
        <text
          x="100"
          y="35"
          fill="#fff"
          font-size="16"
          font-family="Arial, sans-serif"
          text-anchor="middle">
          Holiday Planner
        </text>

        <g fill="#e5e7eb" stroke="#d1d5db" stroke-width="1">
          <rect x="20" y="60" width="10" height="10" />
          <rect x="70" y="60" width="10" height="10" />
          <rect x="120" y="60" width="10" height="10" />
          <rect x="20" y="110" width="10" height="10" />
          <rect x="70" y="110" width="10" height="10" />
          <rect x="120" y="110" width="10" height="10" />
        </g>

        <rect x="70" y="110" width="40" height="40" fill="#10b981" />
        <text
          x="90"
          y="135"
          fill="#fff"
          font-size="14"
          font-family="Arial, sans-serif"
          text-anchor="middle">
          HOL
        </text>

        <path
          d="M 160 70 L 180 90 L 160 110"
          fill="none"
          stroke="#6b7280"
          stroke-width="2"
          marker-end="url(#arrowhead)"
        />

        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
          </marker>
        </defs>

        <text
          x="160"
          y="130"
          fill="#6b7280"
          font-size="12"
          font-family="Arial, sans-serif"
          text-anchor="middle">
          Allocate
        </text>
      </svg>
    ),
  },
  {
    title: "Students",
    link: "/students?studentStatus=complete",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-12 h-12 mx-auto text-blue-600">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9M9 16.5l-2.25-2.25m0 0L9 12m-2.25 2.25H6.75A1.5 1.5 0 005.25 15v1.5M18 16.5l2.25-2.25m0 0L18 12m2.25 2.25H17.25A1.5 1.5 0 0015.75 15v1.5"
        />
      </svg>
    ),
  },
  {
    title: "Courses",
    link: "/courses?category=computer",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-12 h-12 mx-auto text-green-600">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8.25c1.242 0 2.25-1.008 2.25-2.25S13.242 3.75 12 3.75 9.75 4.758 9.75 6 10.758 8.25 12 8.25z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 6H3.75v14.25h16.5V6h-6m-3 0v4.5m-3 0v4.5m6-4.5v4.5"
        />
      </svg>
    ),
  },
  {
    title: "Attendance",
    link: "/attendance",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-12 h-12 mx-auto text-purple-600">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 6h-15a.75.75 0 00-.75.75v13.5c0 .414.336.75.75.75h15a.75.75 0 00.75-.75V6.75A.75.75 0 0019.5 6zM4.5 4.5V6m15-1.5V6M6.75 10.5h10.5"
        />
      </svg>
    ),
  },
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-12 h-12 mx-auto text-purple-600">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 6h-15a.75.75 0 00-.75.75v13.5c0 .414.336.75.75.75h15a.75.75 0 00.75-.75V6.75A.75.75 0 0019.5 6zM4.5 4.5V6m15-1.5V6M6.75 10.5h10.5"
        />
      </svg>
    ),
  },
  {
    title: "Class allocation",
    link: "/dashboard/allocated-student",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-12 h-12 mx-auto text-red-600">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    ),
  },
];

const imageList = ["/main_view.webp"];

// Carousel component
function Carousel({images}: {images: string[]}) {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform h-50 duration-500 ease-in-out">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            width={1000}
            height={1000}
            loading="lazy"
            placeholder="blur"
            blurDataURL="https://placehold.co/400"
            alt={`Slide ${index + 1}`}
            className="w-full h-50 object-cover"
          />
        ))}
      </div>
    </div>
  );
}

// Card component
function DashboardCard({
  title,
  icon,
  link,
}: {
  title: string;
  icon: React.ReactNode;
  link: string;
}) {
  return (
    <Link href={link}>
      <div className="flex flex-col justify-center items-center w-full h-43 bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl hover:scale-105 transition-transform duration-200">
        {icon}
        <span className="mt-4 text-lg font-semibold text-gray-700">
          {title}
        </span>
      </div>
    </Link>
  );
}

export default function Page() {
  const [isPermissionGranted, setPermissionGranted] = useState(false);
  const [url, setUrl] = useState(notification_url());

  const notifications = useWebSocket(
    `${notification_url()}/ws`,
    "/topic/notifications"
  );

  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setPermissionGranted(true);
        } else {
          setPermissionGranted(false);
          alert("Notification permission denied!");
        }
      });
    } else {
      setPermissionGranted(false);
      alert("Browser does not support notifications.");
    }
  };

  // Trigger a notification
  const sendNotification = () => {
    if (isPermissionGranted) {
      notifications.map((item, index) => {
        new Notification("New user added!", {
          body: item.message,
          badge: "/nipstec-logo.webp",
          icon: "/nipstec-logo.webp", // Replace with your image path
        });
      });
    } else {
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }
    }
  };

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_NOTIFICATION_URL as string;
    if (apiUrl === "undefined") {
      setUrl(notification_url());
    } else {
      setUrl(apiUrl);
    }
    requestNotificationPermission();
  }, []);

  return (
    <>
      <header className="">
        <Navbar />
      </header>

      <main className="mt-[70px] bg-gray-100 min-h-screen">
        <section className="">
          <Carousel images={imageList} />
        </section>

        <section className="h-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LabelList.map((label, index) => (
            <DashboardCard
              key={index}
              title={label.title}
              icon={label.icon}
              link={label.link}
            />
          ))}
        </section>
      </main>
    </>
  );
}
