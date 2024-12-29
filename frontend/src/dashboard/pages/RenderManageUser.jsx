import { useState, useEffect } from "react";
import { theme } from "./theme";
import axios from "axios";

const dummyUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1-555-1234",
    city: "New York",
  },
  {
    id: 2,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    phone: "+1-555-5678",
    city: "Los Angeles",
  },
  {
    id: 3,
    name: "Charlie Green",
    email: "charlie.green@example.com",
    phone: "+1-555-9012",
    city: "Chicago",
  },
];

function RenderManageUser() {
  const [users, setUsers] = useState(dummyUsers);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        if (response.data && response.data.length > 0) {
          setUsers(response.data);
        } else {
          setUsers(dummyUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers(dummyUsers);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className='container mx-auto px-4'>
      <h1 className={theme.SectionTitle}>Manage Users</h1>
      <div className='flex flex-col gap-3'>
        {users.map((user) => (
          <div key={user.id} className={theme.ListItem}>
            <div className='flex flex-col gap-1 text-text'>
              <p>
                <span className='font-bold'>Name:</span> {user.name}
              </p>
              <p>
                <span className='font-bold'>Email:</span> {user.email}
              </p>
              <p>
                <span className='font-bold'>Phone:</span> {user.phone}
              </p>
              <p>
                <span className='font-bold'>City:</span> {user.city}
              </p>
            </div>
            <div className='flex gap-2'>
              <button
                className={`${theme.ActionButton} btn-error`}
                onClick={() => deleteUser(user.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RenderManageUser;
