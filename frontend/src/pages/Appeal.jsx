import React from "react";
import Navbar from "../components/Navbar";
import Starter from "../components/Starter";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import Form from "../components/Form";

export default function Appeal() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='text-white'>
      <Navbar />
      <Starter text='Apeal for Blood' />
      <Form />
      <Testimonials />
      <Cards />
      <Footer />
    </div>
  );
}
