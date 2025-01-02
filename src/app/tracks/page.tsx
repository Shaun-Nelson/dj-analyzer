"use client";

import TrackCard from "../components/TrackCard";
import { SpotifyTrack } from "@/types/types";

const TracksPage = () => {
  const tracks = JSON.parse(
    localStorage.getItem("tracks") || "[]"
  ) as SpotifyTrack[];

  return (
    <div className='container py-12'>
      <div className='flex flex-col justify-center items-center'>
        {tracks?.length > 0 ? (
          tracks.map((track: SpotifyTrack) => (
            <TrackCard key={track.id} track={track} />
          ))
        ) : (
          <h1 className='text-xl font-bold text-center text-neutral-600 dark:text-neutral-300'>
            No tracks added yet
          </h1>
        )}
      </div>
    </div>
  );
};

export default TracksPage;
