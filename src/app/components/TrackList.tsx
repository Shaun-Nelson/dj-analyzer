import TrackCard from "@/app/components/TrackCard";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { searchTracks } from "@/lib/spotify/searchTracks";
import { SpotifyTracksResponse } from "@/types/dto/spotifyTracksResponse";
import { SearchCategory } from "@/types/types";

interface TrackListProps {
  search: string;
  category: SearchCategory;
}

const TrackList = async ({ search, category }: TrackListProps) => {
  const tracks: SpotifyTracksResponse = await searchTracks(search, category);

  console.log("TRACKS", tracks);

  return (
    <div>
      {tracks.items?.map((track) => (
        <Suspense fallback={<div>Loading...</div>} key={track.id}>
          <TrackCard key={track.id} track={track} />
        </Suspense>
      ))}
    </div>
  );
};

export default TrackList;
