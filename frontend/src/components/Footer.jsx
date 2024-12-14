import Title from "./common/Title";
import Heading from "./common/Heading";
import footerData from "../data/common/footer";

export default function Footer() {
  return (
    <footer className='w-full bg-background text-text font-condensed p-10 sm:p-5 text-pretty'>
      <div className='flex flex-col md:flex-row gap-10 md:gap-20'>
        <div className='w-full md:w-1/2 flex flex-col justify-between'>
          <div className='heading'>
            <Title>{footerData.title}</Title>
          </div>
          <div className='text-xl mt-4'>
            <h2 className='capitalize text-secondary font-bold'>
              &copy; {new Date().getFullYear()} {footerData.title} Design
            </h2>
          </div>
        </div>

        <div className='w-full md:w-1/2 flex flex-col justify-between'>
          <Heading>{footerData.subtitle}</Heading>
          <div className='flex flex-col sm:flex-row sm:flex-wrap gap-10 mt-6'>
            <div className='details'>
              <h2 className='text-secondary font-bold'>Contact:</h2>
              {footerData.contact.map((item, index) => (
                <a
                  key={index}
                  className='block text-md hover:underline'
                  href={item.link}>
                  {item.text}
                </a>
              ))}
            </div>

            {/* Location */}
            <div className='details'>
              <h2 className='text-secondary font-bold'>Location:</h2>
              <a
                className='block text-md hover:underline'
                href={footerData.location.link}>
                {footerData.location.text}
              </a>
            </div>

            {/* Social */}
            <div className='social'>
              <h2 className='text-secondary font-bold'>Social:</h2>
              {footerData.social.map((item, index) => (
                <a
                  key={index}
                  className='block text-md hover:underline'
                  href={item.link}>
                  {item.text}
                </a>
              ))}
            </div>

            {/* Quick Links */}
            <div className='quick'>
              <h2 className='text-secondary font-bold'>Quick Links:</h2>
              {footerData.quickLinks.map((item, index) => (
                <a
                  key={index}
                  className='block text-md hover:underline'
                  href={item.link}>
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legal Terms */}
      <div className='text-xl mt-10 border-t border-zinc-700 pt-5'>
        <h2 className='text-secondary font-bold'>Legal Terms</h2>
      </div>
    </footer>
  );
}
