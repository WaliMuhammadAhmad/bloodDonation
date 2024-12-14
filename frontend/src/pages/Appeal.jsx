import React from "react";
import Navbar from "../components/Navbar";
import Starter from "../components/Starter";
import Content from "../components/Content";
import VideoAnimation from "../components/VideoAnimation";
import Founder from "../components/Founder";
import Reviews from "../components/Reviews";
import Cards from "../components/Cards";
import Footer from "../components/Footer";

let msg = {
  title: "Founder's Message",
  text: "We are a team of professional designers and developers who are dedicated to creating beautiful and effective websites and presentations. We are passionate about our work and we love to turn our clients visions into reality. We are committed to providing the best possible service to our clients and we are always looking for new ways to improve our work. We are always looking for new challenges and we",
};

export default function Appeal() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='text-white'>
      <Navbar user={storedUser} />
      <Starter text='Service' />
      <VideoAnimation />
      <Content />
      <div className='w-full p-[10vh] bg-[#CDEA68] font-display rounded-tl-3xl rounded-tr-3xl border-b border-zinc-900 text-black'>
        <p className='text-[3vw] leading-[3.5vw] tracking-tight text-justify'>
          <b className='capitalize  underline hover:no-underline'>
            {" "}
            Let’s be honest.{" "}
          </b>
          There are really no excuses to have a bad presentation anymore. No one
          has time for poorly communicated ideas. Focus on what you do best —
          growing your business, while we do our best at making your
          presentations awesome.
        </p>
      </div>
      <Founder {...msg} />
      <Reviews />
      <Cards />
      <Footer />
    </div>
  );
}
