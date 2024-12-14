import React from 'react'

function Founder(props) {
    return (
        <div className='w-full h-screen bg-[#CDEA68] font-display flex justify-center align-center p-20'>
            <div className='w-[90vw] bg-[#004D43]  rounded-3xl lg:flex justify-center items-center gap-10 p-10'>
                <img className='lg:block lg:w-1/3 sm:hidden rounded-xl' src="img\social\founder.jpg" alt="" />
                <div className='flex flex-col gap-10 justify-center'>
                    <h1 className='lg:text-8xl sm:text-5xl font-condensed'>{props.title}</h1>
                    <p className='lg:text-xl text-justify'>{props.text}</p>
                </div>
            </div>
        </div>
    )
}

export default Founder