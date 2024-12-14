import React, { useState, useEffect } from "react";
import axios from "axios";
import { SuccessAlert, ErrorAlert } from "../../components/common/Alerts";

function RenderManageUser() {
  const [users, setUsers] = useState([]);
  const [totalUsers, settotalUsers] = useState(0);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const deleteUser = async (id) => {
    const data = {
      id: id,
    };
    const response = await axios.post(
      `http://localhost:8080/user/delete`,
      data
    );
    response.data;

    if (response.data.success) {
      const newUsers = users.filter((user) => user._id != id);
      setUsers(newUsers);
      setShowSuccess(true);
    } else {
      setShowError(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/user");
        // (response.data.data);
        if (response.data.success) {
          setUsers(response.data.data);
          settotalUsers(response.data.data.length);
        } else if (response == null || response.data == null) {
          alert("No Review found");
        } else {
          console.error("Failed to fetch users:", response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {showSuccess && <SuccessAlert message='Profile Deleted Successfully!' />}
      {showError && <ErrorAlert message='Profile Delete Failed!' />}
      <div className='container mx-auto px-4'>
        <h1 className='font-condensed text-5xl font-bold'>Manage Users</h1>
        <div className='flex flex-col w-full gap-2 pt-5 rounded-xl bg-zinc-900 items-center'>
          <h1 className='text-[#CDEA68] text-lg font-semibold'>Total Users</h1>
          <h1 className='text-[#CDEA68] font-condensed text-8xl font-bold'>
            {totalUsers}
          </h1>
        </div>

        <div className='overflow-x-auto pt-5'>
          <table className='table'>
            {/* Table Head */}
            <thead>
              <tr>
                <th className='text-display text-lg'>Id</th>
                <th className='text-display text-lg'>First Name</th>
                <th className='text-display text-lg'>Last Name</th>
                <th className='text-display text-lg'>Email</th>
                <th className='text-display text-lg'>Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        onClick={() => {
                          deleteUser(user._id);
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

export default RenderManageUser;
