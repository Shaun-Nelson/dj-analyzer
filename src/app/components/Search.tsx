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
  const [searchType, setSearchType] = useState<string>("track");
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
      localStorage.setItem(
        "expireTime",
        (data.expires_in + Date.now()).toString()
      );
    });

    setIsLoading(false);
  };

  return (
    <form
      className='flex flex-col justify-center items-center gap-4'
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className='flex w-4/5'>
        <input
          className='peer border-2 border-r-0 rounded-lg rounded-r-none shadow-inner p-3 w-full'
          type='text'
          placeholder={error ? "Please search here" : "Search tracks..."}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className='bg-gray-500 rounded-r-lg p-2 text-gray-200 border-2 border-transparent shadow active:shadow-inner hover:bg-gray-700 dark:hover:bg-gray-300 peer-focus:bg-gray-300'
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? (
            <ImSpinner2 size={32} />
          ) : (
            <CiSearch className='hover:scale-125 active:scale-75' size={32} />
          )}
        </button>
      </div>
      <div className='flex w-2/3 justify-around'>
        <div>
          <input
            className='mr-1'
            type='radio'
            id='track'
            name='searchType'
            value='track'
            onChange={(e) => setSearchType(e.target.value)}
            defaultChecked
          />
          <label className='text-neutral-400' htmlFor='track'>
            Track
          </label>
        </div>
        <div>
          <input
            className='mr-1'
            type='radio'
            id='artist'
            name='searchType'
            value='artist'
            onChange={(e) => setSearchType(e.target.value)}
          />
          <label className='text-neutral-400' htmlFor='artist'>
            Artist
          </label>
        </div>
        <div>
          <input
            className='mr-1'
            type='radio'
            id='genre'
            name='searchType'
            value='genre'
            onChange={(e) => setSearchType(e.target.value)}
          />
          <label className='text-neutral-400' htmlFor='genre'>
            Genre
          </label>
        </div>
      </div>
    </form>
  );
};

export default Search;
