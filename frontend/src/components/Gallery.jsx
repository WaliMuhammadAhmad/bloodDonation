import { impactData } from "../data/pages/home";
import Title from "./common/Title";
import Button from "./common/Button";

export default function Gallery() {
  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed={impactData.scrollSpeed}
      className='w-full h-[90dvh] min-h-5/6 bg-background text-text flex flex-col gap-10 justify-center items-center'>
      {/* Title and Subtitle */}
      <div className='text-center'>
        <Title>{impactData.title}</Title>
        <p className='text-xl text-primary mt-2'>{impactData.subtitle}</p>
      </div>

      {/* Dynamic Data Cards */}
      <div className='flex flex-wrap justify-center items-center gap-8 w-full max-w-6xl px-4'>
        {/* Card 1: Total Donations */}
        <div className='border-primary border-2 h-40 flex flex-col justify-center rounded-lg  p-6 flex-1 min-w-[300px] max-w-[400px] text-center shadow-lg'>
          <h3 className='text-2xl font-bold text-primary'>Total Donations</h3>
          <p className='text-lg mt-2'>{impactData.stats.totalDonations}</p>
        </div>

        {/* Card 2: Total Lives Saved */}
        <div className='border-primary border-2 h-40 flex flex-col justify-center rounded-lg  p-6 flex-1 min-w-[300px] max-w-[400px] text-center shadow-lg'>
          <h3 className='text-2xl font-bold text-primary'>Total Lives Saved</h3>
          <p className='text-lg mt-2'>{impactData.stats.totalLivesSaved}</p>
        </div>

        {/* Card 3: Donation Centers */}
        <div className='border-primary border-2 h-40 flex flex-col justify-center rounded-lg  p-6 flex-1 min-w-[300px] max-w-[400px] text-center shadow-lg'>
          <h3 className='text-2xl font-bold text-primary'>Donation Centers</h3>
          <p className='text-lg mt-2'>{impactData.stats.donationCenters}</p>
        </div>
      </div>

      {/* Button */}
      <div className=''>
        <Button to={impactData.buttonLink} className='w-fit border-2'>
          {impactData.buttonText}
        </Button>
      </div>
    </div>
  );
}
