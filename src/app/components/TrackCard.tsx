import Image from "next/image";
import Link from "next/link";
import { SpotifyTrack } from "@/types/types";

const TrackCard = ({ track }: { track: SpotifyTrack }) => {
  return (
    <div className='flex flex-row justify-between items-center p-4 border border-gray-800 rounded-lg mt-2'>
      <div className='flex flex-row items-center'>
        <Image
          className='w-16 h-16 rounded-lg'
          src={track.album.images[0].url}
          alt='Album cover'
        />
        <div className='ml-4'>
          <p className='text-neutral-500 dark:text-neutral-400'>{track.name}</p>
          <p className='text-neutral-500 dark:text-neutral-400'>
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>
      <Link
        className='text-neutral-500 dark:text-neutral-400'
        href={track.external_urls.spotify}
        target='_blank'
        rel='noreferrer'
      >
        Open in Spotify
      </Link>
    </div>
  );
};

export default TrackCard;
