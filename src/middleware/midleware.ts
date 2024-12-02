/** @format */

import {NextRequest, NextResponse} from "next/server";

export const MiddleWare = (req: NextRequest) => {
  console.log("Middle ware response");
  return NextResponse.next();
};
