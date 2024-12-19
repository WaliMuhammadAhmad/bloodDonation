import Button from "../components/common/Button";

export default function Checkout() {
  return (
    <div className='h-screen min-h-screen bg-background text-text'>
      <div className='flex flex-col items-center justify-center h-full'>
        <h1 className='text-2xl font-bold mb-4'>Your request is submitted</h1>
        <p className='mb-8'>We will ping you when complete.</p>
        <div className='flex space-x-4'>
          <Button to='/panel/id' className=''>
            Panel
          </Button>
          <Button to='/' className='bg-text border-text hover:text-text'>
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
