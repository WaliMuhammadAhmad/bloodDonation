import { Link, useNavigate } from "react-router-dom";
import navbarData from "../data/common/navbar";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

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
              to='/dashboard/user'
              className='lg:text-lg md:text-md capitalize font-light'>
              Panel
            </Link>
            <button
              onClick={handleLogout}
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
