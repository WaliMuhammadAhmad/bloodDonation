function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-background text-text'>
      <h1 className='text-6xl font-bold mb-4'>404</h1>
      <p className='text-2xl mb-8'>Page Not Found</p>
      <div className='flex space-x-4'>
        <button
          onClick={() => (window.location.href = "/")}
          className='w-full py-3 px-5 text-sm text-center font-medium border text-primary border-primary rounded-md hover:bg-primary hover:text-text focus:outline-none focus:ring-0'>
          Home
        </button>
        <button
          onClick={() => window.history.back()}
          className='w-full py-3 px-5 text-sm text-center font-medium border text-primary border-primary rounded-md hover:bg-primary hover:text-text focus:outline-none focus:ring-0'>
          Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
