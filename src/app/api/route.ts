import { NextRequest, NextResponse } from "next/server";
import {
  setAccessTokenCookie,
  getSpotifyAccessToken,
} from "@/lib/spotify/getSpotifyAccessToken";
import { SpotifyAccessTokenDTO } from "@/types/dto/spotifyAccessTokenResponse";

export async function POST(req: NextRequest) {
  const accessToken: SpotifyAccessTokenDTO = await getSpotifyAccessToken();

  await setAccessTokenCookie(accessToken.access_token, accessToken.expires_in);

  return new NextResponse("Access token set");
}
