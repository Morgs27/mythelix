import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { connectDB } from '@/app/_mongoDB/connect'

connectDB().then(() => console.log('Connected to MongoDB'));

export default withAuth(
    function middleware(req) {
        console.log(req.nextUrl.pathname)
        console.log(req.nextauth.token?.role);

        if (req.nextUrl.pathname.startsWith("/CreateUser") && req.nextauth.token?.role !== "Admin") {
            return NextResponse.rewrite(new URL("/Denied", req.url))
        }
    },
    {
    callbacks: {
        authorized: ({token}) => !!token,
    }
    }
)

export const config = {matcher: ["/CreateUser"]}