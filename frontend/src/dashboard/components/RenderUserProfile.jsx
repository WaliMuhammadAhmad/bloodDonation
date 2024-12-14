import React, { useState, useEffect } from "react";
import { SuccessAlert, ErrorAlert } from "../../components/common/Alerts";
import axios from "axios";

function RenderUserProfile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    password: "",
    pic: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user/${storedUser._id}`);
        if (response.data.success) {
          const userData = response.data.data;
          setUserInfo({
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: userData.password,
            pic: userData.pic,
          });
        } else {
          console.error("Failed to fetch user data:", response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    if (name === "firstName") {
      if (!/^[a-zA-Z]{3,15}$/.test(value)) {
        setErrors({
          ...errors,
          firstName:
            "First name must be 3-15 characters and contain only letters.",
        });
      } else {
        setErrors({ ...errors, firstName: "" });
      }
    }
    if (name === "lastName") {
      if (!/^[a-zA-Z]{3,15}$/.test(value)) {
        setErrors({
          ...errors,
          lastName:
            "Last name must be 3-15 characters and contain only letters.",
        });
      } else {
        setErrors({ ...errors, lastName: "" });
      }
    }
    if (name === "password") {
      if (
        !/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}/.test(
          value
        )
      ) {
        setErrors({
          ...errors,
          password:
            "Password must be 8-14 characters and contain at least one alphabet, integer, and special character.",
        });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }
  };

  const handleSubmitforProfile = async (e) => {
    e.preventDefault();
    if (userInfo) {
      try {
        const response = await axios.put(`/user/${storedUser._id}`, userInfo);
        response.data;
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
    <div className='flex flex-col gap-5 h-full'>
      <h1 className='font-condensed text-5xl font-bold'>Manage Profile</h1>
      <form
        onSubmit={handleSubmitforProfile}
        className='flex flex-col md:flex-row gap-5'>
        <div className='flex flex-col w-full md:w-1/2 gap-2'>
          <div>
            <label className='block mb-2'>First Name</label>
            <input
              type='text'
              name='firstName'
              value={userInfo.firstName}
              onChange={handleChange}
              className='w-full px-3 py-2 bg-zinc-900 text-white border rounded-md focus:outline-none focus:border-primary'
            />
            {errors.firstName && (
              <span className='text-red-500'>{errors.firstName}</span>
            )}
          </div>

          <div>
            <label className='block mb-2'>Last Name</label>
            <input
              type='text'
              name='lastName'
              value={userInfo.lastName}
              onChange={handleChange}
              className='w-full px-3 py-2 border bg-zinc-900 text-white rounded-md focus:outline-none focus:border-primary'
            />
            {errors.lastName && (
              <span className='text-red-500'>{errors.lastName}</span>
            )}
          </div>

          <div>
            <label className='block mb-2'>Password</label>
            <input
              type='password'
              name='password'
              value={userInfo.password}
              onChange={handleChange}
              className='w-full px-3 py-2 border bg-zinc-900 text-white rounded-md focus:outline-none focus:border-primary'
            />
            {errors.password && (
              <span className='text-red-500'>{errors.password}</span>
            )}
          </div>
          <input
            className='border w-1/4 p-2 bg-zinc-900 text-white rounded-xl hover:invert'
            type='submit'
            value='Update Profile'
          />
        </div>
      </form>
      {showSuccess && <SuccessAlert message='Profile Updated Successfully!' />}
      {showError && <ErrorAlert message='Profile Update Failed!' />}
    </div>
  );
}

export default RenderUserProfile;
