import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { SuccessAlert, ErrorAlert } from "../components/common/Alerts";
import axios from "axios";

function SignIn() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z][\w.-]*@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;

    let formValid = true;
    const newErrors = { ...errors };

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
      formValid = false;
    } else {
      newErrors.email = "";
    }

    if (formData.password.length < 8 || formData.password.length > 16) {
      newErrors.password = "Password must be 8-16 characters long.";
      formValid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);

    if (formValid) {
      try {
        const response = await axios.post("/signin", formData);
        "response data", response.data;
        const userData = response.data.user;
        localStorage.setItem("user", JSON.stringify(userData));

        if (response.data.success) {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 5000);
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
    <>
      <Navbar user={storedUser} />
      <div className='bg-background tracking-tight w-full h-screen flex items-center justify-center'>
        <div className='lg:w-1/4 lg:h-3/4 flex flex-col justify-evenly items-center rounded-xl bg-primary text-text'>
          <h1 className='font-condensed lg:text-5xl '>Sign In</h1>
          <form
            className='max-w-md mx-auto'
            method='POST'
            onSubmit={handleSubmit}>
            <div className='relative z-0 lg:w-60 md:w-60 sm:w-60 mb-5 group'>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-text appearance-none dark:text-text dark:focus:border-text focus:outline-none focus:ring-0 focus:border-text peer'
                placeholder=' '
                required
              />
              <label
                htmlFor='email'
                className={`peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                  errors.email && "text-red-500"
                }`}>
                Email address
              </label>
              {errors.email && (
                <span className='text-red-500'>{errors.email}</span>
              )}
            </div>
            <div className='relative z-0 lg:w-60 md:w-60 sm:w-60 mb-5 group'>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-text appearance-none dark:text-text dark:border-text dark:focus:border-text focus:outline-none focus:ring-0 focus:border-text peer'
                placeholder=' '
                required
              />
              <label
                htmlFor='password'
                className={`peer-focus:font-medium absolute text-sm  dark: duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                  errors.password && "text-red-500"
                }`}>
                Password
              </label>
              {errors.password && (
                <span className='text-red-500'>{errors.password}</span>
              )}
            </div>
            <input
              type='submit'
              value='Sign Up'
              className='w-full py-2.5 px-5 text-sm font-medium border-2  border-text rounded-md hover:bg-text hover:text-primary focus:outline-none focus:ring-0 focus:border-text'
            />
          </form>
          <p>
            Not registered yet?
            <Link className='underline hover:no-underline' to='/signup'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
      {showSuccess && <SuccessAlert message='Sign In Succeed!' />}
      {showError && <ErrorAlert message='Sign In Failed!' />}
    </>
  );
}

export default SignIn;
