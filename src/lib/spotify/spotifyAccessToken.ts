"use server";

import { cookies } from "next/headers";
import { SpotifyAccessTokenResponse } from "@/types/dto/spotifyAccessTokenResponse";

export const setAccessTokenCookie = async (
  accessToken: string,
  expiresIn: number
): Promise<void> => {
  const cookiesStore = await cookies();

  cookiesStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: expiresIn,
  });
};

export const getSpotifyAccessToken =
  async (): Promise<SpotifyAccessTokenResponse> => {
    const response: Response = await fetch(
      `${process.env.SPOTIFY_ACCESS_TOKEN_URL}`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch access token from Spotify");
    }

    const accessToken: SpotifyAccessTokenResponse = await response.json();

    return accessToken;
  };
