/** @format */

import {GlobeAltIcon} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function NipstecLogo() {
  return (
    <div className="flex flex-row items-center leading-none text-white">
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      {/*<p className="text-[44px]">Nipstec</p>>*/}
      <Image
        src="https://www.nipstec.com/nipstec-logo.webp"
        alt="NIPSTec."
        className="w-[200px] h-[70px]"
        width={100}
        height={100}
      />
    </div>
  );
}
