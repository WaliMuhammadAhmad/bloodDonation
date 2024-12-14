import React from 'react'

function Card(props) {
  return (
    <div>
        <div className='flex flex-col items-center gap-5'>
            <img className='w-3/4 rounded-xl' src={props.img} alt="" />
            <p className='w-3/4 font-display text-xl tracking-tight text-justify'>
                {props.description}            
            </p>
        </div>
    </div>
  )
}

export default Card