import { CiSearch } from "react-icons/ci";

const Searchbar = () => {
  return (
    <div className='flex justify-center items-center'>
      <input
        className='border-2 rounded-lg rounded-r-none shadow-inner p-3'
        type='text'
        placeholder='Search track...'
      />
      <button className='bg-gray-500 rounded-r-lg p-2 text-gray-200 border-2 border-transparent shadow active:shadow-inner hover:bg-gray-700'>
        <CiSearch className='hover:scale-125 active:scale-75' size={32} />
      </button>
    </div>
  );
};

export default Searchbar;
