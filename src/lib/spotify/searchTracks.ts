"use server";

import { cookies } from "next/headers";

//Types
import { SearchCategory } from "@/types/types";

const searchTracks = async (query: string, category: SearchCategory) => {
  const cookiesStore = await cookies();

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=${category}&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${cookiesStore.get("accessToken")?.value}`,
      },
    }
  );

  console.log(res);

  return await res.json();
};

export default searchTracks;
