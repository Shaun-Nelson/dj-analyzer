import { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from "@/types/types";

export type SpotifySearchResponse = {
  tracks?: {
    items: SpotifyTrack[];
  };
  artists?: {
    items: SpotifyArtist[];
  };
  albums?: {
    items: SpotifyAlbum[];
  };
};
