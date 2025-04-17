import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "../05-Header/Header";
import Footer from "../06-Footer/Footer";
import Home from "../01-Home/Home";
import Tours from "../02-Tours/Tours";
import Cars from "../03-Cars/Cars";
import Contact from "../04-Contact/Contact";
import ToursTemplate from "../../pages/ToursTemplate/ToursTemplate";
import CarsTemplate from "../../pages/CarsTemplate/CarsTemplate";
import CarRental from "../03-Cars/CarRental";
// import Booking from "../07-Booking/Booking";
import TermsCondition from "../../pages/Terms&Condition/TermsCondition";
import Privacy from "../../pages/Privacy/Privacy";
// import Login from "../../components/08-Login/Login";
// import Signup from "../../components/09-Signup/Signup";
// import Profile from "../10-Profile/Profile";

function Layout() {
  const location = useLocation();
  const hideHeaderFooterRoutes = ["/signup"];
  const hideOnlyFooterRoutes = ["/login"];

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    location.pathname
  );
  const shouldHideFooter = hideOnlyFooterRoutes.includes(location.pathname);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tourDetails" element={<ToursTemplate />} />
        <Route path="/carDetails" element={<CarsTemplate />} />
        <Route path="/carRental" element={<CarRental />} />
        <Route path="/cars" element={<Cars />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/booking" element={<Booking />} /> */}
        <Route path="/terms" element={<TermsCondition />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      {!shouldHideHeaderFooter && !shouldHideFooter && <Footer />}
    </>
  );
}

export default function MainRoutes() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
