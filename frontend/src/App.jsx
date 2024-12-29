import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Appeal from "./pages/Appeal";
import Donate from "./pages/Donate";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Panel from "./pages/Panel";
import Approach from "./pages/Approach";
import Locations from "./pages/Locations";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/appeal",
    element: <Appeal />,
  },
  {
    path: "/approach",
    element: <Approach />,
  },
  {
    path: "/donate",
    element: <Donate />,
  },
  {
    path: "/locations",
    element: <Locations />,
  },
  {
    path: "/checkout/:id",
    element: <Checkout />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/panel/:id",
    element: <Panel />,
  },
  {
    path: "/dashboard/:id",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  // eslint-disable-next-line no-unused-vars
  const locomotiveScroll = new LocomotiveScroll();
  return <RouterProvider router={router} />;
}

export default App;
