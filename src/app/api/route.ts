import { NextRequest, NextResponse } from "next/server";
import {
  setAccessTokenCookie,
  getSpotifyAccessToken,
} from "@/lib/spotify/getSpotifyAccessToken";

export async function GET(req: NextRequest) {
  const accessToken = await getSpotifyAccessToken();

  await setAccessTokenCookie(accessToken.access_token, accessToken.expires_in);

  return new NextResponse("Access token cookie set.");
}
