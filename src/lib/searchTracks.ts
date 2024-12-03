const searchTracks = async (query: string, type: string) => {
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=${type}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  return await res.json();
};

export default searchTracks;
