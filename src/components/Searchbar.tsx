"use client";

import { useState, FormEvent } from "react";
import { searchSchema } from "@/lib/schemas";

//Icons
import { CiSearch } from "react-icons/ci";
import { ImSpinner2 } from "react-icons/im";

const Searchbar = () => {
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

    console.log(res.data.search);
    setIsLoading(false);
  };

  return (
    <>
      <form
        className='flex justify-center items-center'
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          className='border-2 rounded-lg rounded-r-none shadow-inner p-3'
          type='text'
          placeholder={error ? "Please search here" : "Search track..."}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className='bg-gray-500 rounded-r-lg p-2 text-gray-200 border border-transparent shadow active:shadow-inner hover:bg-gray-700'
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
    </>
  );
};

export default Searchbar;
