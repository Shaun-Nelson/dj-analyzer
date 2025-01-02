"use server";

import { SPOTIFY_ACCESS_TOKEN } from "@/config/config";
import { SpotifyTrackAnalysis } from "@/types/types";
import { cookies } from "next/headers";

export const getTrackAnalysis = async (
  trackId: string
): Promise<SpotifyTrackAnalysis> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get(SPOTIFY_ACCESS_TOKEN);

  const response = await fetch(
    `${process.env.SPOTIFY_AUDIO_ANALYSIS_URL}/${trackId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
    }
  );

  const data = await response.json();

  return data;
};
