import Topbar from "../dashboard/Topbar";
import User from "../dashboard/User";
import Admin from "../dashboard/Admin";
import { useLocation } from "react-router";

function Dashboard() {
  const location = useLocation();
  const person = {
    name: "Wali Muhammad",
    img: "img/social/founder.jpg",
  };

  const admin = {
    name: "Wali Muhammad",
    img: "img/social/founder.jpg",
  };

  if (location === "user") {
    return (
      <div className='bg-zinc-900 text-white'>
        <Topbar {...person} />
        <User />
      </div>
    );
  } else if (location == "admin") {
    return (
      <div className='bg-zinc-900 text-white'>
        <Topbar {...admin} />
        <Admin />
      </div>
    );
  } else return null;
}

export default Dashboard;
