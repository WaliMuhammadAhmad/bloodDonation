const homeData = {
  title: "Bloodline Connect",
  subtitle: "Join our mission to save lives by donating blood.",
  title1: "Every drop counts",
  title2: "and brings hope",
  title3: "to those in need.",
  url: "img/hope.png",
  alt: "Hope",
  buttonText: "See the Process",
  buttonLink: "/approach",
  scrollSpeed: -0.5,
};

const IntoSection = {
  title: "Our Objective",
  description:
    " is to bridge the gap between donors and those in need, ensuring that every drop of blood donated saves lives and brings hope. We are committed to creating a seamless, accessible, and impactful platform that empowers individuals to make a difference. Together, we can build a healthier, more compassionate world.",
  sectionTitle: "Our Apporach",
  buttonText: "Read More",
  buttonLink: "/approach",
  url: "img/assets/discover.svg",
  alt: "Discover the process",
  scrollSpeed: 0.1,
};

const impactData = {
  title: "Our Impact",
  subtitle: "Every Drop Counts",
  stats: {
    totalDonations: "10,000 liters",
    totalLivesSaved: "5,000 lives",
    donationCenters: "10 centers",
  },
  buttonText: "See Our Locations",
  buttonLink: "/locations",
};

const testimonialsData = {
  title: "Join the Movement",
  subtitle: "Hear from Our Donors and Recipients",
  donorTestimonials: [
    {
      name: "John Doe",
      quote: "Donating blood is the easiest way to make a difference.",
    },
    {
      name: "Jane Smith",
      quote: "I feel proud to be part of this life-saving mission.",
    },
  ],
  recipientTestimonials: [
    {
      name: "Sarah Johnson",
      quote: "Your donation saved my life. Thank you!",
    },
    {
      name: "Michael Brown",
      quote: "I’m forever grateful to the donors who helped me.",
    },
  ],
  stats: {
    donors: "1,000 donors",
    liters: "5,000 liters",
    recipients: "2,000 recipients",
  },
  buttons: [
    { text: "Donate Now", link: "/donate" },
    { text: "Request Blood", link: "/appeal" },
  ],
  image: "/images/testimonials.png", // Path to the testimonials image
};

const callToActionData = {
  title: "Need Blood? We’re Here to Help.",
  subtitle: "Request Blood and Save a Life Today.",
  description:
    "It’s easy to request blood through our platform. Join us in saving lives.",
  buttons: [
    { text: "Request Blood", link: "/appeal" },
    { text: "Learn More", link: "/about" },
  ],
  scrollSpeed: 0.3,
};

export {
  homeData,
  IntoSection,
  impactData,
  testimonialsData,
  callToActionData,
};
