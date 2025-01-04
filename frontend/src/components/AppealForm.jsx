import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { SuccessAlert, ErrorAlert } from "./common/Alerts";
import bloodInventory from "../data/content/bloodInventory";

export default function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    quantity: "",
    location: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    let formValid = true;
    // Add validation logic here if needed
    if ( formData.bloodGroup === "" || formData.quantity === "" || formData.location === ""|| formData.description === "") {
      formValid = false;
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }

    if (formValid) {
      try {
        const requestMap = {
          name: "",
          bloodGroup: formData.bloodGroup,
          quantity: formData.quantity,
          location: formData.location,
          description : formData.description
        };

        // Send donation request
        const response = await axios.post("/user/bloodappeal", requestMap)

        if (response.status === 200) {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            navigate("/"); // Redirect after submission
          }, 5000);
        } else {
          setShowError(true);
          setTimeout(() => setShowError(false), 5000);
        }
      } catch (error) {
        console.error("Error:", error);
        setShowError(true);
        setTimeout(() => setShowError(false), 5000);
      }
    }
  };

  return (
    <div className='min-h-screen h-screen w-full bg-background text-text border-t flex flex-col justify-center items-center'>
      <div className='mb-5'>
        <h1 className='text-6xl mb-2'>Blood Appeal Form</h1>
      </div>
      <form
        className='container w-2/5 flex flex-col gap-5'
        onSubmit={handleSubmit}>
        
  

        {/* Blood Group */}
        <select
          name='bloodGroup'
          value={formData.bloodGroup}
          onChange={handleChange}
          className='select select-bordered w-full '
          required>
          <option disabled value=''>Blood Group</option>
          {bloodInventory.map((blood)=>(
                  <option value={blood.type} key={blood.id}>{blood.type}</option>
                ))}
          {/* Add other blood groups if needed */}
        </select>

        {/* Quantity */}
        <label className='input input-bordered flex items-center gap-2'>
          Quantity
          <input
            type='number'
            name='quantity'
            value={formData.quantity}
            onChange={handleChange}
            className='grow'
            step={1}
            min={0}
            max={10}
            placeholder='Units'
            required
          />
          <span className='badge badge-error'>Units</span>
        </label>

        {/* Location */}
        <label className='input input-bordered flex items-center gap-2'>
          Location
          <input
            type='text'
            name='location'
            value={formData.location}
            onChange={handleChange}
            className='grow'
            placeholder='Enter location'
            required
          />
        </label>
       {/* Description */}
       <label className='input input-bordered flex items-center gap-2'>
        Description
          <input
            type='text'
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='grow'
            placeholder='contact, patient and purpose'
            required
          />
        </label>
        {/* Submit Button */}
        <input
          className='w-full py-3 px-5 text-sm text-center font-medium border text-text border-[#383F47] rounded-md hover:bg-primary hover:text-text hover:border-primary focus:outline-none focus:ring-0'
          type='submit'
          value='Submit Appeal'
        />
      </form>

      {/* Success and Error Alerts */}
      {showSuccess && <SuccessAlert message='Blood appeal submitted successfully!' />}
      {showError && <ErrorAlert message='Form submission failed!' />}
    </div>
  );
}
