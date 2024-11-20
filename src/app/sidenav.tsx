import Link from 'next/link';
import NavLinks from '@/app/dashboard/nav-links';
import NipstecLogo from '@/app/nipstec-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import React from "react";

export default function SideNav() {
  return (
      <div>
          <div className="flex w-full  flex-row  px-3 py-4 md:px-2">
              <Link
                  className="mb-2 flex w-[300px] h-35 items-end justify-start rounded-md  p-4 md:h-38"
                  href="/"
              >
                  <div className="w-32 text-white md:w-40">
                      <NipstecLogo/>
                  </div>
              </Link>

              <div className="flex  grow flex-col  justify-center space-y-4 md:flex-row md:space-x-2 md:space-y-2">
                  <NavLinks/>
                  <div className="hidden h-auto w-full grow rounded-md  md:block"></div>
                  <form>
                      <button
                          className="flex w-[150px] h-[48px] text-red-400 grow items-center bg-sky-10 justify-between gap-2 rounded-md  p-3 text-sm font-medium hover:bg-red-300 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
                          <PowerIcon className="w-6"/>
                          <div className="hidden md:block">Sign Out</div>
                      </button>
                  </form>
              </div>

          </div>
          <div className="h-[2px] bg-gray-100"></div>
      </div>
  );
}