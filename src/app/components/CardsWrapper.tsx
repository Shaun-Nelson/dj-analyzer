import TrackCard from "@/app/components/TrackCard";
import Pagination from "./Pagination";
import { Suspense } from "react";
import { searchSpotify } from "@/lib/spotify/searchSpotify";
import { SearchCategory } from "@/types/types";
import { SPOTIFY_LIMIT } from "@/config/config";

interface CardWrapperProps {
  search: string;
  category: SearchCategory;
  page?: number;
}

const CardsWrapper = async ({ search, category, page }: CardWrapperProps) => {
  try {
    const offset = page ? (page - 1) * 50 : 0;
    const response = await searchSpotify(search, category, offset);

    if (
      category === SearchCategory.TRACK &&
      response.tracks?.items &&
      response.tracks.items.length > 0
    ) {
      return (
        <>
          <Pagination
            totalPages={Math.ceil(response.tracks?.total / SPOTIFY_LIMIT)}
          />
          <div className='flex flex-col justify-center items-center gap-4'>
            {response.tracks.items.map((track) => (
              <TrackCard key={track.id} track={track} />
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
