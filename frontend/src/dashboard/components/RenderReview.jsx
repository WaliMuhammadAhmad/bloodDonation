import React, { useState } from "react";
import { SuccessAlert, ErrorAlert } from "../../components/common/Alerts";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

function RenderReview() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [review, setReview] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Function to handle review input change
  const handleReviewChange = (event) => {
    const newReview = event.target.value;
    setReview(newReview);
    setIsValid(
      newReview.trim() !== "" && newReview.trim().split(/\s+/).length <= 300
    );
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (review) {
      try {
        const response = await axios.put(`/userreview/${storedUser._id}`, {
          review,
        });
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
    <div>
      <h1 className='font-condensed text-5xl font-bold text-white'>
        You might wanna say something about our service :
      </h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className='w-full h-48 p-4 border rounded-xl font-display bg-zinc-900'
          value={review}
          onChange={handleReviewChange}
          placeholder='Write your review here...'></textarea>
        <div className='flex justify-end mt-4'>
          <button
            type='submit'
            className={`px-4 py-2 rounded ${
              isValid
                ? "bg-red-500 text-white hover:bg-green-600"
                : "bg-zinc-300 text-zinc-600 cursor-not-allowed"
            }`}
            disabled={!isValid}>
            Post
          </button>
        </div>
      </form>
      {showSuccess && <SuccessAlert message='Review Posted Successfully!' />}
      {showError && <ErrorAlert message='Review Post Failed!' />}
    </div>
  );
}

export default RenderReview;
