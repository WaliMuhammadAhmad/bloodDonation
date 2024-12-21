import logout from "../hooks/useAuth";

export default function Topbar() {
  return (
    <div className='h-15 w-full bg-background text-text flex justify-between items-center px-5 py-2'>
      <div>
        <h1 className='text-xl font-bold'>Dashboard</h1>
      </div>
      <div>
        <button
          onClick={logout}
          className='border border-text text-text px-4 py-2 rounded'>
          Logout
        </button>
      </div>
    </div>
  );
}
