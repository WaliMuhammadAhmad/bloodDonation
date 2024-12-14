export default function Checkout() {
  return (
    <div className='lg:w-1/4 p-5  bg-white text-zinc-900 font-display'>
      <div className='flex flex-col content-center items-center'>
        <img
          className='lg:w-[15vw] md:w-15 sm:w-14'
          src='img\logo\supreme.svg'
          alt=''
        />
        <div className='p-10 flex flex-col items-center border-1 border-zinc-900 rounded-3xl'>
          <h1 className='font-condensed lg:text-8xl md:text-5xl sm:text-4xl'>
            $20.0
          </h1>
          <h2 className='lg:text-3xl md:text-2xl sm:text-1xl'>
            Transaction Sent!
          </h2>
        </div>
        <div className='flex gap-2'>
          <div>
            <p>Transaction Hash: 0x1234567890</p>
          </div>
          <div>
            <img className='size-20' src='img\asserts\qr.svg' alt='' />
          </div>
        </div>
      </div>
    </div>
  );
}
