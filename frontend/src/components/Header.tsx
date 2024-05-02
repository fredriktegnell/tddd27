import React, { useState } from 'react';
import { User } from 'firebase/auth';
import CategoryDropdown from './CategoryDropdown';
import Searchbar from './Searchbar';
import MobileMenu from './MobileMenu';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSignOut: () => void;
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ onSignOut, user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  
  return (
    <header className="w-full py-4 px-2 sm:px-4 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] lg:px-6">
      <div className="container mx-auto relative">
        <div className="flex items-center justify-between">
          <Link to={user ? '/home' : '/'}>
          <div className="justify-start pl-2">
            <div className="text-white font-bold text-3xl lg:text-5xl m-0">FOOTY</div>
          </div>
          </Link>
          <div className="hidden lg:flex justify-center">
            {user ? <CategoryDropdown /> : null}
          </div>
          <div className="hidden lg:flex justify-center">
            {user ? <Searchbar /> : null}
          </div>
          <div className="hidden lg:flex justify-end">
            {user ? (
              <>
              <Link to='/'>
              <button
                className="w-32 bg-gradient-to-r hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-400 from-cyan-100 to-blue-200 py-2 px-4 font-semibold rounded-lg text-md"
                onClick={onSignOut}
              >
                Log out
              </button>
              </Link>
              </>
            ) : (
              <div>
                <Link to="/signup">
                <button
                  className="w-32 mx-2 bg-gradient-to-r hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-400 from-cyan-100 to-blue-200 py-2 px-4 font-semibold rounded-lg text-md"
                >
                  Sign Up
                </button>
                </Link>
                <Link to="/signin">
                  <button
                    className="w-32 bg-gradient-to-r hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-400 from-cyan-100 to-blue-200 py-2 px-4 font-semibold rounded-lg text-md"
                  >
                    Sign In
                  </button>
                </Link>
              
              </div>
              
            )}
          </div>
        </div>
        <div className="lg:hidden absolute right-4 top-1/2 transform -translate-y-1/2">
          <button
            className="text-white text-3xl "
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            &#9776;
          </button>
        </div>
        <MobileMenu onSignOut={onSignOut} user={user} isOpen={mobileMenuOpen} closeMenu={closeMobileMenu}/>
      </div>
      {mobileMenuOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={closeMobileMenu}></div>}
    </header>
  );
};

export default Header;
