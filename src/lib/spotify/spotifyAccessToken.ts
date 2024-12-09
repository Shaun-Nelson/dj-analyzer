"use server";

import { cookies } from "next/headers";
import { SpotifyAccessTokenDTO } from "@/types/dto/spotifyAccessTokenResponse";

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
  async (): Promise<SpotifyAccessTokenDTO> => {
    const res: Response = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
        }),
      }
    );

    const accessToken: SpotifyAccessTokenDTO = await res.json();

    return accessToken;
  };
