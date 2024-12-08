import { SpotifyTrack } from "@/types/types";

export interface SpotifyTracksResponse extends Response {
  tracks: {
    href: string;
    items: SpotifyTrack[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
}
