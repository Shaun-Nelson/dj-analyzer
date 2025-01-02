"use server";

import { SPOTIFY_ACCESS_TOKEN } from "@/config/config";
import { SpotifyTrack } from "@/types/types";
import { cookies } from "next/headers";

export const getTrack = async (trackId: string): Promise<SpotifyTrack> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get(SPOTIFY_ACCESS_TOKEN);

  const response = await fetch(
    `${process.env.SPOTIFY_GET_TRACK_URL}/${trackId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
    }
  );

  const data = await response.json();

  return data;
};
