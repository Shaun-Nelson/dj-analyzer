"use server";

import { SpotifyRecommendationsResponse } from "@/types/dto/spotifyRecommendationsResponse";
import { SPOTIFY_ACCESS_TOKEN, SPOTIFY_LIMIT } from "@/config/config";
import { cookies } from "next/headers";

export const beatMatch = async (
  trackId: string,
  key: string,
  bpm: number,
  timeSignature: number
): Promise<SpotifyRecommendationsResponse> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get(SPOTIFY_ACCESS_TOKEN);
  const url = `${process.env.SPOTIFY_RECOMMENDATIONS_URL}?limit=${SPOTIFY_LIMIT}&seed_tracks=${trackId}&target_key=${key}&target_tempo=${bpm}&target_time_signature=${timeSignature}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data from Spotify");
  }

  return response.json();
};
