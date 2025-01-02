"use client";

import TrackCard from "@/app/components/TrackCard";
import { getTrack } from "@/lib/spotify/getTrack";
import { getTrackAnalysis } from "@/lib/spotify/getTrackAnalysis";
import { beatMatch } from "@/lib/spotify/beatMatch";
import { SpotifyTrack } from "@/types/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const TrackPage = () => {
  const [track, setTrack] = useState<SpotifyTrack>();
  const pathname = usePathname();
  const trackId = pathname.split("/")?.[2];

  useEffect(() => {
    getTrack(trackId).then((data) => setTrack(data));
    getTrackAnalysis(trackId).then((data) => console.log(data));
  }, [trackId]);

  return (
    <div className='container py-12'>
      <div className='flex flex-col justify-center items-center'>
        {track && <TrackCard track={track} />}
      </div>
    </div>
  );
};

export default TrackPage;
