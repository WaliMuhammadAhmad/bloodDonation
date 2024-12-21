import { useState } from "react";

const theme = {
  ProjectCards:
    "flex p-4 justify-between items-center border rounded-xl bg-background gap-4",
  SectionTitle: "text-text text-2xl font-bold py-2",
  ActionButton: "btn btn-sm",
};

const dummyRequests = [
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
function RenderManageDonarRequests({ role }) {
  const [Requests, setRequests] = useState(dummyRequests);

  // Cancel Request (only for non-admin roles)
  const cancelRequest = (id) => {
    setRequests((prev) =>
      prev.map((Request) =>
        Request.id === id ? { ...Request, status: "Cancelled" } : Request
      )
    );
  };

  // Approve Request (only for admin role)
  const approveRequest = (id) => {
    setRequests((prev) =>
      prev.map((Request) =>
        Request.id === id ? { ...Request, status: "Approved" } : Request
      )
    );
  };

  // Reject Request (only for admin role)
  const rejectRequest = (id) => {
    setRequests((prev) =>
      prev.map((Request) =>
        Request.id === id ? { ...Request, status: "Rejected" } : Request
      )
    );
  };

  // Delete Request (only for admin role)
  const deleteRequest = (id) => {
    setRequests((prev) => prev.filter((Request) => Request.id !== id));
  };

  const renderRequests = (status) =>
    Requests.filter((Request) => Request.status === status).map((Request) => (
      <div key={Request.id} className={theme.ProjectCards}>
        {/* Request Details */}
        <div className='flex flex-col gap-1 text-text'>
          <p>
            <span className='font-bold'>User:</span> {Request.user}
          </p>
          <p>
            <span className='font-bold'>Blood Type:</span> {Request.bloodType}
          </p>
          <p>
            <span className='font-bold'>Quantity:</span> {Request.quantity}{" "}
            Units
          </p>
          <p>
            <span className='font-bold'>City:</span> {Request.city}
          </p>
          <p>
            <span className='font-bold'>Location:</span> {Request.location}
          </p>
          <p>
            <span className='font-bold'>Priority:</span> {Request.priority}
          </p>
        </div>

        {/* Actions */}
        <div className='flex gap-2'>
          {role === "admin" && status === "Pending" && (
            <>
              <button
                className={`${theme.ActionButton} btn-success`}
                onClick={() => approveRequest(Request.id)}>
                Approve
              </button>
              <button
                className={`${theme.ActionButton} btn-error`}
                onClick={() => rejectRequest(Request.id)}>
                Reject
              </button>
            </>
          )}
          {role === "admin" && status === "Approved" && (
            <button
              className={`${theme.ActionButton} btn-error`}
              onClick={() => deleteRequest(Request.id)}>
              Delete
            </button>
          )}
          {role === "admin" && status === "Rejected" && (
            <>
              <button
                className={`${theme.ActionButton} btn-success`}
                onClick={() => approveRequest(Request.id)}>
                Approve Again
              </button>
              <button
                className={`${theme.ActionButton} btn-error`}
                onClick={() => deleteRequest(Request.id)}>
                Delete
              </button>
            </>
          )}
          {role !== "admin" && status === "Pending" && (
            <button
              className={`${theme.ActionButton} btn-error`}
              onClick={() => cancelRequest(Request.id)}>
              Cancel
            </button>
          )}
        </div>
      </div>
    ));

  return (
    <div className='flex flex-col gap-5 h-full'>
      {/* Pending Requests */}
      <div className='w-full'>
        <h2 className={theme.SectionTitle}>Pending Requests</h2>
        <div className='flex flex-col gap-3'>{renderRequests("Pending")}</div>
      </div>

      {/* Approved Requests */}
      <div className='w-full'>
        <h2 className={theme.SectionTitle}>Approved Requests</h2>
        <div className='flex flex-col gap-3'>{renderRequests("Approved")}</div>
      </div>

      {/* Rejected Requests */}
      <div className='w-full'>
        <h2 className={theme.SectionTitle}>Rejected Requests</h2>
        <div className='flex flex-col gap-3'>{renderRequests("Rejected")}</div>
      </div>
    </div>
  );
}

export default RenderManageDonarRequests;
