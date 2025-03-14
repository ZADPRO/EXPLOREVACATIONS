import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../05-Header/Header";
import Footer from "../06-Footer/Footer";
import Home from "../01-Home/Home";
import Tours from "../02-Tours/Tours";
import Cars from "../03-Cars/Cars";
import Contact from "../04-Contact/Contact";
import ToursTemplate from "../../pages/ToursTemplate/ToursTemplate";
import CarRental from "../03-Cars/CarRental";

export default function MainRoutes() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tourDetails" element={<ToursTemplate />} />
          <Route path="/carRental" element={<CarRental />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
