import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "./lib/jwt";
import { wfetch } from "./lib/wfetch";
import { deleteCookie } from "cookies-next";

interface Response {
  verified: boolean;
}

export async function middleware(request: NextRequest) {
  // check if the user and accessToken cookies exist.
  let accessToken = request.cookies.get("accessToken");
  let user = request.cookies.get("user");

  // if (!user?.value && !accessToken?.value) {
  //   return NextResponse.redirect(new URL("/login", request.url))
  // }

  if (user?.value && accessToken?.value) {
    // the cookies exist. So get their value
    const result: Response = await wfetch(
      "http://localhost:3000/api/middleware",
      {
        method: "POST",
        body: JSON.stringify({
          user,
          accessToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (request.nextUrl.pathname.startsWith("/login")) {
      if (result.verified) {
        // redirect back to the home page
        return NextResponse.redirect(new URL("/", request.url));
      } else {
        // stay on login page and delete cookies
        return;
      }
    } else {
      if (result.verified) {
        return;
      } else {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }
  
}

export const config = {
  matcher: ["/login", "/"],
};
