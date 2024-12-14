import { IntoSection } from "../data/pages/home";
import Button from "./common/Button";
import Title from "./common/Title";

export default function Intro() {
  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed={IntoSection.scrollSpeed}
      className='w-full h-auto flex flex-col gap-10 min-h-5/6 p-3 sm:p-5 md:p-10 lg:p-15 bg-primary text-text rounded-tl-xl rounded-tr-xl sm:rounded-tl-3xl sm:rounded-tr-3xl '>
      <p className='lg:text-3xl md:text-xl sm:text-lg text-md tracking-tight text-justify'>
        <b className='capitalize underline hover:no-underline'>
          {IntoSection.title}
        </b>
        {IntoSection.description}
      </p>
      <div className='w-full flex flex-wrap gap-5 pt-10 border-t-[0.1vh] border-text justify-between'>
        <div className='flex flex-col gap-2 flex-wrap'>
          <Title>Our Approach</Title>
          <Button
            className='w-fit'
            to={IntoSection.buttonLink}
            variant='outlined'>
            Read More
          </Button>
        </div>
        <img
          className='size-full sm:size-2/5 rounded-xl'
          src={IntoSection.url}
          alt={IntoSection.alt}
        />
      </div>
    </div>
  );
}
