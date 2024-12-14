import React from 'react'

function Meet() {
    return (
        <div className='w-full bg-zinc-900] block py-10'>
            <h1 className='font-condensed text-8xl text-center pt-10'>How we engage with client</h1>
            <div className='container flex gap-10 items-center justify-around'>
                <img className='rounded-xl' src="img/asserts/call.jpg" alt="" />
                <p className='text-center w-1/2'><b className='lg:text-xl'>Meeting with Client:</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus culpa neque consequatur pariatur minus tempora unde fugit nam quae iste</p>
            </div>
            <div className='container flex gap-10 items-center justify-around'>
                <p className='text-center w-1/2'><b className='lg:text-xl'>Showing live progress:</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi rem, a inventore dolorum dignissimos accusantium eos commodi impedit deleniti assumenda illo ducimus voluptate quibusdam neque magni mollitia repudiandae ut aut.</p>
                <img className='rounded-xl' src="img/asserts/work.jpg" alt="" />
            </div>
        </div>
    )
}

export default Meet