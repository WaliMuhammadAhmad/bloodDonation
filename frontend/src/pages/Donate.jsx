import React from "react";
import Navbar from "../components/Navbar";
import Starter from "../components/Starter";
import Slides from "../components/Slides";
import Cards from "../components/Cards";
import Footer from "../components/Footer";

class Content {
  constructor(title1, img1, title2, img2) {
    this.title1 = title1;
    this.img1 = img1;
    this.title2 = title2;
    this.img2 = img2;
  }
}

const slides1 = new Content(
  "glow",
  "img/slides/glow.png",
  "neon",
  "img/slides/neon.png"
);
const slides2 = new Content(
  "zoom",
  "img/slides/zoom.png",
  "morph",
  "img/slides/trawa.jpg"
);
const slides3 = new Content(
  "swip",
  "img/slides/swip.png",
  "tech",
  "img/slides/tech.jpg"
);
const slides4 = new Content(
  "swip-x",
  "img/slides/swip_x.png",
  "creative",
  "img/slides/creative.png"
);
const slides5 = new Content(
  "sketch",
  "img/slides/bean.png",
  "cartoon",
  "img/slides/onboard.jpg"
);
const slides6 = new Content(
  "avatar",
  "img/slides/GPT4.png",
  "morph",
  "img/slides/vise.jpg"
);
const slides7 = new Content(
  "roadmap",
  "img/slides/roadmap.png",
  "bubbles",
  "img/slides/bubble.png"
);
const slides8 = new Content(
  "netflix",
  "img/slides/netflix.png",
  "spotify",
  "img/slides/spotify.png"
);

const slidesArray = [
  slides1,
  slides2,
  slides3,
  slides4,
  slides5,
  slides6,
  slides7,
  slides8,
];

const renderContent = () => {
  return slidesArray.map((content, index) => (
    <div key={index} className='p-1 '>
      <Slides
        title1={content.title1}
        img1={content.img1}
        title2={content.title2}
        img2={content.img2}
      />
    </div>
  ));
};

export default function Donate() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='w-full text-white'>
      <Navbar user={storedUser} />
      <Starter text='Our Work' />
      <div className='py-20'>{renderContent()}</div>
      <Cards />
      <Footer />
    </div>
  );
}
