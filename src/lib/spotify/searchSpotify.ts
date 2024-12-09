"use server";

import { cookies } from "next/headers";
import { SearchCategory } from "@/types/types";
import { SpotifySearchResponse } from "@/types/dto/spotifySearchResponse";

export const searchSpotify = async (
  query: string,
  category: SearchCategory
): Promise<SpotifySearchResponse> => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken");

  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    query
  )}&type=${category}&limit=50`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data from Spotify");
  }

  return response.json(); // Dynamically returns a structure based on `category`
};
