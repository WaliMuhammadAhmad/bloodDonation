import React from 'react'
import Navbar from '../components/Navbar'
import Starter from '../components/Starter'
import Featured from '../components/Featured'
import Start from '../components/Start'
import Cards from '../components/Cards'
import Footer from '../components/Footer'

function SlidesInfo() {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className='text-white'>
      <Navbar user={storedUser} />
      <Starter text="Swip" />
      <div className='px-20'>
        <h1 className='font-condensed font-bold text-8xl uppercase py-10 border-b'>Slide Preview</h1>
        <img src="video\7 Slides Swip.gif" alt="" />
        <h1 className='font-condensed font-bold text-8xl uppercase py-10 border-b'>Slide Info</h1>
        <p className='font-display font-light lg:text-5xl tracking-tight py-20 border-b'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nostrum accusamus dolorem aliquam omnis. Doloribus magnam in, odit ducimus, expedita qui atque dolore dolorem nobis magni ipsum. Aliquam, dolores rerum!
        </p>
      </div>
      <Featured />
      <Start />
      <Cards />
      <Footer />
    </div>
  )
}

export default SlidesInfo