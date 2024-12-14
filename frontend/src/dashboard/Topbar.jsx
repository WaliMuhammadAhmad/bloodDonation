import React from 'react'

function Topbar() {
  const handleLogout = () => {
    // Remove the userData from local storage
    localStorage.removeItem('user');
  };
  
  return (
    <div className="navbar w-full px-[1vw] py-[2vh]">
      <div className="flex-1">
        <a className='invert flex w-[10vw]' href="/">
          <img src="img\logo\supreme.svg" alt="" />
        </a>
      </div>
          <a className='text-md' href="/">
            <button onClick={handleLogout}>Logout</button>
          </a>
    </div>
  )
}

export default Topbar