import { useState, useEffect } from "react";
import { theme } from "./theme";
import axios from "axios";

const dummyDonors = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    bloodType: "O+",
    lastDonation: "2023-12-01",
    city: "New York",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    bloodType: "A-",
    lastDonation: "2023-11-15",
    city: "Los Angeles",
  },
  {
    id: 3,
    name: "Sam Wilson",
    email: "sam.wilson@example.com",
    bloodType: "B+",
    lastDonation: "2023-12-10",
    city: "Chicago",
  },
];

function RenderManageDonors() {
  const [donors, setDonors] = useState(dummyDonors);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("/api/donors");
        if (response.data && response.data.length > 0) {
          setDonors(response.data);
        } else {
          setDonors(dummyDonors);
        }
      } catch (error) {
        console.error("Error fetching donors:", error);
        setDonors(dummyDonors);
      }
    };

    fetchDonors();
  }, []);

  const deleteDonor = async (id) => {
    try {
      await axios.delete(`/api/donors/${id}`);
      setDonors((prev) => prev.filter((donor) => donor.id !== id));
    } catch (error) {
      console.error("Error deleting donor:", error);
    }
  };

  return (
    <div className='container mx-auto px-4'>
      <h1 className={theme.SectionTitle}>Manage Donors</h1>
      <div className='flex flex-col gap-3'>
        {donors.map((donor) => (
          <div key={donor.id} className={theme.ListItem}>
            <div className='flex flex-col gap-1 text-text'>
              <p>
                <span className='font-bold'>Name:</span> {donor.name}
              </p>
              <p>
                <span className='font-bold'>Email:</span> {donor.email}
              </p>
              <p>
                <span className='font-bold'>Blood Type:</span> {donor.bloodType}
              </p>
              <p>
                <span className='font-bold'>Last Donation:</span>{" "}
                {donor.lastDonation}
              </p>
              <p>
                <span className='font-bold'>City:</span> {donor.city}
              </p>
            </div>
            <div className='flex gap-2'>
              <button
                className={`${theme.ActionButton} btn-error`}
                onClick={() => deleteDonor(donor.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RenderManageDonors;
