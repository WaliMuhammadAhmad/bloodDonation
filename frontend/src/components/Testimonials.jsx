import { testimonialsData } from "../data/pages/home";
import Title from "./common/Title";
import Button from "./common/Button";

export default function Testimonials() {
  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed={testimonialsData.scrollSpeed}
      className='w-full h-auto p-5 sm:p-1 min-h-screen bg-primary text-text flex flex-col flex-wrap text-pretty justify-center items-center'>
      {/* Title and Subtitle */}
      <div className='text-center mb-10'>
        <Title>{testimonialsData.title}</Title>
        <p className='text-xl text-text mt-2'>{testimonialsData.subtitle}</p>
      </div>

      {/* Testimonials Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl px-4'>
        {/* Donor Testimonials */}
        <div className='bg-zinc-800 rounded-lg p-6 shadow-lg'>
          <h3 className='text-2xl font-bold text-primary'>Donors</h3>
          {testimonialsData.donorTestimonials.map((testimonial, index) => (
            <div key={index} className='mt-4'>
              <p className='text-lg'>{testimonial.quote}</p>
              <p className='text-secondary mt-2'>- {testimonial.name}</p>
            </div>
          ))}
        </div>

        {/* Recipient Testimonials */}
        <div className='bg-zinc-800 rounded-lg p-6 shadow-lg'>
          <h3 className='text-2xl font-bold text-primary'>Recipients</h3>
          {testimonialsData.recipientTestimonials.map((testimonial, index) => (
            <div key={index} className='mt-4'>
              <p className='text-lg'>{testimonial.quote}</p>
              <p className='text-secondary mt-2'>- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Motivation Stats */}
      <div className='mt-10 text-center'>
        <p className='text-lg'>
          {testimonialsData.stats.donors} donated{" "}
          {testimonialsData.stats.liters} of blood to various donation centers.
        </p>
        <p className='text-lg mt-2'>
          {testimonialsData.stats.recipients} recipients received blood
          donations in the last month.
        </p>
      </div>

      {/* Buttons */}
      <div className='mt-10 flex flex-col md:flex-row gap-4'>
        <Button
          to={testimonialsData.buttons[0].link}
          className='border-text text-text'>
          {testimonialsData.buttons[0].text}
        </Button>
        <Button
          to={testimonialsData.buttons[1].link}
          className='bg-text hover:border-text hover:text-text'>
          {testimonialsData.buttons[1].text}
        </Button>
      </div>
    </div>
  );
}
