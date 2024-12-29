import cities from "../data/pages/locations";
import Title from "./common/Title";

export default function CitiesSection() {
  return (
    <div
      data-scroll
      data-scroll-section
      className='w-full h-[90dvh] max-h-auto bg-background text-text flex flex-col gap-10 justify-center items-center'>
      {/* Title and Subtitle */}
      <div className='text-center'>
        <Title>Our Locations</Title>
      </div>

      {/* Dynamic Data Cards */}
      <div className='w-full px-4 overflow-y-auto'>
        <div className='flex flex-col gap-8 max-w-7xl mx-auto'>
          {cities.map((city) => (
            <div key={city.name} className='flex flex-col gap-4'>
              <h2 className='text-2xl font-bold text-text'>{city.name}</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {city.locations.map((location) => (
                  <div
                    key={location.name}
                    className='border border-zinc-700 rounded-lg p-4 bg-primary hover:bg-zinc-800 transition-colors'>
                    <h3 className='text-xl font-semibold text-text'>
                      {location.name}
                    </h3>
                    <p className='text-text mt-2'>{location.address}</p>
                    <div className='mt-4'>
                      <p className='text-text'>
                        <span className='font-bold'>
                          Blood Inventory Capacity:
                        </span>{" "}
                        {location.bloodInventoryCapacity} Units
                      </p>
                      <p className='text-text'>
                        <span className='font-bold'>Capacity Per Person:</span>{" "}
                        {location.capacityPerPerson} Units
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
