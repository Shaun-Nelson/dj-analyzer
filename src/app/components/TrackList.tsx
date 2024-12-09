import TrackCard from "@/app/components/TrackCard";
import { cookies } from "next/headers";
import { searchTracks } from "@/lib/spotify/searchTracks";
import { SpotifyTracksResponse } from "@/types/dto/spotifyTracksResponse";
import { SearchCategory } from "@/types/types";

interface TrackListProps {
  search: string;
  category: SearchCategory;
}

const TrackList = async ({ search, category }: TrackListProps) => {
  const cookiesStore = await cookies();

  if (!cookiesStore.get("accessToken")) {
    const response = await fetch(`${process.env.URL}/api`, {
      method: "GET",
      credentials: "include", // Include cookies in the request
    });
  }

  const tracks: SpotifyTracksResponse = await searchTracks(search, category);

  console.log("TRACKS", tracks);

  return (
    <div>
      {tracks.tracks?.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </div>
  );
};

export default TrackList;
