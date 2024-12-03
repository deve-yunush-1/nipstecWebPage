/** @format */

"use client";

import React, {useCallback, useEffect, useState} from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import Image from "next/image";
import {Notifications, useWebSocket} from "@/hooks/useWebSocket";

// Mock data for labels and carousel images
const LabelList = [
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
    link: "/",
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
    link: "/",
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
        <h3 className="mt-4 text-lg font-semibold text-gray-700">{title}</h3>
      </div>
    </Link>
  );
}

export default function Page() {
  const [isPermissionGranted, setPermissionGranted] = useState(false);

  const notifications = useWebSocket(
    `${process.env.NEXT_PUBLIC_NOTIFICATION_URL}/ws`,
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

        <section className="h-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <div>
        <h1>Next.js Notification Example</h1>
        <button
          onClick={sendNotification}
          className="bg-black"
          style={{padding: "10px", margin: "10px"}}>
          Show Notification
        </button>
        <ul>
          {notifications.map((item, index) => (
            <>
              <li key={index}>{item.message}</li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}
