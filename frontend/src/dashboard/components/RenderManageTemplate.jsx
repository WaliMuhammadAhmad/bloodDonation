import React, { useState, useEffect } from "react";
import axios from "axios";

function RenderManageTemplate() {
  const [slides, setSlides] = useState([]);
  const [totalslides, setTotalslides] = useState(0);
  const deleteSlide = async (id) => {
    const data = {
      id: id,
    };
    id;
    const response = await axios.post(
      `http://localhost:8080/slide/delete`,
      data
    );
    response.data;

    if (response.data.success) {
      const newSlide = slides.filter((slide) => slide._id != id);
      setSlides(newSlide);
      setShowSuccess(true);
    } else {
      setShowError(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/slides");
        response;
        if (response.data.success) {
          setSlides(response.data.data);
          setTotalslides(response.data.data.length);
        } else if (response == null || response.data == null) {
          alert("No slide found");
        } else {
          console.error("Failed to fetch slides:", response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className='container mx-auto px-4'>
        <h1 className='font-condensed text-5xl font-bold'>Manage Slides</h1>
        <div className='flex flex-col w-full gap-2 pt-5 rounded-xl bg-zinc-900 items-center'>
          <h1 className='text-[#CDEA68] text-lg font-semibold'>Total Slides</h1>
          <h1 className='text-[#CDEA68] font-condensed text-8xl font-bold'>
            {totalslides}
          </h1>
        </div>

        <div className='overflow-x-auto pt-5'>
          <table className='table'>
            {/* Table Head */}
            <thead>
              <tr>
                <th className='text-display text-lg'>Id</th>
                <th className='text-display text-lg'>Title</th>
                <th className='text-display text-lg'>Description</th>
                <th className='text-display text-lg'>Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {slides.map((slide, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{slide.title}</td>
                    <td>{slide.description}</td>
                    <td>
                      <button
                        onClick={() => {
                          deleteSlide(slide._id);
                        }}
                        className='bg-red-500 text-white px-4 py-2 rounded-md'>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RenderManageTemplate;
