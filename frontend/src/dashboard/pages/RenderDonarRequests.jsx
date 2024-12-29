import { useState, useEffect } from "react";
import { theme } from "./theme";
import axios from "axios";

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
  const [requests, setRequests] = useState([]);

  // Fetch requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/api/blood-donation-requests");
        if (response.data && response.data.length > 0) {
          setRequests(response.data); // Use backend data if available
        } else {
          setRequests(dummyRequests); // Fallback to dummy data
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        setRequests(dummyRequests); // Fallback to dummy data on error
      }
    };

    fetchRequests();
  }, []);

  // Update request status (PUT request)
  const updateRequestStatus = async (id, status) => {
    try {
      await axios.put(`/api/blood-donation-requests/${id}`, { status });
      setRequests((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  // Delete request (DELETE request)
  const deleteRequest = async (id) => {
    try {
      await axios.delete(`/api/blood-donation-requests/${id}`);
      setRequests((prev) => prev.filter((request) => request.id !== id));
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  // Cancel request (for non-admin roles)
  const cancelRequest = (id) => {
    updateRequestStatus(id, "Cancelled");
  };

  // Approve request (for admin role)
  const approveRequest = (id) => {
    updateRequestStatus(id, "Approved");
  };

  // Reject request (for admin role)
  const rejectRequest = (id) => {
    updateRequestStatus(id, "Rejected");
  };

  // Render requests based on status
  const renderRequests = (status) =>
    requests
      .filter((request) => request.status === status)
      .map((request) => (
        <div key={request.id} className={theme.ProjectCards}>
          {/* Request Details */}
          <div className='flex flex-col gap-1 text-text'>
            <p>
              <span className='font-bold'>User:</span> {request.user}
            </p>
            <p>
              <span className='font-bold'>Blood Type:</span> {request.bloodType}
            </p>
            <p>
              <span className='font-bold'>Quantity:</span> {request.quantity}{" "}
              Units
            </p>
            <p>
              <span className='font-bold'>City:</span> {request.city}
            </p>
            <p>
              <span className='font-bold'>Location:</span> {request.location}
            </p>
            <p>
              <span className='font-bold'>Priority:</span> {request.priority}
            </p>
          </div>

          {/* Actions */}
          <div className='flex gap-2'>
            {role === "admin" && status === "Pending" && (
              <>
                <button
                  className={`${theme.ActionButton} btn-success`}
                  onClick={() => approveRequest(request.id)}>
                  Approve
                </button>
                <button
                  className={`${theme.ActionButton} btn-error`}
                  onClick={() => rejectRequest(request.id)}>
                  Reject
                </button>
              </>
            )}
            {role === "admin" && status === "Approved" && (
              <button
                className={`${theme.ActionButton} btn-error`}
                onClick={() => deleteRequest(request.id)}>
                Delete
              </button>
            )}
            {role === "admin" && status === "Rejected" && (
              <>
                <button
                  className={`${theme.ActionButton} btn-success`}
                  onClick={() => approveRequest(request.id)}>
                  Approve Again
                </button>
                <button
                  className={`${theme.ActionButton} btn-error`}
                  onClick={() => deleteRequest(request.id)}>
                  Delete
                </button>
              </>
            )}
            {role !== "admin" && status === "Pending" && (
              <button
                className={`${theme.ActionButton} btn-error`}
                onClick={() => cancelRequest(request.id)}>
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
