function Introduction() {
  return (
    <div className='eyes w-full h-screen overflow-hidden'>
      <div
        data-scroll
        data-scroll-speed='-.7'
        className='relative w-full h-full bg-cover bg-center flex justify-center items-center invert bg-[url("/img/logo/logo.svg")]'>
        <div className='w-3/5 flex flex-col text-center items-center invert'>
          <h1 className='font-condensed underline uppercase text-8xl hover:no-underline'>
            goal
          </h1>
          <p className='w-3/4 font-display text-xl'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
            asperiores blanditiis labore, repellat non neque rem minima odit,
            doloremque amet earum fugit similique optio, facere nesciunt dicta
            veniam magnam maiores!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
