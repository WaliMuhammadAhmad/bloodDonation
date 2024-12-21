import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import navbarData from "../data/common/navbar";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className='fixed z-[999] w-full px-[2vw] py-[2vh] text-text flex justify-between items-center backdrop-blur-sm'>
      {/* Logo */}
      <div className='logo'>
        <Link
          to='/'
          className='flex lg:w-[10vw] md:w-15 sm:w-14 text-lg font-bold'>
          {navbarData.logo}
        </Link>
      </div>

      {/* Links */}
      <div className='links flex gap-10 justify-center items-center'>
        {/* Static Links */}
        {navbarData.links.map(({ title, url }) => (
          <Link
            key={title}
            to={url}
            className='lg:text-lg md:text-md capitalize font-light'>
            {title}
          </Link>
        ))}

        {/* Conditional Links Based on Authentication */}
        {isAuthenticated ? (
          <>
            <Link
              to='/profile'
              className='lg:text-lg md:text-md capitalize font-light'>
              {navbarData.authenticatedLinks.profile}
            </Link>
            <button
              onClick={logout}
              className='lg:text-lg md:text-md capitalize font-light border p-2 rounded-xl'>
              {navbarData.authenticatedLinks.logout}
            </button>
          </>
        ) : (
          <Link
            to='/signup'
            className='lg:text-lg md:text-md capitalize font-light'>
            {navbarData.unauthenticatedLinks.register}
          </Link>
        )}
      </div>
    </div>
  );
}
