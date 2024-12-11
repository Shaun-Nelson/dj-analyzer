import { NextResponse, NextRequest } from "next/server";
import { getSpotifyAccessToken } from "./lib/spotify/spotifyAccessToken";

// Routes where middleware should be applied
export const config = {
  matcher: ["/:path*"], // Paths to protect
};

export async function middleware(request: NextRequest) {
  if (!request.cookies.has("accessToken")) {
    try {
      const accessToken = await getSpotifyAccessToken();
      const response = new NextResponse();

      response.cookies.set("accessToken", accessToken.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: accessToken.expires_in,
      });

      return response;
    } catch (error) {
      return new NextResponse(
        error instanceof Error ? error.message : "An unknown error occured",
        {
          status: 500,
        }
      );
    }
  }

  return NextResponse.next();
}
