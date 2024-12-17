import Link from "next/link";
import Search from "@/app/components/Search";
import CardsWrapper from "@/app/components/CardsWrapper";
import { Suspense } from "react";
import { PiSpinnerGap } from "react-icons/pi";
import { SearchCategory } from "@/types/types";

const Home = async (props: {
  searchParams?: Promise<{
    search?: string;
    category?: SearchCategory;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const category = searchParams?.category || SearchCategory.TRACK;

  return (
    <div className='container py-8'>
      <div className='flex flex-col justify-center items-center'>
        <Link href='/'>
          <h1 className='text-xl font-bold text-center text-neutral-600 dark:text-neutral-300'>
            DJ ANALYZER
          </h1>
        </Link>
        <hr className='w-1/3 border border-gray-800 mt-2' />
        <p className='w-3/4 text-center text-neutral-500 dark:text-neutral-400 mt-2 mb-12'>
          Get track information and audio analysis for DJs.
        </p>
        <Search />
        {search && category && (
          <Suspense
            fallback={
              <PiSpinnerGap
                className='animate-spin mt-28 text-neutral-700 dark:text-neutral-300'
                size={64}
              />
            }
          >
            <CardsWrapper search={search} category={category} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Home;
