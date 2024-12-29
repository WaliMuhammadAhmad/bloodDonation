import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { SuccessAlert, ErrorAlert } from "./common/Alerts";

export default function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const formType = location.pathname.split("/")[1];
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    name: storedUser.name || "",
    email: storedUser.email || "",
    password: "",
    city: "",
    bloodGroup: "",
    quantity: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z][\w.-]*@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;

    let formValid = true;

    if (!emailRegex.test(formData.email)) {
      alert("Invalid email address");
      formValid = false;
    } else if (formData.password.length < 8 || formData.password.length > 16) {
      alert("Password must be 8-16 characters long.");
      formValid = false;
    }

    if (formData.password.length < 8 || formData.password.length > 16) {
      alert("Password must be 8-16 characters long.");
      formValid = false;
    }

    if (formValid) {
      try {
        const requestMap = {
          Email: formData.email,
          Password: formData.password,
        };
        console.log(requestMap);

        const isAdmin = formData.email === "admin@bloodDonation.com";
        const endpoint = isAdmin ? "/admin/login" : "/user/login";
        const response = await axios.post(endpoint, requestMap);

        if (response.status === 200) {
          const userData = response.data;
          localStorage.setItem("user", JSON.stringify(userData));

          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            // Redirect based on user
            if (isAdmin) {
              navigate("/dashboard/admin");
            } else {
              navigate("/");
            }
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
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  };

  return (
    <div className='min-h-screen h-screen w-full bg-background text-text border-t flex flex-col justify-center items-center'>
      <div className='mb-5'>
        <h1 className='text-3xl'>
          {formType === "donate" ? "Donor Form" : "Blood Request Form"}
        </h1>
      </div>
      <form
        className='container w-2/5 flex flex-col gap-5'
        onSubmit={handleSubmit}>
        <label className='input input-bordered flex items-center gap-2'>
          Name
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='grow'
            placeholder='Enter your name'
            required
          />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          Email
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='grow'
            placeholder='you@example.com'
            required
          />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          Password
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='grow'
            placeholder='Enter password'
            required
          />
        </label>
        <div className='flex gap-8'>
          <select
            name='city'
            value={formData.city}
            onChange={handleChange}
            className='select select-bordered w-full max-w-xs'
            required>
            <option disabled value=''>
              City
            </option>
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Chicago</option>
          </select>
          <select
            name='bloodGroup'
            value={formData.bloodGroup}
            onChange={handleChange}
            className='select select-bordered w-full max-w-xs'
            required>
            <option disabled value=''>
              Blood Group
            </option>
            <option>A+</option>
            <option>B+</option>
            <option>O-</option>
          </select>
        </div>
        <label className='input input-bordered flex items-center gap-2'>
          Quantity
          <input
            type='number'
            name='quantity'
            value={formData.quantity}
            onChange={handleChange}
            className='grow'
            step={1}
            placeholder='Units'
            required
          />
          <span className='badge badge-error'>Liters</span>
        </label>
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

        <input
          className='w-full py-3 px-5 text-sm text-center font-medium border text-text border-[#383F47] rounded-md hover:bg-primary hover:text-text hover:border-primary focus:outline-none focus:ring-0'
          type='submit'
          value={formType === "donate" ? "Submit Donation" : "Request Blood"}
        />
      </form>
      {showSuccess && <SuccessAlert message='Form submitted successfully!' />}
      {showError && <ErrorAlert message='Form submission failed!' />}
    </div>
  );
}
