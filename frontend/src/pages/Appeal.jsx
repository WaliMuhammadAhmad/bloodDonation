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

  const content = {
    title: "Apeal for Blood",
    text: "Please fill out the form below to request blood from donors.",
  };

  return (
    <div className='text-text'>
      <Navbar />
      <Starter title={content.title} text={content.text} />
      <Form />
      <Testimonials />
      <Cards />
      <Footer />
    </div>
  );
}
