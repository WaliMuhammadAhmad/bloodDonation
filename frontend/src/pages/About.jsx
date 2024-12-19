import React from "react";
import Navbar from "../components/Navbar";
import LandingPage from "../components/LandingPage";
import Intro from "../components/Intro";
import Gallery from "../components/Gallery";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import aboutData from "../data/pages/about";

export default function About() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='w-full min-h-screen bg-background text-text'>
      <Navbar />
      <LandingPage data={aboutData} />
      <Intro />
      <Gallery />
      <Testimonials />
      <Cards />
      <Footer />
    </div>
  );
}
