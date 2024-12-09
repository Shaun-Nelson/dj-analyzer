"use server";

import { cookies } from "next/headers";

//Types
import { SearchCategory } from "@/types/types";
import { SpotifyTracksResponse } from "@/types/dto/spotifyTracksResponse";

export const searchTracks = async (
  query: string,
  category: SearchCategory
): Promise<SpotifyTracksResponse> => {
  const cookiesStore = await cookies();

  const res: Response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=${category}&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${cookiesStore.get("accessToken")?.value}`,
      },
    }
  );

  const spotifyTracks: SpotifyTracksResponse = await res.json();

  return spotifyTracks;
};
