import React, { useState, useEffect } from "react";
import axios from "axios";

function RenderManageReview() {
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/user");

        if (response.data.success) {
          setReviews(response.data.data);

          setTotalReviews(response.data.data.length);
        } else if (response == null || response.data == null) {
          alert("No Review found");
        } else {
          console.error("Failed to fetch reviews:", response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="container mx-auto px-4">
        <h1 className="font-condensed text-5xl font-bold">
          Manage Users Review
        </h1>
        <div className="flex flex-col w-full gap-2 pt-5 rounded-xl bg-zinc-900 items-center">
          <h1 className="text-[#CDEA68] text-lg font-semibold">
            Total Reviews
          </h1>
          <h1 className="text-[#CDEA68] font-condensed text-8xl font-bold">
            {/* {totalReviews} */}
            0
          </h1>
        </div>

        <div className="overflow-x-auto pt-5">
          <table className="table">
            {/* Table Head */}
            <thead>
              <tr>
                <th className="text-display text-lg">Id</th>
                <th className="text-display text-lg">Name</th>
                <th className="text-display text-lg">Review</th>
                <th className="text-display text-lg">Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {reviews.map((review, index) => {
                if (review.review) {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{review.firstName}</td>
                      <td>{review.review}</td>
                      <td>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RenderManageReview;
