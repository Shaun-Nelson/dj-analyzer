import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { LuListMusic } from "react-icons/lu";

const MenuTabs = () => {
  return (
    <nav className='sticky top-0 flex justify-center items-center shadow border-b border-gray-200 dark:border-gray-700 backdrop-blur-lg z-10'>
      <ul
        className='flex flex-wrap -mb-px text-sm font-medium text-center text-gray-700 dark:text-gray-300'
        id='default-tab'
        role='tablist'
      >
        <li className='me-2'>
          <Link
            id='tab-search'
            href='/'
            className='inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group text-lg'
            role='tab'
          >
            <CiSearch
              className='me-2 cursor-pointer text-gray-500 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
              size={24}
            />
            Search
          </Link>
        </li>
        <li className='me-2'>
          <Link
            id='tab-tracks'
            href='/tracks'
            className='inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group text-lg'
            role='tab'
          >
            <LuListMusic
              className='me-2 cursor-pointer text-gray-500 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
              size={24}
            />
            My Tracks
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MenuTabs;
