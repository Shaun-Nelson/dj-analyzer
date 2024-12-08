"use client";

import { useState, FormEvent } from "react";
import { searchSchema } from "@/lib/zod/schemas";
import searchTracks from "@/lib/spotify/searchTracks";

//Types
import { SearchCategory } from "@/types/types";

//Icons
import { CiSearch } from "react-icons/ci";
import { ImSpinner2 } from "react-icons/im";
import { set } from "zod";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<SearchCategory>(
    SearchCategory.TRACK
  );
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
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

    if (document.cookie.includes("accessToken")) {
      searchTracks(search, searchCategory).then((data) => {
        console.log(data);
      });
    } else {
      fetch("/api").then((res) => {
        if (res.ok) {
          searchTracks(search, searchCategory).then((data) => {
            console.log(data);
          });
        }
      });
    }

    setIsLoading(false);
  };

  return (
    <form
      className='flex flex-col justify-center items-center gap-8'
      onSubmit={(e) => handleSearch(e)}
    >
      <div className='flex w-4/5'>
        <input
          className='border-2 border-r-0 rounded-lg rounded-r-none shadow-inner p-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-800'
          type='text'
          placeholder={error ? "Please search here" : "Search tracks by..."}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className='bg-gray-500 rounded-r-lg p-2 text-gray-200 border-2 border-transparent shadow active:shadow-inner hover:bg-gray-700'
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? (
            <ImSpinner2 size={32} />
          ) : (
            <CiSearch className='active:scale-75' size={32} />
          )}
        </button>
      </div>
      <div className='flex w-5/6 justify-around'>
        <div>
          <input
            className='mr-1'
            type='radio'
            id='track'
            name='searchType'
            value='track'
            onChange={(e) =>
              setSearchCategory(e.target.value as SearchCategory)
            }
            defaultChecked
          />
          <label
            className='text-neutral-500 dark:text-neutral-400'
            htmlFor='track'
          >
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
            onChange={(e) =>
              setSearchCategory(e.target.value as SearchCategory)
            }
          />
          <label
            className='text-neutral-500 dark:text-neutral-400'
            htmlFor='artist'
          >
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
            onChange={(e) =>
              setSearchCategory(e.target.value as SearchCategory)
            }
          />
          <label
            className='text-neutral-500 dark:text-neutral-400'
            htmlFor='genre'
          >
            Genre
          </label>
        </div>
      </div>
    </form>
  );
};

export default Search;
