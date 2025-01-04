import { useState, useEffect } from "react";
import { theme } from "./theme";
import axios from "axios";

const dummyDonate = [
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
function RenderDonarRequests({ role }) {
  const [Donate, setDonate] = useState([]);

  // GET
  useEffect(() => {
    const fetchDonate = async () => {
      try {
        const response = await axios.get("/admin/donationrequests");
        if (response.data && response.data.length > 0) {
          setDonate(response.data);
        } else {
          setDonate(dummyDonate);
        }
      } catch (error) {
        console.error("Error fetching Donate:", error);
        setDonate(dummyDonate);
      }
    };

    fetchDonate();
  }, []);

  const cancelAppeal = async (id) => {
    try {
      await axios.put(`/donationrequest/reject/${id}`, { status: "Cancelled" });
      setDonate((prev) =>
        prev.map((appeal) =>
          appeal.id === id ? { ...appeal, status: "Cancelled" } : appeal
        )
      );
    } catch (error) {
      console.error("Error cancelling appeal:", error);
    }
  };

  const approveAppeal = async (id) => {

    try {
      const res = await axios.put(`/admin/donationrequest/approve/${id}`, { remarks: "APPROVED" });
      alert(res.data);
      setDonate((prev) =>
        prev.map((appeal) =>
          appeal.requestID === id ? { ...appeal, status: "APPROVED" } : appeal
        )
      );
    } catch (error) {
      console.error("Error approving appeal:", error);
    }
  };

  const rejectAppeal = async (id) => {
    try {
      const res = await axios.put(`/admin/donationrequest/reject/${id}`, { remarks: "REJECTED" });
      alert(res.data);
      setDonate((prev) =>
        prev.map((appeal) =>
          appeal.requestID === id ? { ...appeal, status: "REJECTED" } : appeal
        )
      );
    } catch (error) {
      console.error("Error rejecting appeal:", error);
    }
  };

  const deleteAppeal = async (id) => {
    try {
      await axios.delete(`/api/blood-Donate/${id}`);
      setDonate((prev) => prev.filter((appeal) => appeal.id !== id));
    } catch (error) {
      console.error("Error deleting appeal:", error);
    }
  };

  const renderDonate = (status) =>
    Donate
      .filter((appeal) => appeal.status === status)
      .map((appeal) => (
        <div key={appeal.requestID} className={theme.ProjectCards}>
          <div className='flex flex-col gap-1 text-text'>
            <p>
              <span className='font-bold'>User:</span> {appeal.user.name}
            </p>
            <p>
              <span className='font-bold'>Blood Type:</span> {appeal.bloodGroup.bloodGroup}
            </p>
            <p>
              <span className='font-bold'>Quantity:</span> {appeal.quantity}{" "}
              Units
            </p>
            <p>
              <span className='font-bold'>Email:</span> {appeal.user.email}
            </p>
            <p>
              <span className='font-bold'>Location:</span> {appeal.location}
            </p>
          </div>
          <div className='flex gap-2'>
            {role === "admin" && status === "PENDING" && (
              <>
                <button
                  className={`${theme.ActionButton} btn-success`}
                  onClick={() => approveAppeal(appeal.requestID)}>
                  Approve
                </button>
                <button
                  className={`${theme.ActionButton} btn-error`}
                  onClick={() => rejectAppeal(appeal.requestID)}>
                  Reject
                </button>
              </>
            )}
            {role === "admin" && status === "APPROVED" && (
              <button
                className={`${theme.ActionButton} btn-error`}
                onClick={() => deleteAppeal(appeal.requestID)}>
                Delete
              </button>
            )}
            {role === "admin" && status === "REJECTED" && (
              <>
                <button
                  className={`${theme.ActionButton} btn-success`}
                  onClick={() => approveAppeal(appeal.requestID)}>
                  Approve Again
                </button>
                <button
                  className={`${theme.ActionButton} btn-error`}
                  onClick={() => deleteAppeal(appeal.requestID)}>
                  Delete
                </button>
              </>
            )}
            {role !== "admin" && status === "PENDING" && (
              <button
                className={`${theme.ActionButton} btn-error`}
                onClick={() => cancelAppeal(appeal.requestID)}>
                Cancel
              </button>
            )}
          </div>
        </div>
      ));

  return (
    <div className='flex flex-col gap-5 h-full'>
      <div className='w-full'>
        <h2 className={theme.SectionTitle}>Pending Donate</h2>
        <div className='flex flex-col gap-3'>{renderDonate("PENDING")}</div>
      </div>
      <div className='w-full'>
        <h2 className={theme.SectionTitle}>Approved Donate</h2>
        <div className='flex flex-col gap-3'>{renderDonate("APPROVED")}</div>
      </div>
      <div className='w-full'>
        <h2 className={theme.SectionTitle}>Rejected Donate</h2>
        <div className='flex flex-col gap-3'>{renderDonate("REJECTED")}</div>
      </div>
    </div>
  );
}

export default RenderDonarRequests;
