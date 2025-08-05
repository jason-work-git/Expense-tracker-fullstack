import { type NextRequest, NextResponse } from "next/server";

interface TokenRequest {
    token: string;
}

export async function POST(req: NextRequest) {
    const body = await req.json() as TokenRequest;
    const { token } = body;

    if (!token) {
        return NextResponse.json({ message: "Token is required" }, { status: 400 });
    }

    const response = NextResponse.json({ message: "Token set successfully" });
    response.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 3600, // 1 hour
        sameSite: "strict",
    });

    return response;
}