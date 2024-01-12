import React from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import { FaRegUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../context/userContext';

export default function Header() {
  const { user } = useContext(userContext);

  return (
    <div>
      <header className='p-4 flex justify-between'>
        <Link to={'/'} className="flex items-center gap-1">
          <FaLocationArrow className='text-4xl'/>
          <span className="font-bold text-4xl">airbnb</span>
        </Link>

        <Link to={user ? '/profile' : '/login'} className="flex items-center justify-center border border-gray-300 rounded-full px-4 p-5 shadow-md shadow-gray-400">
          <button className='px-3 text-black'>{user ? user.name : <GiHamburgerMenu className='text-2xl'/>}</button>
          <button className='px-3'><FaRegUserCircle className='text-2xl'/></button>
        </Link>
      </header>
    </div>
  );
}
