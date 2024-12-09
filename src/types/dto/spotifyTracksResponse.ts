import { SpotifyTrack } from "@/types/types";

export interface SpotifyTracksResponse {
  href: string;
  items: SpotifyTrack[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}
