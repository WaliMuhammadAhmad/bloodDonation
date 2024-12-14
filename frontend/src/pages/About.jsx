import React from "react";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Landingpage from "../components/LandingPage";
import Introduction from "../components/Goal";
import Founder from "../components/Founder";
import Reviews from "../components/Reviews";

function About() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let text = {
    title1: "eye-opening",
    title2: "eye-catching",
    title3: "presentations",
    url: "img/asserts/ecatching.jpg",
    subtitle: "why:",
    description:
      "Almost everything that needs to be communicated is better shown than explained.",
    btnText: "start the project",
    btnLink: "/project",
    scroll: -0.5,
  };

  let msg = {
    title: "Wali Muhammad Ahmad",
    text: "We are a team of professional designers and developers who are dedicated to creating beautiful and effective websites and presentations. We are passionate about our work and we love to turn our clients visions into reality. We are committed to providing the best possible service to our clients and we are always looking for new ways to improve our work. We are always looking for new challenges and we",
  };

  return (
    <div className='text-white'>
      <Navbar user={storedUser} />
      <Landingpage {...text} />
      <Introduction />
      <Founder {...msg} />
      <Reviews />
      <Cards />
      <Footer />
    </div>
  );
}

export default About;
