// eslint-disable-next-line react/prop-types
function Starter({ text }) {
  return (
    <div className='w-full h-screen bg-background flex flex-col justify-center px-20'>
      <h1 className='font-bold text-8xl uppercase py-20 border-b'>{text}</h1>
      <p className='font-display font-light lg:text-5xl tracking-tight py-20 border-b'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed recusandae
        blanditiis sapiente vel sit laborum! Id, numquam. Blanditiis beatae
        placeat rerum aliquid ipsum aperiam a ab praesentium, accusantium fugit
        nam!
      </p>
    </div>
  );
}

export default Starter;
