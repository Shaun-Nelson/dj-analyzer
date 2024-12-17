import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { LuListMusic } from "react-icons/lu";

const MenuTabs = () => {
  return (
    <nav className='sticky top-0 flex justify-center items-center shadow border-b border-gray-200 dark:border-gray-700 backdrop-blur-lg z-10'>
      <ul className='flex flex-wrap -mb-px text-sm font-medium text-center text-gray-700 dark:text-gray-300'>
        <li className='me-2'>
          <Link
            href='/'
            className='inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group text-lg'
          >
            <CiSearch
              className='me-2 cursor-pointer text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
              size={24}
            />
            Search
          </Link>
        </li>
        <li className='me-2'>
          <Link
            href='/tracks'
            className='inline-flex items-center justify-center p-4 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 rounded-t-lg active  dark:border-blue-500 group text-lg'
            aria-current='page'
          >
            <LuListMusic
              className='me-2 cursor-pointer text-blue-400 dark:text-blue-500 group-hover:text-blue-700 dark:group-hover:text-blue-400'
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
