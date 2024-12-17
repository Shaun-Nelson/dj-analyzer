"use client";

import { useState } from "react";
import { SearchCategory } from "@/types/types";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { searchSchema } from "@/lib/zod/schemas";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<SearchCategory>(
    SearchCategory.TRACK
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (query: string, category: SearchCategory): void => {
    setLoading(true);

    const res = searchSchema.safeParse({
      search: query,
    });

    if (!res.success) {
      setError(res.error.errors[0].message);
      setLoading(false);
      return;
    }

    setError(null);
    setLoading(false);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (query) {
      params.set("search", query);
      params.set("category", category);
    } else {
      params.delete("search");
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      className='w-full flex flex-col items-center justify-center'
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(search, searchCategory);
      }}
    >
      <div className='flex w-4/5'>
        <input
          className='peer border-[1px] border-r-0 rounded-lg rounded-r-none shadow-inner p-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-800'
          type='text'
          placeholder={error ? error : "Search songs by..."}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button
          className='peer-focus:scale-110 bg-gray-500 rounded-r-lg p-2 text-gray-200 shadow active:shadow-inner hover:bg-gray-700'
          type='submit'
          disabled={loading}
        >
          <CiSearch className='active:scale-75' size={32} />
        </button>
      </div>
      <div className='flex w-5/6 justify-around mt-8'>
        <div>
          <input
            className='mr-1'
            type='radio'
            id='track'
            name='category'
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
            name='category'
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
            id='album'
            name='category'
            value='album'
            onChange={(e) =>
              setSearchCategory(e.target.value as SearchCategory)
            }
          />
          <label
            className='text-neutral-500 dark:text-neutral-400'
            htmlFor='album'
          >
            Album
          </label>
        </div>
      </div>
    </form>
  );
};

export default Search;
