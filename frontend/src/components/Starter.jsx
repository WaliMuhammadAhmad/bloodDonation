import React from 'react'

function Starter(props) {
  return (
    <div className='w-full h-screen p-20'>
        <h1 className='font-condensed font-bold text-8xl uppercase py-20 border-b'>{props.text}</h1>
        <p className='font-display font-light lg:text-5xl tracking-tight py-20 border-b'>We create eye-catching and eye-opening presentations that educate, inspire and influence action.</p>
      </div>
  )
}

export default Starter