export enum SearchCategory {
  TRACK = "track",
  ARTIST = "artist",
  ALBUM = "album",
}

export type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

export type SpotifyAlbum = {
  album_type: string;
  artists: SpotifyArtist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

export type SpotifyArtist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type SpotifyImage = {
  height: number;
  url: string;
  width: number;
};

export type SpotifyAudioAnalysis = {
  bars: SpotifyTimeInterval[];
  beats: SpotifyTimeInterval[];
  sections: SpotifySection[];
  segments: SpotifySegment[];
  tatums: SpotifyTimeInterval[];
  track: SpotifyTrackAnalysis;
};

export type SpotifyTimeInterval = {
  start: number;
  duration: number;
  confidence: number;
};

export type SpotifySection = {
  start: number;
  duration: number;
  confidence: number;
  loudness: number;
  tempo: number;
  tempo_confidence: number;
  key: number;
  key_confidence: number;
  mode: number;
  mode_confidence: number;
  time_signature: number;
  time_signature_confidence: number;
};

export type SpotifySegment = {
  start: number;
  duration: number;
  confidence: number;
  loudness_start: number;
  loudness_max_time: number;
  loudness_max: number;
  loudness_end: number;
  pitches: number[];
  timbre: number[];
};

export type SpotifyTrackAnalysis = {
  num_samples: number;
  duration: number;
  sample_md5: string;
  offset_seconds: number;
  window_seconds: number;
  analysis_sample_rate: number;
  analysis_channels: number;
  end_of_fade_in: number;
  start_of_fade_out: number;
  loudness: number;
  tempo: number;
  tempo_confidence: number;
  time_signature: number;
  time_signature_confidence: number;
  key: number;
  key_confidence: number;
  mode: number;
  mode_confidence: number;
  codestring: string;
  code_version: number;
  echoprintstring: string;
  echoprint_version: number;
  synchstring: string;
  synch_version: number;
  rhythmstring: string;
  rhythm_version: number;
};

export type SpotifyAudioFeatures = {
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  type: string;
  id: string;
  uri: string;
  track_href: string;
  analysis_url: string;
  duration_ms: number;
  time_signature: number;
};
