import { useState } from "react";
import bloodInventory from "../../data/content/bloodInventory";

const theme = {
  Card: "flex flex-col sm:flex-row justify-between items-center bg-background rounded-lg shadow-lg p-5 mb-5 w-full gap-4",
  BloodType: "text-primary font-bold text-lg",
  StockInfo: "text-text text-base",
  Status: "text-secondary text-base",
  Actions: "flex gap-4",
};

function RenderManageBloodInventory() {
  const [inventory, setInventory] = useState(bloodInventory);

  // Update stock
  const updateStock = (id, newStock) => {
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
  };

  // Update status
  const updateStatus = (id, newStatus) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  // Delete item
  const deleteItem = (id) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className='container flex flex-col gap-5 justify-start h-[85dvh]'>
        <h1 className='font-condensed text-5xl font-bold text-text'>
          Manage Blood Inventory
        </h1>
        <div className='flex flex-col w-full gap-2 pt-5 rounded-xl bg-background items-center'>
          {inventory.map((item) => (
            <div key={item.id} className={theme.Card}>
              {/* Blood Type */}
              <div className={theme.BloodType}>{item.type}</div>

              {/* Stock and Status */}
              <div className='flex flex-col sm:flex-row items-center gap-4'>
                <div className={theme.StockInfo}>
                  Stock: <span className='font-bold'>{item.stock} Units</span>
                </div>
                <div className={theme.Status}>
                  Status: <span className='font-bold'>{item.status}</span>
                </div>
              </div>

              {/* Actions */}
              <div className={theme.Actions}>
                {/* Update Stock */}
                <label className='input input-bordered flex items-center gap-2'>
                  <input
                    type='number'
                    className='grow'
                    placeholder='Units'
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value)) updateStock(item.id, value);
                    }}
                  />
                  <span className='badge badge-error'>Liters</span>
                </label>

                {/* Update Status */}
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
