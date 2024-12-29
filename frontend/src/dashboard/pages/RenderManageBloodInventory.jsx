import { useState, useEffect } from "react";
import bloodInventory from "../../data/content/bloodInventory";
import { theme } from "./theme";
import axios from "axios";

function RenderManageBloodInventory() {
  const [inventory, setInventory] = useState(bloodInventory);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("/api/blood-inventory");
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

  const updateStock = async (id, newStock) => {
    try {
      await axios.put(`/api/blood-inventory/${id}`, { stock: newStock });
      setInventory((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                stock: newStock,
                status: newStock === 0 ? "Out of Inventory" : item.status,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/blood-inventory/${id}`, { status: newStatus });
      setInventory((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/blood-inventory/${id}`);
      setInventory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <div className='container flex flex-col gap-5 justify-start'>
        <h1 className='font-condensed text-5xl font-bold text-text'>
          Manage Blood Inventory
        </h1>
        <div className='flex flex-col w-full gap-2 pt-5 rounded-xl bg-background items-center'>
          {inventory.map((item) => (
            <div key={item.id} className={theme.Card}>
              <div className={theme.BloodType}>{item.type}</div>
              <div className='flex flex-col sm:flex-row items-center gap-4'>
                <div className={theme.StockInfo}>
                  Stock: <span className='font-bold'>{item.stock} Units</span>
                </div>
                <div className={theme.Status}>
                  Status: <span className='font-bold'>{item.status}</span>
                </div>
              </div>
              <div className={theme.Actions}>
                <label className='input input-bordered flex items-center gap-2'>
                  <input
                    type='number'
                    className='grow'
                    placeholder='Units'
                    value={item.stock}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value)) updateStock(item.id, value);
                    }}
                  />
                  <span className='badge badge-error'>Liters</span>
                </label>
                <select
                  className='select select-bordered w-full max-w-xs'
                  onChange={(e) => updateStatus(item.id, e.target.value)}
                  value={item.status}>
                  <option disabled>Select Status</option>
                  <option>Available</option>
                  <option>Low Stock</option>
                  <option>Out of Inventory</option>
                  <option>Not Available</option>
                </select>
                <button
                  className='btn btn-error'
                  onClick={() => deleteItem(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RenderManageBloodInventory;
