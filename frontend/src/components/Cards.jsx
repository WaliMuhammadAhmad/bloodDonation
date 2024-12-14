import cardsData from "../data/common/cards";

const theme = {
  cardContainer: "lg:h-1/2 h-full w-full",
  card: "card relative flex flex-col items-center justify-center rounded-xl w-full h-full sm:h-50",
  cardText:
    "absolute lg:px-5 lg:py-1 sm:text-sm rounded-full lg:border-2 lg:left-5 lg:bottom-10 left-2 bottom-5 text-white font-display",
};

export default function Cards() {
  return (
    <div
      data-scroll
      data-scroll-section
      className='w-full h-screen bg-background flex flex-col lg:flex-row items-center justify-center lg:px-32 p-10 md:p-20 gap-5 border-b border-zinc-700'>
      <div className={theme.cardContainer}>
        <div className={`${theme.card} bg-primary`}>
          <img
            className='w-32 invert'
            src={cardsData[0].image}
            alt={cardsData[0].alt}
          />
          <p className={theme.cardText}>{cardsData[0].text}</p>
        </div>
      </div>

      <div className={`${theme.cardContainer} flex flex-col sm:flex-row gap-5`}>
        <div className={`${theme.card} bg-primary`}>
          <img
            className='w-32'
            src={cardsData[1].image}
            alt={cardsData[1].alt}
          />
          <p className={theme.cardText}>{cardsData[1].text}</p>
        </div>
        <div className={`${theme.card} bg-[#212121]`}>
          <img
            className='w-32'
            src={cardsData[2].image}
            alt={cardsData[2].alt}
          />
          <p className={theme.cardText}>{cardsData[2].text}</p>
        </div>
      </div>
    </div>
  );
}
