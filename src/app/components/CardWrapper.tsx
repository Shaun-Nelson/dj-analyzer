import TrackCard from "@/app/components/TrackCard";
import { searchSpotify } from "@/lib/spotify/searchSpotify";
import { SearchCategory } from "@/types/types";

interface CardWrapperProps {
  search: string;
  category: SearchCategory;
}

const CardWrapper = async ({ search, category }: CardWrapperProps) => {
  const response = await searchSpotify(search, category);

  if (category === SearchCategory.TRACK && response.tracks?.items) {
    return (
      <div className='track-list'>
        {response.tracks.items.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    );
  }

  if (category === SearchCategory.ARTIST && response.artists?.items) {
    return (
      <div className='artist-list'>
        {response.artists.items.map((artist) => (
          <div key={artist.id} className='artist-card'>
            <p>{artist.name}</p>
          </div>
        ))}
      </div>
    );
  }

  if (category === SearchCategory.ALBUM && response.albums?.items) {
    return (
      <div className='album-list'>
        {response.albums.items.map((album) => (
          <div key={album.id} className='album-card'>
            <p>{album.name}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='text-neutral-800 dark:text-neutral-300'>
      No results found
    </div>
  );
};

export default CardWrapper;
