// eslint-disable-next-line react/prop-types
function Starter({ title, text }) {
  return (
    <div className='w-full h-screen bg-background flex flex-col justify-center px-20'>
      <h1 className='font-bold text-8xl uppercase py-20 border-b'>{title}</h1>
      <p className='font-display font-light lg:text-5xl tracking-tight py-20 border-b'>
        {text}
      </p>
    </div>
  );
}

export default Starter;
