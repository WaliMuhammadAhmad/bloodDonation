import { motion, useAnimation } from 'framer-motion'
import React from 'react'

const theme = {
    cardContainer: 'cardcontainer relative lg:w-1/2 lg:h-3/4 sm:h-full',
    cardText: 'absolute flex text-[#CDEA68] overflow-hidden top-1/2 -translate-y-1/2 z-[9] leading-none tracking-tighter lg:text-8xl'
}
function Slides(props) {

    let title1 = props.title1;
    let title2 = props.title2;

    const cards = [useAnimation(), useAnimation()]

    const handleHoverStart = (index) => {
        cards[index].start({ y: "0" })
    }

    const handleHoverEnd = (index) => {
        cards[index].start({ y: "100%" })
    }

    return (

        <div className='px-10 py-2 flex flex-col gap-5 justify-center items-center'>
            <div className='cards w-full lg:flex gap-10 mt-10'>
                <motion.div
                    onHoverStart={() => handleHoverStart(0)}
                    onHoverEnd={() => handleHoverEnd(0)}
                    className={theme.cardContainer}>
                    <h1 className={`right-0 translate-x-1/2 ${theme.cardText}`}>
                        {title1.split("").map((letter, index) => (
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={cards[0]}
                                transition={{ ease: [0.22, 1, 0.36, 1], delay: index * .1 }}
                                className='inline-block uppercase' key={index}>{letter}
                            </motion.span>
                        ))}
                    </h1>
                    <a href={"/slideinfo"} className='card w-full h-full rounded-xl overflow-hidden'>
                        <img className='w-full h-full bg-cover' src={props.img1} alt={props.title1} />
                    </a>
                </motion.div>
                <motion.div
                    onHoverStart={() => handleHoverStart(1)}
                    onHoverEnd={() => handleHoverEnd(1)}
                    className={theme.cardContainer}>
                    <h1 className={`lg:left-0 lg:-translate-x-1/2 ${theme.cardText} `}>
                        {title2.split("").map((letter, index) => (
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={cards[1]}
                                transition={{ ease: [0.22, 1, 0.36, 1], delay: index * .1 }}
                                className='inline-block uppercase' key={index}>{letter}
                            </motion.span>
                        ))}
                    </h1>
                    <a href={"/slideinfo"} className='card w-full h-full rounded-xl overflow-hidden'>
                        <img className='w-full h-full' src={props.img2} alt={props.title2} />
                    </a>
                </motion.div>
            </div>
        </div>

    )
}

export default Slides