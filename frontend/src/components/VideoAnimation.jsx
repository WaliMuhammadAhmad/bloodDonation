import React from 'react'

function VideoAnimation() {
  return (
        <div className="lg:block sm:hidden w-full h-full">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                >
                    <source src="video\supreme.mp4" type="video/mp4" />
                </video>
            </div>
  )
}

export default VideoAnimation