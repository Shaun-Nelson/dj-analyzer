import Image from "next/image";
import Link from "next/link";
import { SpotifyTrack } from "@/types/types";
import { FaSpotify } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";

const TrackCard = ({ track }: { track: SpotifyTrack }) => {
  return (
    <div className='w-10/12 flex flex-row justify-between items-center p-4 border border-gray-800 rounded-lg shadow-md mt-2'>
      <div className='flex justify-center items-center'>
        <Image
          className='w-16 h-16 rounded-full hover:scale-150 hover:shadow-2xl hover:rounded-md transition-transform'
          src={track.album.images[0].url}
          alt='Album cover'
          width={64}
          height={64}
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
        href={track.uri}
        rel='noreferrer'
      >
        <div className='w-fit flex'>
          <FaSpotify className='text-green-400' size={24} />
          <BiLinkExternal size={12} />
        </div>
      </Link>
    </div>
  );
};

export default TrackCard;
