/** @format */

// /** @format */

// import Link from "next/link";
// import NavLinks from "@/app/nav-links";
// import NipstecLogo from "@/app/nipstec-logo";
// import {PowerIcon} from "@heroicons/react/24/outline";
// import React from "react";

// export default function Navbar() {
//   return (
//     <div>
//       <div className="flex w-full fixed flex-row  px-3 py-4 md:px-2">
//         <Link
//           className="mb-2 flex w-[300px] h-35 items-end justify-start rounded-md  p-4 md:h-38"
//           href="/">
//           <div className="w-32 text-white md:w-40">
//             <NipstecLogo />
//           </div>
//         </Link>

//         <div className="flex  grow flex-col  justify-center space-y-4 md:flex-row md:space-x-2 md:space-y-2">
//           <NavLinks />
//           <div className="hidden h-auto w-full grow rounded-md  md:block"></div>
//           <form>
//             <button className="flex w-[150px] h-[48px] text-red-400 grow items-center bg-sky-10 justify-between gap-2 rounded-md  p-3 text-sm font-medium hover:bg-red-300 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3">
//               <PowerIcon className="w-6" />
//               <div className="hidden md:block">Sign Out</div>
//             </button>
//           </form>
//         </div>
//       </div>
//       <div className="h-[2px] bg-gray-100"></div>
//     </div>
//   );
// }
/** @format */

import Link from "next/link";
import {PowerIcon} from "@heroicons/react/24/outline";
import React from "react";
import NavLinks from "./nav-links";
import NipstecLogo from "./nipstec-logo";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-32 md:w-40">
            {/* Replace with your Nipstec Logo */}
            <NipstecLogo />
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <NavLinks />
        </nav>

        {/* Sign-Out Button */}
        <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition">
          <PowerIcon className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
