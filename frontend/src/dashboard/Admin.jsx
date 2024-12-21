import { useState } from "react";
import RenderManageBloodAppeals from "./pages/RenderManageBloodAppeals";
import RenderManageBloodInventory from "./pages/RenderManageBloodInventory";
import RenderDonarRequests from "./pages/RenderDonarRequests";
import RenderManageDonors from "./pages/RenderManageDonors";
import RenderManageUser from "./pages/RenderManageUser";
import RenderProfile from "./pages/RenderProfile";
import RenderHome from "./pages/RenderHome";

const theme = {
  SidebarItems:
    "tracking-tight p-2 hover:rounded-l-xl hover:border hover:bg-primary cursor-pointer",
};

function Admin() {
  const [selectedItem, setSelectedItem] = useState("Home");

  // Function to handle sidebar item click
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className='flex'>
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
                selectedItem === "Manage Blood Inventory"
                  ? "bg-primary rounded-l-xl"
                  : ""
              }`}
              onClick={() => handleItemClick("Manage Blood Inventory")}>
              Manage Blood Inventory
            </li>
            <li
              className={`${theme.SidebarItems} ${
                selectedItem === "Manage Blood Appeals"
                  ? "bg-primary rounded-l-xl"
                  : ""
              }`}
              onClick={() => handleItemClick("Manage Blood Appeals")}>
              Manage Blood Appeals
            </li>
            <li
              className={`${theme.SidebarItems} ${
                selectedItem === "Manage Donar Requests"
                  ? "bg-primary rounded-l-xl"
                  : ""
              }`}
              onClick={() => handleItemClick("Manage Donar Requests")}>
              Manage Donar Requests
            </li>
            <li
              className={`${theme.SidebarItems} ${
                selectedItem === "Manage Users" ? "bg-primary rounded-l-xl" : ""
              }`}
              onClick={() => handleItemClick("Manage Users")}>
              Manage Users
            </li>
            <li
              className={`${theme.SidebarItems} ${
                selectedItem === "Manage Donors"
                  ? "bg-primary rounded-l-xl"
                  : ""
              }`}
              onClick={() => handleItemClick("Manage Donors")}>
              Manage Donors
            </li>
            <li
              className={`${theme.SidebarItems} ${
                selectedItem === "Manage Profile"
                  ? "bg-primary rounded-l-xl"
                  : ""
              }`}
              onClick={() => handleItemClick("Manage Profile")}>
              Manage Profile
            </li>
          </ul>
        </div>
      </div>
      {/* Content */}
      <div className='flex-1 bg-primary rounded-l-xl p-10 min-h-[80dvh] h-auto overflow-y-scroll'>
        {selectedItem === "Home" && <RenderHome role='admin' />}
        {selectedItem === "Manage Blood Appeals" && (
          <RenderManageBloodAppeals role='admin' />
        )}
        {selectedItem === "Manage Blood Inventory" && (
          <RenderManageBloodInventory />
        )}
        {selectedItem === "Manage Donar Requests" && (
          <RenderDonarRequests role='admin' />
        )}
        {selectedItem === "Manage Donors" && <RenderManageDonors />}
        {selectedItem === "Manage Users" && <RenderManageUser />}
        {selectedItem === "Manage Profile" && <RenderProfile />}
      </div>
    </div>
  );
}

export default Admin;
