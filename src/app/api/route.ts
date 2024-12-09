"use server";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  setAccessTokenCookie,
  getSpotifyAccessToken,
} from "@/lib/spotify/spotifyAccessToken";
import { SpotifyAccessTokenDTO } from "@/types/dto/spotifyAccessTokenResponse";

export const GET = async (req: NextRequest) => {
  const accessToken: SpotifyAccessTokenDTO = await getSpotifyAccessToken();

  await setAccessTokenCookie(accessToken.access_token, accessToken.expires_in);

  console.log("ACCESS TOKEN", accessToken);
  console.log("COOKIES from route handler", await cookies());

  return new NextResponse("Access token set.");
};
