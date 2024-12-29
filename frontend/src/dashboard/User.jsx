import { useState } from "react";
import RenderProfile from "./pages/RenderProfile";
import RenderManageBloodAppeals from "./pages/RenderManageBloodAppeals";
import RenderDonarRequests from "./pages/RenderDonarRequests";
import RenderHome from "./pages/RenderHome";

const theme = {
  SidebarItems:
    "font-display tracking-tight py-2 px-2 hover:rounded-l-xl hover:border hover:bg-primary cursor-pointer",
  HomeCards: "w-1/2 mx-2 bg-primary shadow-lg rounded-lg bg-background py-10",
  HomeProject: "px-5 bg-primary shadow-lg rounded-lg bg-background py-10",
  ProjectCards:
    "flex justify-around items-center border rounded-xl bg-background",
};

function User() {
  const [selectedItem, setSelectedItem] = useState("Home");

  // Function to handle sidebar item click
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className='flex h-auto overflow-y-scroll'>
      {/* Sidebar */}
      <div className='bg-background text-text w-64 flex-shrink-0'>
        <div className='py-6 pl-6 flex flex-col'>
          <ul className='mt-6'>
            <li
              className={`${theme.SidebarItems} ${
                selectedItem === "Home" ? "bg-primary rounded-l-xl" : ""
              }`}
              onClick={() => handleItemClick("Home")}>
              Home
            </li>
            <li
              className={`${theme.SidebarItems} ${
                selectedItem === "Appeals" ? "bg-primary rounded-l-xl" : ""
              }`}
              onClick={() => handleItemClick("Appeals")}>
              Appeals
            </li>
            <li
              className={`${theme.SidebarItems} ${
                selectedItem === "Donations" ? "bg-primary rounded-l-xl" : ""
              }`}
              onClick={() => handleItemClick("Donations")}>
              Donation
            </li>
            <li
              className={`${theme.SidebarItems} ${
                selectedItem === "Review" ? "bg-primary rounded-l-xl" : ""
              }`}
              onClick={() => handleItemClick("Review")}>
              Review
            </li>
            <li
              className={`${theme.SidebarItems} ${
                selectedItem === "Profile" ? "bg-primary rounded-l-xl" : ""
              }`}
              onClick={() => handleItemClick("Profile")}>
              Profile
            </li>
          </ul>
        </div>
      </div>
      {/* Content */}
      <div className='flex-1 bg-primary rounded-l-xl p-10 '>
        {selectedItem === "Home" && <RenderHome role='user' />}
        {selectedItem === "Appeals" && <RenderManageBloodAppeals role='user' />}
        {selectedItem === "Donations" && <RenderDonarRequests role='user' />}
        {selectedItem === "Profile" && <RenderProfile role='user' />}
      </div>
    </div>
  );
}

export default User;
