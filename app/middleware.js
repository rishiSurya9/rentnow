import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("access_token")?.value;

    const protectedRoutes = ["/Profile", "/Search"];

    if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL("/about", req.url)); 
    }

    return NextResponse.next(); 
}
