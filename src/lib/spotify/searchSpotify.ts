"use server";

import { cookies } from "next/headers";
import { SearchCategory } from "@/types/types";
import { SpotifySearchResponse } from "@/types/dto/spotifySearchResponse";
import {
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_LIMIT,
  SPOTIFY_OFFSET,
} from "@/config/config";

export const searchSpotify = async (
  query: string,
  category: SearchCategory,
  offset = SPOTIFY_OFFSET
): Promise<SpotifySearchResponse> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get(SPOTIFY_ACCESS_TOKEN);

  const url = `${process.env.SPOTIFY_SEARCH_URL}?q=${encodeURIComponent(
    query
  )}&type=${category}&limit=${SPOTIFY_LIMIT}&offset=${offset}`;
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
