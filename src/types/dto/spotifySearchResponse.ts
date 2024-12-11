import { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from "@/types/types";

export type SpotifySearchResponse = {
  tracks?: {
    href: string;
    items: SpotifyTrack[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
  artists?: {
    href: string;
    items: SpotifyArtist[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
  albums?: {
    href: string;
    items: SpotifyAlbum[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
};
