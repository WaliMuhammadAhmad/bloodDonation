import React, { useState } from "react";
import { SuccessAlert, ErrorAlert } from "./common/Alerts";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

const theme = {
  divClass: "flex flex-col",
  successClass:
    "input input-ghost w-full max-w-xs rounded-none border-b-zinc-100 focus:outline-none focus:border-transparent focus:border-b-zinc-500",
  errorClass:
    "input input-ghost w-full max-w-xs rounded-none text-red-500 border-b-red-100 focus:outline-none focus:border-transparent focus:border-b-red-500",
  successMsg: "text-xl text-white underline hover:no-underline",
};

const ContactForm = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  storedUser;

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    userId: storedUser._id,
    projectName: "",
    type: "",
    color: "",
    endDate: "",
    budget: 0,
    email: "",
    keywords: "",
    file: "",
    progress: 0,
    status: "Started",
    isCompleted: false,
    completedFile: "",
  });

  const [errors, setErrors] = useState({
    projectName: "",
    color: "",
    email: "",
    theme: "",
    keyword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = { ...errors };

    // Validation for each field
    for (const field in formData) {
      const value = formData[field];
      switch (field) {
        case "projectName":
          if (
            value.length < 3 ||
            value.length > 25 ||
            !/^[a-zA-Z\s]*$/.test(value)
          ) {
            newErrors[field] =
              "Project Name name should be between 3 and 25 characters and only letters.";
            formValid = false;
          } else {
            newErrors[field] = "";
          }
          break;
        case "color":
          if (
            value.length < 3 ||
            value.length > 25 ||
            !/^[a-zA-Z\s]*$/.test(value)
          ) {
            newErrors[field] =
              "Color should be between 3 and 25 characters and only letters.";
            formValid = false;
          } else {
            newErrors[field] = "";
          }
          break;
        case "keyword":
          if (
            value.length < 3 ||
            value.length > 25 ||
            !/^[a-zA-Z\s]*$/.test(value)
          ) {
            newErrors[field] =
              "Keyword should be between 3 and 25 characters and only letters.";
            formValid = false;
          } else {
            newErrors[field] = "";
          }
          break;
        case "email":
          if (
            !value ||
            !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
          ) {
            newErrors[field] = "Invalid email address";
            formValid = false;
          } else {
            newErrors[field] = "";
          }
          break;
        default:
          break;
      }
    }

    setErrors(newErrors);

    if (formValid) {
      try {
        const response = await axios.post("/createproject", formData);
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
    <div className='w-full flex flex-col gap-2 px-10 py-20'>
      <h1 className='font-condensed text-5xl'>
        Fill this form to start the Project :
      </h1>
      <form
        className='font-display p-10 text-xl tracking-tight'
        method='POST'
        onSubmit={handleSubmit}>
        <div className={theme.divClass}>
          <label htmlFor='projectName'>
            Hi! I’m looking to have a projectName
            <input
              type='text'
              id='projectName'
              name='projectName'
              value={formData.projectName}
              onChange={handleChange}
              className={
                errors.projectName ? theme.errorClass : theme.successClass
              }
              placeholder='*projectName Name*'
              min='5'
              max='25'
              required
            />
          </label>
          <label htmlFor='type'>
            which is a sort of
            <select
              className={theme.successClass}
              // onChange={handleChange}
              name='type'
              id='type'
              required>
              <option value='null'>*Presentation Type*</option>
              <optgroup label='Business'>
                <option value='type25'>Conference Presentation</option>
                <option value='type25'>Investor Pitch</option>
                <option value='type25'>Training Sessions</option>
                <option value='type25'>Team Introduction</option>
                <option value='type25'>Revenue & Report</option>
              </optgroup>
              <optgroup label='Educationsl'>
                <option value='type25'>Conference Presentation</option>
                <option value='type25'>Investor Pitch</option>
                <option value='type25'>Training Sessions</option>
                <option value='type25'>Team Introduction</option>
                <option value='type25'>Revenue & Report</option>
              </optgroup>
              <optgroup label='Inspirational'>
                <option value='type25'>Conference Presentation</option>
                <option value='type25'>Investor Pitch</option>
                <option value='type25'>Training Sessions</option>
                <option value='type25'>Team Introduction</option>
                <option value='type25'>Revenue & Report</option>
              </optgroup>
              <optgroup label='Litrature'>
                <option value='type25'>Conference Presentation</option>
                <option value='type25'>Investor Pitch</option>
                <option value='type25'>Training Sessions</option>
                <option value='type25'>Team Introduction</option>
                <option value='type25'>Revenue & Report</option>
              </optgroup>
            </select>
          </label>
        </div>
        <div className={theme.divClass}>
          <label htmlFor='color'>
            The color pallete should be
            <input
              type='text'
              id='color'
              name='color'
              value={formData.color}
              onChange={handleChange}
              className={errors.color ? theme.errorClass : theme.successClass}
              placeholder='*Zinc, Green, Yellow etc*'
              min='3'
              max='25'
              required
            />
          </label>
          <label htmlFor='endDate'>
            with an idea of having that completed
            <input
              type='date'
              id='endDate'
              name='endDate'
              onChange={handleChange}
              className={theme.successClass}
              required
            />
          </label>
        </div>
        <div className={theme.divClass}>
          <label htmlFor='budget'>
            I am hoping to stay around a budget range of $
            <input
              type='number'
              id='budget'
              name='budget'
              onChange={handleChange}
              placeholder='*10*'
              min='10.0'
              max='1000.0'
              step='5'
              className={theme.successClass}
              required
            />
          </label>
          <label htmlFor='email'>
            and you can reach me throught my email at
            <input
              type='email'
              id='email'
              name='email'
              onChange={handleChange}
              className={errors.email ? theme.errorClass : theme.successClass}
              placeholder='*John@gmail.com*'
              required
            />
          </label>
        </div>
        <div className={theme.divClass}>
          <label htmlFor='keyword'>
            Optionally, I’m sharing more:
            <input
              type='text'
              id='keyword'
              name='keyword'
              placeholder='*Keywords or any guidelines*'
              onChange={handleChange}
              className={errors.keyword ? theme.errorClass : theme.successClass}
            />
          </label>
          <label htmlFor='file'>
            I want to provie a theme or a file for the projectName:
            <input
              type='file'
              id='file'
              onChange={handleChange}
              className='file-input file-input-ghost w-full max-w-xs focus:outline-none '
            />
          </label>
        </div>

        {/* Error messages */}
        {Object.entries(errors).map(([fieldName, errorMessage]) => (
          <div
            className='text-red-500'
            key={fieldName}
            style={{ display: errorMessage ? "block" : "none" }}>
            {errorMessage}
          </div>
        ))}

        {/* Submit button */}
        <div className='w-full p-5 sm:flex-col'>
          <label className='text-white pr-5'>
            By clicking this button, I agree with all terms and conditions
          </label>
          <input
            className='border-2 px-2 bg-zinc-900 text-white rounded-full'
            type='submit'
            value='Proceed to Payment'
          />
        </div>
      </form>
      {showSuccess && <SuccessAlert message='Project Started Successfully!' />}
      {showError && <ErrorAlert message='Project Failed Successfully!' />}
    </div>
  );
};

export default ContactForm;
