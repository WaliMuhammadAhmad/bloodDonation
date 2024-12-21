import { useState } from "react";

const theme = {
  ListItem:
    "flex justify-between items-center p-4 border rounded-lg bg-background shadow-md gap-4",
  SectionTitle: "text-text text-2xl font-bold py-2",
  ActionButton: "btn btn-sm",
};

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

  // CRUD Functions
  const deleteDonor = (id) => {
    setDonors((prev) => prev.filter((donor) => donor.id !== id));
  };

  return (
    <div className='container mx-auto px-4'>
      <h1 className={theme.SectionTitle}>Manage Donors</h1>
      <div className='flex flex-col gap-3'>
        {donors.map((donor) => (
          <div key={donor.id} className={theme.ListItem}>
            {/* Donor Details */}
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

            {/* Actions */}
            <div className='flex gap-2'>
              <button
                className={`${theme.ActionButton} btn-error`}
                onClick={() => deleteDonor(donor.id)}>
                Delete
              </button>
              {/* Add Update Logic Here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RenderManageDonors;
