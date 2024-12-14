import React, { useState } from "react";
import { SuccessAlert, ErrorAlert } from "../../components/common/Alerts";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

function RenderAddTemplate() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image:
      "C:/Users/wali/Documents/Projects/supreme/frontend/public/img/slides/bean.png",
    video: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[a-zA-Z\s]{3,15}$/;

    let formValid = true;
    const newErrors = { ...errors };

    if (!nameRegex.test(formData.title)) {
      newErrors.title = "Title must be 3-15 letters only.";
      formValid = false;
    } else {
      newErrors.title = "";
    }

    if (formData.description.length < 3 || formData.description.length > 300) {
      newErrors.description = "Description must be 3-300 characters long.";
      formValid = false;
    } else {
      newErrors.description = "";
    }

    setErrors(newErrors);

    if (formValid) {
      try {
        const response = await axios.post("/createslide", formData);
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
      <h1 className='font-condensed text-5xl font-bold'>Add Template</h1>
      <form className='w-1/2' onSubmit={handleSubmit}>
        {" "}
        {/* Removed () from handleSubmit */}
        <div className='mb-4'>
          <label className='block mb-2'>Title</label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            className='w-full px-3 py-2 bg-zinc-900 text-white border rounded-md focus:outline-none focus:border-primary'
          />
          {errors.title && <span className='text-red-500'>{errors.title}</span>}
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Description</label>
          <input
            type='text'
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='w-full px-3 py-2 border bg-zinc-900 text-white rounded-md focus:outline-none focus:border-primary'
          />
          {errors.description && (
            <span className='text-red-500'>{errors.description}</span>
          )}
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Thumbnail Image</label>
          <input
            type='file'
            name='image'
            id='image'
            accept='.png, .jpg, .jpeg'
            onChange={handleChange}
            className='border border-white bg-zinc-900 px-3 py-2 rounded-xl'
          />
        </div>
        {/* <div className="mb-4">
                    <label className="block mb-2">Preview</label>
                    <input
                        type="file"
                        name='video'
                        id="video" accept=".mp4, .gif"
                        onChange={handleChange}
                        className="border border-white bg-zinc-900 px-3 py-2 rounded-xl"
                    />
                </div> */}
        <button
          type='submit'
          className='btn bg-zinc-900 text-white hover:invert border-white'>
          Add Template
        </button>
      </form>
      {showSuccess && <SuccessAlert message='Add Template Succeed!' />}
      {showError && <ErrorAlert message='Add Template Failed!' />}
    </div>
  );
}

export default RenderAddTemplate;
