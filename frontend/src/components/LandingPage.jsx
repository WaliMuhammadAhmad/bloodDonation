/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import ActionButton from "./common/ActionButton";

export default function LandingPage({ data }) {
  return (
    <div
      data-scroll
      data-scroll-speed={data.scrollSpeed}
      className='w-full h-screen bg-background text-text'>
      <div className='h-5/6 px-10 sm:px-20 flex flex-col justify-center'>
        {[data.title1, data.title2, data.title3].map((text, index) => {
          return (
            <div className='masker' key={index}>
              <div className='w-fit flex items-end mb-2 sm:mb-0'>
                {index === 1 && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "8vw" }}
                    transition={{ ease: "easeOut", duration: 1, delay: 0.5 }}>
                    <img
                      className='hidden sm:block lg:mb-3 mb-1 rounded-lg lg:h-[4.5rem] md:h-[3rem] sm:h-[2rem] h-[2.5rem] pr-1'
                      src={data.url}
                      alt={data.alt}
                    />
                  </motion.div>
                )}
                <h1 className='flex items-center h-full uppercase text-5xl sm:text-[6vw] sm:leading-[6vw] tracking-tighter'>
                  {text}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
      <div className='p-5 sm:px-8 sm:py-5 border-t-[1px] border-zinc-800 flex gap-2 justify-between content-baseline'>
        {[data.subtitle, data.description].map((text, index) => (
          <div className='masker' key={index}>
            <p
              key={index}
              className='lg:text-lg tracking-tight leading-none text-pretty'>
              {text}
            </p>
          </div>
        ))}
        <ActionButton text={data.buttonText} link={data.buttonLink} />
      </div>
    </div>
  );
}
