import { useState, useEffect } from "react";
import { theme } from "./theme";
import axios from "axios";

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
  const [appeals, setAppeals] = useState([]);

  // GET
  useEffect(() => {
    const fetchAppeals = async () => {
      try {
        const response = await axios.get("/admin/bloodappeals");
        if (response.data && response.data.length > 0) {
          setAppeals(response.data);
        } else {
          setAppeals(dummyAppeals);
        }
      } catch (error) {
        console.error("Error fetching appeals:", error);
        setAppeals(dummyAppeals);
      }
    };

    fetchAppeals();
  }, []);

  const cancelAppeal = async (id) => {
    try {
      await axios.put(`/bloodappeal/reject/${id}`, { status: "Cancelled" });
      setAppeals((prev) =>
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
      const res = await axios.put(`/admin/bloodappeal/approve/${id}`, { remarks: "APPROVED" });
      alert(res.data);
      setAppeals((prev) =>
        prev.map((appeal) =>
          appeal.appealID === id ? { ...appeal, status: "APPROVED" } : appeal
        )
      );
    } catch (error) {
      console.error("Error approving appeal:", error);
    }
  };

  const rejectAppeal = async (id) => {
    try {
      const res = await axios.put(`/admin/bloodappeal/reject/${id}`, { remarks: "REJECTED" });
      alert(res.data);
      setAppeals((prev) =>
        prev.map((appeal) =>
          appeal.appealID === id ? { ...appeal, status: "REJECTED" } : appeal
        )
      );
    } catch (error) {
      console.error("Error rejecting appeal:", error);
    }
  };

  const deleteAppeal = async (id) => {
    try {
      await axios.delete(`/api/blood-appeals/${id}`);
      setAppeals((prev) => prev.filter((appeal) => appeal.id !== id));
    } catch (error) {
      console.error("Error deleting appeal:", error);
    }
  };

  const renderAppeals = (status) =>
    appeals
      .filter((appeal) => appeal.status === status)
      .map((appeal) => (
        <div key={appeal.appealID} className={theme.ProjectCards}>
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
                  onClick={() => approveAppeal(appeal.appealID)}>
                  Approve
                </button>
                <button
                  className={`${theme.ActionButton} btn-error`}
                  onClick={() => rejectAppeal(appeal.appealID)}>
                  Reject
                </button>
              </>
            )}
            {role === "admin" && status === "APPROVED" && (
              <button
                className={`${theme.ActionButton} btn-error`}
                onClick={() => deleteAppeal(appeal.appealID)}>
                Delete
              </button>
            )}
            {role === "admin" && status === "REJECTED" && (
              <>
                <button
                  className={`${theme.ActionButton} btn-success`}
                  onClick={() => approveAppeal(appeal.appealID)}>
                  Approve Again
                </button>
                <button
                  className={`${theme.ActionButton} btn-error`}
                  onClick={() => deleteAppeal(appeal.appealID)}>
                  Delete
                </button>
              </>
            )}
            {role !== "admin" && status === "Pending" && (
              <button
                className={`${theme.ActionButton} btn-error`}
                onClick={() => cancelAppeal(appeal.appealID)}>
                Cancel
              </button>
            )}
          </div>
        </div>
      ));

  return (
    <div className='flex flex-col gap-5 h-full'>
      <div className='w-full'>
        <h2 className={theme.SectionTitle}>Pending Appeals</h2>
        <div className='flex flex-col gap-3'>{renderAppeals("PENDING")}</div>
      </div>
      <div className='w-full'>
        <h2 className={theme.SectionTitle}>Approved Appeals</h2>
        <div className='flex flex-col gap-3'>{renderAppeals("APPROVED")}</div>
      </div>
      <div className='w-full'>
        <h2 className={theme.SectionTitle}>Rejected Appeals</h2>
        <div className='flex flex-col gap-3'>{renderAppeals("REJECTED")}</div>
      </div>
    </div>
  );
}

export default RenderManageBloodAppeals;
