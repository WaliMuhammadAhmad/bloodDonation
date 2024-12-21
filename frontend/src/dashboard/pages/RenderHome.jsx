const theme = {
  HomeCards: "w-full bg-background shadow-lg rounded-lg bg-background py-10",
  CardTitle: "text-text text-lg font-semibold",
  CardValue: "text-text text-8xl font-bold",
  GridBox: "grid grid-cols-1 sm:grid-cols-3 gap-4",
  GridItem:
    "p-4 bg-background shadow-md rounded-md border border-primary text-text text-center",
};

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
  const stats = {
    admin: [
      { title: "Total Donor Requests", value: 123 },
      { title: "Total Appeals", value: 456 },
      { title: "Total Donors", value: 789 },
      { title: "Total Users", value: 321 },
    ],
    user: [
      { title: "My Appeals", value: 5 },
      { title: "Approved Appeals", value: 3 },
      { title: "Pending Appeals", value: 2 },
    ],
    donor: [
      { title: "My Donations", value: 10 },
      { title: "Pending Requests", value: 2 },
      { title: "Approved Requests", value: 5 },
    ],
  };

  return (
    <div className=''>
      <div className='container flex flex-col gap-5 justify-center items-center h-[85dvh]'>
        {/* Stats Cards */}
        <div className='flex sm:flex-row flex-col w-full gap-2'>
          {stats[role].map((card, index) => (
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
                {dummyAppeals.map((appeal) => (
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
                {dummyDonorRequests.map((request) => (
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
              {dummyAppeals.map((appeal) => (
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
              {dummyDonorRequests.map((request) => (
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
