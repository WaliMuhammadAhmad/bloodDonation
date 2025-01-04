import React from "react";
import Navbar from "../components/Navbar";
import Starter from "../components/Starter";
import Intro from "../components/Intro";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import CitiesSection from "../components/CitiesSection";

export default function Approach() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='w-full min-h-screen bg-background text-text'>
      <Navbar />
      <Starter
        title='Locations'
        text='We are committed to providing the best possible service to our donors and recipients.'
      />
      <Intro />
      <CitiesSection />
      <Testimonials />
      <Cards />
      <Footer />
    </div>
  );
}
