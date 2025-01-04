import { useState, useEffect } from "react";
import bloodInventory from "../../data/content/bloodInventory";
import { theme } from "./theme";
import cities from "../../data/pages/locations";
import CitiesSection from "../../components/CitiesSection";
import axios from "axios";

function RenderManageBloodInventory() {
  const [inventory, setInventory] = useState([]);
  const [addData, setAddData] = useState({
    bloodGroup: "",
    city: "",
    quantity: "",
  });
  const [removeData, setRemoveData] = useState({
    bloodGroup: "",
    city: "",
    quantity: "",
  });

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("/inventory/all");
        if (response.data && response.data.length > 0) {
          setInventory(response.data);
        } else {
          setInventory(bloodInventory);
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
        setInventory(bloodInventory);
      }
    };

    fetchInventory();
  }, []);

  const addBlood = async () => {
    const { bloodGroup, city, quantity } = addData;

    if (!bloodGroup || !city || !quantity) {
      alert("Please fill in all fields before adding blood.");
      return;
    }

    try {
      const response = await axios.post("admin/addblood", {
        bloodGroup,
        city,
        quantity: parseInt(quantity, 10),
      });
      alert(response.data);

      const updatedInventory = await axios.get("/inventory/all");
      setInventory(updatedInventory.data);

      setAddData({ bloodGroup: "", city: "", quantity: "" });
    } catch (error) {
      console.error("Error adding blood:", error);
      alert(error.response?.data || "An error occurred while adding blood.");
    }
  };

  const removeBlood = async () => {
    const { bloodGroup, city, quantity } = removeData;

    if (!bloodGroup || !city || !quantity) {
      alert("Please fill in all fields before removing blood.");
      return;
    }

    try {
      const response = await axios.post("admin/removeblood", {
        bloodGroup,
        city,
        quantity: parseInt(quantity, 10),
      });
      alert(response.data);

      const updatedInventory = await axios.get("/inventory/all");
      setInventory(updatedInventory.data);

      setRemoveData({ bloodGroup: "", city: "", quantity: "" });
    } catch (error) {
      console.error("Error removing blood:", error);
      alert(error.response?.data || "An error occurred while removing blood.");
    }
  };

  return (
    <div>
      <div className="container flex flex-col gap-5 justify-start">
        <h1 className="font-condensed text-5xl font-bold text-text">
          Manage Blood Inventory
        </h1>

        {/* Add and Remove Blood Sections Side by Side */}
        <div className="flex flex-col md:flex-row gap-5 bg-background p-5 rounded-xl shadow-md">
          {/* Add Blood Section */}
          <div className="flex flex-col items-center gap-4 bg-primary p-5 rounded-xl shadow-md w-full md:w-1/2">
            <h2 className="text-xl font-semibold text-black">Add Blood to Inventory</h2>
            <div className="flex flex-col gap-3 w-full">
              <select
                className="select select-bordered"
                value={addData.bloodGroup}
                onChange={(e) =>
                  setAddData({ ...addData, bloodGroup: e.target.value })
                }
              >
                <option disabled>
                  Select Blood Group
                </option>
                {bloodInventory.map((blood)=>(
                  <option value={blood.type} key={blood.id}>{blood.type}</option>
                ))}
              </select>
              <select
                className="select select-bordered"
                value={addData.city}
                onChange={(e) =>
                  setAddData({ ...addData, city: e.target.value })
                }
              >
                <option value="" disabled>
                  Select City
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="input input-bordered"
                placeholder="Enter Quantity to Add"
                value={addData.quantity}
                onChange={(e) =>
                  setAddData({ ...addData, quantity: e.target.value })
                }
              />
              <button className="btn bg-background text-white" onClick={addBlood}>
                Add Blood
              </button>
            </div>
          </div>

          {/* Remove Blood Section */}
          <div className="flex flex-col items-center gap-4 bg-primary p-5 rounded-xl shadow-md w-full md:w-1/2">
            <h2 className="text-xl font-semibold text-black">Remove Blood from Inventory</h2>
            <div className="flex flex-col gap-3 w-full">
              <select
                className="select text-text select-bordered"
                value={removeData.bloodGroup}
                onChange={(e) =>
                  setRemoveData({ ...removeData, bloodGroup: e.target.value })
                }
              >
                <option disabled>
                  Select Blood Group
                </option>
                {bloodInventory.map((blood)=>(
                  <option value={blood.type} key={blood.id}>{blood.type}</option>
                ))}
              </select>
              <select
                className="select select-bordered"
                value={removeData.city}
                onChange={(e) =>
                  setRemoveData({ ...removeData, city: e.target.value })
                }
              >
                <option value="" disabled>
                  Select City
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="input input-bordered"
                placeholder="Enter Quantity to Remove"
                value={removeData.quantity}
                onChange={(e) =>
                  setRemoveData({ ...removeData, quantity: e.target.value })
                }
              />
              <button className="btn btn-error text-white" onClick={removeBlood}>
                Remove Blood
              </button>
            </div>
          </div>
        </div>
        <>
        <CitiesSection />
        </>
        {/* Inventory List */}
        <div className="flex flex-col w-full gap-2 pt-5 rounded-xl bg-background items-center mt-5">
          <h2 className="text-2xl font-semibold text-text">Blood Inventory</h2>
          {inventory.map((item) => (
            <div key={item.inventoryID} className={theme.Card}>
              <div className={theme.BloodType}>
                Blood Type: {item.bloodGroup.bloodGroup}
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className={theme.Status}>
                  City: <span className="font-bold">{item.city}</span>
                </div>
                <div className={theme.StockInfo}>
                  Stock: <span className="font-bold">{item.quantity} Liters</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RenderManageBloodInventory;
