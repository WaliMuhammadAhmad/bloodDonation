import Topbar from "../dashboard/Topbar";
import User from "../dashboard/User";
import Admin from "../dashboard/Admin";
import { useLocation } from "react-router";

function Dashboard() {
  const location = useLocation();
  const renderType = location.pathname.split("/")[2];

  const renderContent = () => {
    if (renderType === "user") {
      return (
        <>
          <Topbar />
          <User />
        </>
      );
    } else if (renderType === "admin") {
      return (
        <>
          <Topbar />
          <Admin />
        </>
      );
    } else {
      return (
        <div className='text-center text-primary text-3xl'>Invalid Role</div>
      );
    }
  };

  return (
    <div className='bg-background text-text h-screen'>{renderContent()}</div>
  );
}

export default Dashboard;
