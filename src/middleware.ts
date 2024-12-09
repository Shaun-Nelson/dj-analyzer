import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSpotifyAccessToken } from "./lib/spotify/spotifyAccessToken";

// Define routes where middleware should be applied
export const config = {
  matcher: ["/:path*"], // Add paths to protect
};

export async function middleware(req: NextRequest) {
  if (!req.cookies.get("accessToken")) {
    // If the access token is missing, redirect or fetch it
    const response = NextResponse.redirect(new URL(req.url));
    const accessToken = await getSpotifyAccessToken();

    response.cookies.set("accessToken", accessToken.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: accessToken.expires_in,
    });

    return response;
  }

  return NextResponse.next();
}
