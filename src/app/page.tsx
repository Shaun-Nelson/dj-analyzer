// import searchTracks from "@/lib/searchTracks";

//Components
import Search from "@/app/components/Search";

const Home = () => {
  return (
    <div className='container pt-8'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-xl font-bold text-center text-neutral-300'>
          DJ ANALYZER
        </h1>
        <hr className='w-1/3 border border-gray-800 mt-2' />
        <p className='w-3/4 text-center dark:text-neutral-400 mt-2 mb-12'>
          Get track information and audio analysis for DJs.
        </p>
      </div>
      <Search />
    </div>
  );
};

export default Home;
