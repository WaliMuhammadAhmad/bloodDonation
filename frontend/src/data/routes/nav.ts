interface NavItem {
  name: string;
  path: string;
}

// Navigation for admin
const adminNav: NavItem[] = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Manage Donations", path: "/admin/donations" },
  { name: "Manage Appeals", path: "/admin/appeals" },
  { name: "Manage Users", path: "/admin/users" },
  { name: "Manage Donors", path: "/admin/donors" },
];

// Navigation for unauthenticated users (guests)
const guestNav: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Donate", path: "/donate" },
  { name: "Appeal", path: "/appeal" },
  { name: "About", path: "/about" },
  { name: "Get Started", path: "/signup" },
];

// Navigation for regular users (donors and users)
const userNav: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Donate", path: "/donate" },
  { name: "Appeal", path: "/appeal" },
  { name: "About", path: "/about" },
  { name: "Profile", path: "/profile" },
];

export { userNav, adminNav, guestNav };
