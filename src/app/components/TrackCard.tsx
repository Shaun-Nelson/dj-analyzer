"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "@/context";
import { SpotifyTrack } from "@/types/types";
import { FaSpotify } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";

const TrackCard = ({ track }: { track: SpotifyTrack }) => {
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const { setTracksList } = useAppContext()!;
  const duration = new Date(track.duration_ms);
  const minutes = duration.getUTCMinutes();
  const seconds = duration.getUTCSeconds().toFixed(0).padStart(2, "0");

  const handleAddTrack = () => {
    setTracksList((previousTracks) => [...previousTracks, track]);
    setIsAdded(true);
  };

  const handleRemoveTrack = () => {
    setTracksList((previousTracks) =>
      previousTracks.filter((previousTrack) => previousTrack.id !== track.id)
    );
    setIsAdded(false);
  };

  return (
    <div
      className={`w-10/12 py-4 pl-6 pr-1.5 border border-gray-800 dark:border-gray-500 rounded-lg shadow-md mt-2 bg-neutral-50 dark:bg-neutral-600 ${
        isAdded &&
        "transition-colors ease-linear bg-green-100 dark:bg-green-800 duration-200"
      }`}
    >
      <div className='flex justify-between items-center'>
        <Image
          className='w-16 h-16 rounded-full hover:scale-150 hover:shadow-2xl hover:rounded-md transition-transform'
          src={track.album.images[0].url}
          alt='Album cover'
          width={64}
          height={64}
        />
        <div className='px-6'>
          <p className='text-neutral-600 dark:text-neutral-200'>{track.name}</p>
          <p className='text-neutral-500 dark:text-neutral-300'>
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
          <p className='text-neutral-500 dark:text-neutral-400'>
            {track.album.name}
          </p>
          <p className='text-neutral-500 dark:text-neutral-400'>
            {`${minutes}:${seconds}`}
          </p>
        </div>
        <div className='flex flex-col gap-12'>
          {!isAdded ? (
            <IoMdAddCircleOutline
              className='text-neutral-500 dark:text-neutral-200 cursor-pointer'
              size={32}
              onClick={handleAddTrack}
            />
          ) : (
            <IoMdRemoveCircleOutline
              className='text-neutral-500 dark:text-neutral-200 cursor-pointer'
              size={32}
              onClick={handleRemoveTrack}
            />
          )}
          <Link
            className='text-neutral-500 dark:text-neutral-400 cursor-pointer'
            href={track.uri}
            rel='noreferrer'
          >
            <div className='w-fit flex'>
              <FaSpotify className='text-green-400' size={32} />
              <BiLinkExternal size={16} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
