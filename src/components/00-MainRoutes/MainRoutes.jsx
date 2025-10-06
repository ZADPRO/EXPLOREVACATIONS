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
import Booking from "../07-Booking/Booking";
import TermsCondition from "../../pages/Terms&Condition/TermsCondition";
import Privacy from "../../pages/Privacy/Privacy";
import Login from "../../components/08-Login/Login";
import Signup from "../../components/09-Signup/Signup";
import Profile from "../10-Profile/Profile";
import Parking from "../11-Parking/Parking";
import ParkingTemplate from "../12-ParkingTemplate/ParkingTemplate";
import Travel from "../13-Tarvel/Travel";
import Pdf from "../Pdf/index2";
import Success from "../14-Payment/Success";
import Failure from "../14-Payment/Failure";
import Caragreement from "../Pdf/Caragreement";
import Flight from "../15-FlightBooking/Flight";
import GeneralTandC from "../../pages/General/GeneralTandC";
import FormDetails from "../../pages/FormDetails/FormDetails";
import Event from "../07-Booking/Event";
import Impressum from "../../pages/Impressum/Impressum";
function Layout() {
  const location = useLocation();

  // Define routes where Header should be hidden
  const hideHeaderRoutes = ["/login", "/signup"];

  // Define routes where Footer should be hidden
  const hideFooterRoutes = ["/signup", "/login"];

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tourDetails" element={<ToursTemplate />} />
        <Route path="/carDetails" element={<CarsTemplate />} />
        <Route path="/carRental" element={<CarRental />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/transfer" element={<Travel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/flightform" element={<Flight/> } />
        <Route path="/parking" element={<Parking />} />
        <Route path="/parkingDetails" element={<ParkingTemplate />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/terms" element={<TermsCondition />} />
        <Route path="/privacy" element={<Privacy />} />
          <Route path="/impressum" element={<Impressum />} />
        <Route path="/pdf" element={<Pdf />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
        <Route path="/event" element={<Event />} />
        <Route path="/formdetails" element={<FormDetails/>} />
        <Route path="/generalpdf" element={<GeneralTandC />} />
        <Route path="/caragreement" element={<Caragreement />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
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
