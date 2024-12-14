import React from 'react'

function NotFound() {
  return (
    <div className='relative w-full h-screen flex flex-col justify-center items-center font-condensed bg-zinc-900 text-white'>
      <img src="img/asserts/ghost.gif" alt="" />
      <div className="absolute bottom-20 text-center">
        <h1 className='text-zinc-500 text-8xl font-bold'>404</h1>
        <h2 className='text-zinc-500 text-5xl font-semibold'>Page Not Found</h2>
      </div>
    </div>

  )
}

export default NotFound