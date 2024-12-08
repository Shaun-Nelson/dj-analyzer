import { NextRequest, NextResponse } from "next/server";
import {
  setAccessTokenCookie,
  getSpotifyAccessToken,
} from "@/lib/spotify/getSpotifyAccessToken";

//Types
import { SpotifyAccessTokenDTO } from "@/types/dto/spotifyAccessToken";

export async function GET(req: NextRequest) {
  const accessToken: SpotifyAccessTokenDTO = await getSpotifyAccessToken();

  await setAccessTokenCookie(accessToken.access_token, accessToken.expires_in);

  return new NextResponse("Access token cookie set.");
}
