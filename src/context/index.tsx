"use client";

import { createContext, useContext, useState } from "react";
import { SpotifyTrack } from "@/types/types";

interface AppContextType {
  tracksList: SpotifyTrack[];
  setTracksList: React.Dispatch<React.SetStateAction<SpotifyTrack[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [tracksList, setTracksList] = useState<SpotifyTrack[]>([]);

  return (
    <AppContext.Provider value={{ tracksList, setTracksList }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
