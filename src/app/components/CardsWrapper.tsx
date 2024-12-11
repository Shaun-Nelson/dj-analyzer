import TrackCard from "@/app/components/TrackCard";
import { Suspense } from "react";
import { searchSpotify } from "@/lib/spotify/searchSpotify";
import { SearchCategory } from "@/types/types";
import { SpotifySearchResponse } from "@/types/dto/spotifySearchResponse";
import Pagination from "./Pagination";

interface CardWrapperProps {
  search: string;
  category: SearchCategory;
}

const CardsWrapper = async ({ search, category }: CardWrapperProps) => {
  try {
    const response = await searchSpotify(search, category);
    if (category === SearchCategory.TRACK && response.tracks?.items) {
      return (
        <>
          <Pagination totalPages={response.tracks?.total} />
          <div className='flex flex-col justify-center items-center gap-4'>
            {response.tracks.items.map((track) => (
              <>
                <Suspense key={track.id} fallback={<div>Loading...</div>}>
                  <TrackCard key={track.id} track={track} />
                </Suspense>
              </>
            ))}
          </div>
          <Pagination totalPages={response.tracks?.total} />
        </>
      );
    }

    if (category === SearchCategory.ARTIST && response.artists?.items) {
      return (
        <div className='artist-list'>
          {response.artists.items.map((artist) => (
            <Suspense key={artist.id} fallback={<div>Loading...</div>}>
              <div key={artist.id} className='artist-card'>
                <p>{artist.name}</p>
              </div>
            </Suspense>
          ))}
        </div>
      );
    }

    if (category === SearchCategory.ALBUM && response.albums?.items) {
      return (
        <div className='album-list'>
          {response.albums.items.map((album) => (
            <Suspense key={album.id} fallback={<div>Loading...</div>}>
              <div key={album.id} className='album-card'>
                <p>{album.name}</p>
              </div>
            </Suspense>
          ))}
        </div>
      );
    }

    return (
      <div className='text-neutral-800 dark:text-neutral-300'>
        No results found
      </div>
    );
  } catch (error) {
    return (
      <div className='text-neutral-800 dark:text-neutral-300'>
        {error instanceof Error ? error.message : "An unknown error occurred"}
      </div>
    );
  }
};

export default CardsWrapper;
