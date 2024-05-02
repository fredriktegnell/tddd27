import React from 'react';
import { User } from 'firebase/auth';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  onSignOut: () => void;
  user: User | null;
  isOpen: boolean;
  closeMenu: () => void; 
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onSignOut, user, isOpen, closeMenu }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 bg-[var(--gradient-start)] w-36  text-white py-2 mt-4 rounded-lg z-50">
      {user ? (
        <div className='p-2'>
          <Link to='/home' onClick={closeMenu}>
            <div className="px-2 py-2 cursor-pointer">Home</div>
          </Link>
          <Link to='/fixtures' onClick={closeMenu}>
            <div className="px-2 py-2 cursor-pointer">Fixtures</div>
          </Link>
          <Link to='/betting' onClick={closeMenu}>
            <div className="px-2 py-2 cursor-pointer">Betting</div>
          </Link>
          <Link to='/profile' onClick={closeMenu}>
            <div className="px-2 py-2 cursor-pointer">My profile</div>
          </Link>
          <button
            className="w-full mt-4 bg-gradient-to-r text-black hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-400 from-cyan-100 to-blue-200 py-2 px-4 font-semibold rounded-lg text-md"
            onClick={() => {onSignOut(); closeMenu();}} 
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className='grid grid-cols gap-y-4 p-2'>
          <Link to="/signin" onClick={closeMenu}>
            <button
              className="w-full bg-gradient-to-r  text-black hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-400 from-cyan-100 to-blue-200 py-2 px-4 font-semibold rounded-lg text-md"
            >
              Sign In
            </button>
          </Link>
          <Link to="/signup" onClick={closeMenu}>
            <button
              className="w-full bg-gradient-to-r  text-black hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-400 from-cyan-100 to-blue-200 py-2 px-4 font-semibold rounded-lg text-md"
            >
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
