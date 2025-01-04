import { useNavigate } from "react-router";

export default function Topbar() {
  const navigate = useNavigate();
  return (
    <div className='h-15 w-full bg-background text-text flex justify-between items-center px-5 py-2'>
      <div>
        <h1 className='text-xl font-bold'>Dashboard</h1>
      </div>
      <div>
        <button
          onClick={()=>navigate('/')}
          className='border border-text text-text px-4 py-2 rounded'>
          Home
        </button>
      </div>
    </div>
  );
}
