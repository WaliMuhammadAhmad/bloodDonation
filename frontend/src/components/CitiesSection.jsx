import { useState } from "react";
import bloodInventory from "../data/content/bloodInventory";
import cities from "../data/pages/locations";
import { theme } from "../dashboard/pages/theme";
import Title from "./common/Title";
import axios from "axios";

export default function CitiesSection() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!selectedCity || !selectedBloodGroup) {
      setError("Please select both city and blood group.");
      return;
    }

    try {
      // -> change original api name here
      const response = await axios.get("/api/getInventoryByBloodAndCity", {
        city: selectedCity,
        bloodGroup: selectedBloodGroup,
      });

      if (response.data) {
        setSearchResults([response.data]);
        setError("");
      } else {
        setError("No results found.");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setError("Failed to fetch inventory. Please try again.");
      setSearchResults([]);
    }
  };

  return (
    <div
      data-scroll
      data-scroll-section
      className='w-full min-h-[50dvh] h-auto bg-background text-text flex flex-col gap-10 justify-center items-center'>
      <div className='text-center'>
        <Title>Our Locations</Title>
      </div>
      <div>
        <div className='container flex flex-col gap-5 justify-start'>
          <div className='flex flex-col w-full gap-2 pt-5 rounded-xl bg-background items-center'>
            <div className={theme.Actions}>
              <div>
                <select
                  className='select select-bordered w-full max-w-xs'
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}>
                  <option disabled value=''>
                    Select City
                  </option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  className='select select-bordered w-full max-w-xs'
                  value={selectedBloodGroup}
                  onChange={(e) => setSelectedBloodGroup(e.target.value)}>
                  <option disabled value=''>
                    Blood Group
                  </option>
                  {bloodInventory.map((item) => (
                    <option key={item.type} value={item.type}>
                      {item.type}
                    </option>
                  ))}
                </select>
              </div>
              <button className='btn btn-error' onClick={handleSearch}>
                Search
              </button>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div key={result.inventoryID} className={theme.Card}>
                  <div className={theme.BloodType}>
                    {result.bloodGroup.bloodGroup}
                  </div>
                  <div className='flex flex-col sm:flex-row items-center gap-4'>
                    <div className={theme.StockInfo}>
                      Stock:{" "}
                      <span className='font-bold'>
                        {result.quantity} Liters
                      </span>
                    </div>
                    <div className={theme.Status}>
                      Status: <span className='font-bold'>Available</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-text'>No results to display.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
