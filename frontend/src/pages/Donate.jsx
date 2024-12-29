import React from "react";
import Navbar from "../components/Navbar";
import Starter from "../components/Starter";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Testimonials from "../components/Testimonials";

export default function Donate() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    title: "Donate Blood",
    text: "Please fill out the form below to donate blood.",
  };

  return (
    <div className='w-full text-text'>
      <Navbar user={storedUser} />
      <Starter title={content.title} text={content.text} />
      <Form />
      <Testimonials />
      <Cards />
      <Footer />
    </div>
  );
}
