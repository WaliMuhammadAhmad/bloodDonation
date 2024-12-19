import Button from "./common/Button";
import { useLocation } from "react-router";

export default function Form() {
  const location = useLocation();
  const formType = location.pathname.split("/")[1];
  return (
    <div className='min-h-screen h-screen w-full bg-background text-text border-t flex flex-col justify-center items-center'>
      <div className='mb-5'>
        <h1 className='text-3xl'>
          {formType === "donate" ? "Donor Form" : "Blood Request Form"}
        </h1>
      </div>
      <div className='container w-2/5 flex flex-col gap-5'>
        <label className='input input-bordered flex items-center gap-2'>
          Name
          <input type='text' className='grow' placeholder='Enter your name' />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          Email
          <input type='email' className='grow' placeholder='you@example.com' />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          Password
          <input
            type='password'
            className='grow'
            placeholder='Enter password'
          />
        </label>
        <div className='flex gap-8'>
          <select className='select select-bordered w-full max-w-xs'>
            <option disabled selected>
              City
            </option>
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Chicago</option>
          </select>
          <select className='select select-bordered w-full max-w-xs'>
            <option disabled selected>
              Blood Group
            </option>
            <option>A+</option>
            <option>B+</option>
            <option>O-</option>
          </select>
        </div>
        {formType === "donate" && (
          <label className='input input-bordered flex items-center gap-2'>
            Quantity
            <input type='number' className='grow' placeholder='Units' />
            <span className='badge badge-error'>e.g., 2 units</span>
          </label>
        )}
        <label className='input input-bordered flex items-center gap-2'>
          Location
          <input type='text' className='grow' placeholder='Enter location' />
        </label>

        <Button>
          {formType === "donate" ? "Submit Donation" : "Request Blood"}
        </Button>
      </div>
    </div>
  );
}
