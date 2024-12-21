import { useState, useEffect } from "react";
import axios from "axios";

function RenderManageAdmin() {
  const [admins, setAdmins] = useState([]);
  const [totaladmins, settotaladmins] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/admin");
        // (response.data.data);
        if (response.data.success) {
          setAdmins(response.data.data);
          settotaladmins(response.data.data.length);
        } else if (response == null || response.data == null) {
          alert("No Review found");
        } else {
          console.error("Failed to fetch admins:", response.data.message);
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
        <h1 className='font-condensed text-5xl font-bold'>Manage Admins</h1>
        <div className='flex flex-col w-full gap-2 pt-5 rounded-xl bg-background items-center'>
          <h1 className='bg-text text-lg font-semibold'>Total Admins</h1>
          <h1 className='bg-text font-condensed text-8xl font-bold'>
            {totaladmins}
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
              {admins.map((admin, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{admin.firstName}</td>
                    <td>{admin.lastName}</td>
                    <td>{admin.email}</td>
                    <td>
                      <button className='bg-red-500 text-text px-4 py-2 rounded-md'>
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

export default RenderManageAdmin;
