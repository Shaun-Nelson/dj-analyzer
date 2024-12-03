"use client";

import { useState, FormEvent } from "react";
import { searchSchema } from "@/lib/schemas";
import spotifyAuth from "@/lib/spotifyAuth";

//Types
import { SpotifyAuthDTO } from "@/types/dto/SpotifyAuthDTO";

//Icons
import { CiSearch } from "react-icons/ci";
import { ImSpinner2 } from "react-icons/im";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const res = searchSchema.safeParse({
      search: search,
    });

    if (!res.success) {
      setError(res.error.errors[0].message);
      setIsLoading(false);
      return;
    }

    spotifyAuth().then((data: SpotifyAuthDTO) => {
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("expiresIn", data.expires_in.toString());
    });

    setIsLoading(false);
  };

  return (
    <form
      className='flex justify-center items-center'
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        className='peer border-2 border-r-0 rounded-lg rounded-r-none shadow-inner p-3 w-2/3'
        type='text'
        placeholder={error ? "Please search here" : "Search track..."}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className='bg-gray-500 rounded-r-lg p-2 text-gray-200 border-2 border-transparent shadow active:shadow-inner hover:bg-gray-700 peer-focus:bg-gray-300'
        type='submit'
        disabled={isLoading}
      >
        {isLoading ? (
          <ImSpinner2 size={32} />
        ) : (
          <CiSearch className='hover:scale-125 active:scale-75' size={32} />
        )}
      </button>
    </form>
  );
};

export default Search;
