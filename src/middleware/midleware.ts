/** @format */

import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function middleware(req: NextRequest) {
  const token = sessionStorage.getItem("token")!; // Replace with your auth mechanism
  const userRole = token ? getRoleFromToken(token) : null; // Mock function to extract role

  const path = req.nextUrl.pathname;

  // Allow access to non-restricted paths
  if (!path.startsWith("/attendance")) {
    return NextResponse.next();
  }

  // Restrict access to attendance paths
  if (userRole !== "Teacher") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

// Mock function to decode token and extract role
function getRoleFromToken(token: string): string {
  // Replace with real token decoding logic
  const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
  return decoded.role;
}

export const config = {
  matcher: ["/attendance/:path*"], // Apply middleware to attendance paths
};
