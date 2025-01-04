import { useState, useEffect } from "react";
import { theme } from "./theme";
import axios from "axios";

const dummyAppeals = [
  { id: 1, user: "John Doe", bloodGroup: "A+", status: "Pending" },
  { id: 2, user: "Jane Smith", bloodGroup: "B+", status: "Approved" },
  { id: 3, user: "Sam Wilson", bloodGroup: "O-", status: "Cancelled" },
];

const dummyDonorRequests = [
  { id: 1, donor: "Alice", bloodGroup: "A+", status: "Approved" },
  { id: 2, donor: "Bob", bloodGroup: "B+", status: "Pending" },
  { id: 3, donor: "Charlie", bloodGroup: "O-", status: "Cancelled" },
];

// eslint-disable-next-line react/prop-types
function RenderHome({ role }) {
  const [appeals, setAppeals] = useState([]);
  const [donorRequests, setDonorRequests] = useState([]);
  const [stats, setStats] = useState([]);

  // Fetch data based on role
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats
        const pendingDonations = await axios.get(`inventory/pendingDonations/count`);
        const pendingAppeals = await axios.get(`inventory/pendingAppeals/count`);
        const rejectedAppeals = await axios.get(`inventory/rejectedAppeals/count`);
        const rejectedDonations = await axios.get(`inventory/rejectedDonations/count`);

        const data = [{ title: "Pending Donor Requests", value: pendingDonations.data },
        { title: "Pending Blood Appeals", value: pendingAppeals.data },
        { title: "Rejected Blood Appeals", value: rejectedAppeals.data },
        { title: "Total Users", value: rejectedDonations.data },]
        setStats(data);

        // Fetch appeals
        if (role === "admin" || role === "user") {
          const appealsResponse = await axios.get("/api/appeals"); // add your adpi here for appeals
          setAppeals(
            appealsResponse.data.length > 0
              ? appealsResponse.data
              : dummyAppeals
          );
        }

        // Fetch donor requests
        if (role === "admin" || role === "donor") {
          const donorRequestsResponse = await axios.get("/admin/donationrequests"); // add your api here for requests - noman app try kro is ko ma khaha kahne laga koi issue ho ap call kr dena ok
          setDonorRequests(
            donorRequestsResponse.data.length > 0
              ? donorRequestsResponse.data
              : dummyDonorRequests
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to dummy data on error
        setAppeals(dummyAppeals);
        setDonorRequests(dummyDonorRequests);
        setStats(
          role === "admin"
            ? [
              { title: "Total Donor Requests", value: statsResponse.data },
              { title: "Total Appeals", value: 456 },
              { title: "Total Donors", value: 789 },
              { title: "Total Users", value: 321 },
            ]
            : role === "user"
              ? [
                { title: "My Appeals", value: 5 },
                { title: "Approved Appeals", value: 3 },
                { title: "Pending Appeals", value: 2 },
              ]
              : [
                { title: "My Donations", value: 10 },
                { title: "Pending Requests", value: 2 },
                { title: "Approved Requests", value: 5 },
              ]
        );
      }
    };

    fetchData();
  }, [role]);

  return (

    <div className=''>
      <div className='container flex flex-col gap-5 justify-center items-center h-[85dvh]'>
        {/* Stats Cards */}
        <div className='flex sm:flex-row flex-col w-full gap-2'>
          {stats.map((card, index) => (
            <div key={index} className={`${theme.HomeCards}`}>
              <div className='flex flex-col gap-2 text-center'>
                <div className={theme.CardTitle}>{card.title}</div>
                <div className={theme.CardValue}>{card.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Role-Based Sections */}
        {role === "admin" && (
          <>
            {/* Latest Appeals */}
            <div className='mt-5 w-full'>
              <h1 className='text-text text-2xl mb-3'>Latest Appeals</h1>
              <div className={theme.GridBox}>
                {appeals.map((appeal) => (
                  <div key={appeal.id} className={theme.GridItem}>
                    <p className='font-semibold'>{appeal.user}</p>
                    <p>Blood Group: {appeal.bloodGroup}</p>
                    <p className='text-primary'>Status: {appeal.status}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Donor Requests */}
            <div className='mt-5 w-full'>
              <h1 className='text-text text-2xl mb-3'>Latest Donor Requests</h1>
              <div className={theme.GridBox}>
                {donorRequests.map((request) => (
                  <div key={request.id} className={theme.GridItem}>
                    <p className='font-semibold'>{request.donor}</p>
                    <p>Blood Group: {request.bloodGroup}</p>
                    <p className='text-primary'>Status: {request.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {role === "user" && (
          <div className='mt-5 w-full'>
            <h1 className='text-text text-2xl mb-3'>My Appeals</h1>
            <div className={theme.GridBox}>
              {appeals.map((appeal) => (
                <div key={appeal.id} className={theme.GridItem}>
                  <p className='font-semibold'>{appeal.user}</p>
                  <p>Blood Group: {appeal.bloodGroup}</p>
                  <p className='text-primary'>Status: {appeal.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {role === "donor" && (
          <div className='mt-5 w-full'>
            <h1 className='text-text text-2xl mb-3'>My Donation Requests</h1>
            <div className={theme.GridBox}>
              {donorRequests.map((request) => (
                <div key={request.id} className={theme.GridItem}>
                  <p className='font-semibold'>{request.donor}</p>
                  <p>Blood Group: {request.bloodGroup}</p>
                  <p className='text-primary'>Status: {request.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RenderHome;
