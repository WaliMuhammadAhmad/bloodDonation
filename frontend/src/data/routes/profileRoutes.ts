interface NavItem {
  name: string;
  path: string;
}

// Navigation for admin profile
const adminProfile: NavItem[] = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Logout", path: "/logout" },
];

// Navigation for donors profile
const donarProfile: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Donations", path: "/panel/donations" },
  { name: "Last Checkout", path: "/checkout/donate" },
  { name: "About", path: "/about" },
  { name: "Logout", path: "/logout" },
];

// Navigation for users profile
const userProfile: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Appeals", path: "/panel/appeals" },
  { name: "Last Checkout", path: "/checkout/appeal" },
  { name: "Logout", path: "/logout" },
];

export { adminProfile, donarProfile, userProfile };
