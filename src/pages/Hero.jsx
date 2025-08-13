import React from 'react'
import viteLogo from '/animation.mp4'

export function Hero() {
  return (
    <div className="relative w-full h-[90vh] mb-8 overflow-hidden rounded-xl">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        preload="auto"
        playsInline
        autoPlay
        muted
        loop
      >
        <source src={viteLogo} type="video/mp4" />
      </video>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold text-center drop-shadow-lg px-4">
          MONSOON SALE
          <p className='text-5xl'>UPTO 50% OFF</p>
          <button className='text-1xl md:text-3xl lg:text-5xl bg-green-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded p-2 cursor-pointer'>SHOP NOW</button>
        </h1>
      </div>

      {/* Optional semi-transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
    </div>
  )
}
