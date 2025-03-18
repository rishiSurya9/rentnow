import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("access_token");

    const protectedRoutes = ["/Profile", "/Search"];

    if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL("/signup", req.url)); 
    }

    return NextResponse.next(); 
}