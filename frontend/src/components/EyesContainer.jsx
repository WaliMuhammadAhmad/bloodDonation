import React from 'react'
import Eyes from './Eyes'

function EyesContainer() {
    return (
        <div>
            <div className='eyes w-full h-screen overflow-hidden'>
                <div data-scroll data-scroll-speed="-.7" className='relative w-full h-full bg-cover bg-center bg-[url("/img/asserts/eyesbg.jpg")]'>
                    <Eyes />
                </div>
            </div>
        </div>
    )
}

export default EyesContainer