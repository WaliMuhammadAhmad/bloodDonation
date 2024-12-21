import { useState } from "react";

const theme = {
  ProjectCards:
    "flex p-4 justify-between items-center border rounded-xl bg-background gap-4",
  SectionTitle: "text-text text-2xl font-bold py-2",
  ActionButton: "btn btn-sm",
};

const dummyAppeals = [
  {
    id: 1,
    user: "John Doe",
    bloodType: "A+",
    quantity: 2,
    city: "New York",
    location: "5th Avenue",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    user: "Jane Smith",
    bloodType: "B+",
    quantity: 1,
    city: "Los Angeles",
    location: "Sunset Blvd",
    priority: "Low",
    status: "Approved",
  },
  {
    id: 3,
    user: "Alice Johnson",
    bloodType: "O-",
    quantity: 3,
    city: "Chicago",
    location: "Lake Shore Drive",
    priority: "Medium",
    status: "Rejected",
  },
];

// eslint-disable-next-line react/prop-types
function RenderManageBloodAppeals({ role }) {
  const [appeals, setAppeals] = useState(dummyAppeals);

  // Cancel Appeal (only for non-admin roles)
  const cancelAppeal = (id) => {
    setAppeals((prev) =>
      prev.map((appeal) =>
        appeal.id === id ? { ...appeal, status: "Cancelled" } : appeal
      )
    );
  };

  // Approve Appeal (only for admin role)
  const approveAppeal = (id) => {
    setAppeals((prev) =>
      prev.map((appeal) =>
        appeal.id === id ? { ...appeal, status: "Approved" } : appeal
      )
    );
  };

  // Reject Appeal (only for admin role)
  const rejectAppeal = (id) => {
    setAppeals((prev) =>
      prev.map((appeal) =>
        appeal.id === id ? { ...appeal, status: "Rejected" } : appeal
      )
    );
  };

  // Delete Appeal (only for admin role)
  const deleteAppeal = (id) => {
    setAppeals((prev) => prev.filter((appeal) => appeal.id !== id));
  };

  const renderAppeals = (status) =>
    appeals
      .filter((appeal) => appeal.status === status)
      .map((appeal) => (
        <div key={appeal.id} className={theme.ProjectCards}>
          {/* Appeal Details */}
          <div className='flex flex-col gap-1 text-text'>
            <p>
              <span className='font-bold'>User:</span> {appeal.user}
            </p>
            <p>
              <span className='font-bold'>Blood Type:</span> {appeal.bloodType}
            </p>
            <p>
              <span className='font-bold'>Quantity:</span> {appeal.quantity}{" "}
              Units
            </p>
            <p>
              <span className='font-bold'>City:</span> {appeal.city}
            </p>
            <p>
              <span className='font-bold'>Location:</span> {appeal.location}
            </p>
            <p>
              <span className='font-bold'>Priority:</span> {appeal.priority}
            </p>
          </div>

          {/* Actions */}
          <div className='flex gap-2'>
            {role === "admin" && status === "Pending" && (
              <>
                <button
                  className={`${theme.ActionButton} btn-success`}
                  onClick={() => approveAppeal(appeal.id)}>
                  Approve
                </button>
                <button
                  className={`${theme.ActionButton} btn-error`}
                  onClick={() => rejectAppeal(appeal.id)}>
                  Reject
                </button>
              </>
            )}
            {role === "admin" && status === "Approved" && (
              <button
                className={`${theme.ActionButton} btn-error`}
                onClick={() => deleteAppeal(appeal.id)}>
                Delete
              </button>
            )}
            {role === "admin" && status === "Rejected" && (
              <>
                <button
                  className={`${theme.ActionButton} btn-success`}
                  onClick={() => approveAppeal(appeal.id)}>
                  Approve Again
                </button>
                <button
                  className={`${theme.ActionButton} btn-error`}
                  onClick={() => deleteAppeal(appeal.id)}>
                  Delete
                </button>
              </>
            )}
            {role !== "admin" && status === "Pending" && (
              <button
                className={`${theme.ActionButton} btn-error`}
                onClick={() => cancelAppeal(appeal.id)}>
                Cancel
              </button>
            )}
          </div>
        </div>
      ));

  return (
    <div className='flex flex-col gap-5 h-full'>
      {/* Pending Appeals */}
      <div className='w-full'>
        <h2 className={theme.SectionTitle}>Pending Appeals</h2>
        <div className='flex flex-col gap-3'>{renderAppeals("Pending")}</div>
      </div>

      {/* Approved Appeals */}
      <div className='w-full'>
        <h2 className={theme.SectionTitle}>Approved Appeals</h2>
        <div className='flex flex-col gap-3'>{renderAppeals("Approved")}</div>
      </div>

      {/* Rejected Appeals */}
      <div className='w-full'>
        <h2 className={theme.SectionTitle}>Rejected Appeals</h2>
        <div className='flex flex-col gap-3'>{renderAppeals("Rejected")}</div>
      </div>
    </div>
  );
}

export default RenderManageBloodAppeals;
