import React, { useState, useRef, useEffect } from "react";

import { Send, CarFront, CarTaxiFront } from "lucide-react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

import budha from "../../assets/tours/buddha[1].jpg";

import home1 from "../../assets/homeCards/1.jpg";
import home2 from "../../assets/homeCards/2[1].jpg";
import home3 from "../../assets/homeCards/3[1].jpg";
import home4 from "../../assets/homeCards/4[1].jpg";

import Glide from "@glidejs/glide";

import { Carousel } from "primereact/carousel";

import business from "../../assets/service/busines.jpg";
import carRental from "../../assets/service/carRental.jpg";
import tourists from "../../assets/service/tourists.jpg";
import transfers from "../../assets/service/transfers.jpg";

import homeImg1 from "../../assets/homeCards/3.1[1].jpg";
import homeImg2 from "../../assets/homeCards/3.2[1].jpg";

import { Toast } from "primereact/toast";

import secure from "../../assets/home/secure.png";
import travel from "../../assets/home/travel.png";

import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 3,
  });

  const wrapperRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.keyCode === 39) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab >= 1 &&
          tabSelected.currentTab < tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab + 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: 1,
          });
        }
      }
    }

    if (e.keyCode === 37) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab > 1 &&
          tabSelected.currentTab <= tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab - 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.noTabs,
          });
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const [tourDestination, setTourDestination] = useState(null);
  const [tourFromDate, setTourFromDate] = useState(null);
  const [tourToDate, setTourToDate] = useState(null);
  const [tourGuest, setTourGuest] = useState(0);

  const [carPickupLocation, setCarPickupLocation] = useState(null);
  const [carPickupDateTime, setCarPickupDateTime] = useState(null);
  const [carDropLocation, setCarDropLocation] = useState(null);
  const [carDropDateTime, setCarDropDateTime] = useState(null);

  const [cabPickupLocation, setCabPickupLocation] = useState(null);
  const [cabPickupDateTime, setCabPickupDateTime] = useState(null);
  const [cabDropLocation, setCabDropLocation] = useState(null);

  const toast = useRef(null);

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const navigate = useNavigate();

  const handleExplore = () => {
    if (!tourDestination) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Destination is required",
      });
      return;
    }
    if (!tourFromDate) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "From date is required",
      });
      return;
    }
    if (!tourToDate) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "To date is required",
      });
      return;
    }
    if (!tourGuest) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Number of guests is required",
      });
      return;
    }

    navigate("/tours", {
      state: {
        tourDestination,
        tourFromDate,
        tourToDate,
        tourGuest,
      },
    });
    window.scrollTo(0, 0);
  };

  const handleCarExplore = () => {
    if (!cabPickupLocation) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Pick Up is required",
      });
      return;
    }
    if (!cabPickupDateTime) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Date & Time is required",
      });
      return;
    }
    if (!cabDropLocation) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Location is required",
      });
      return;
    }

    navigate("/carRental", {
      state: {
        cabPickupLocation,
        cabPickupDateTime,
        cabDropLocation,
      },
    });
    window.scrollTo(0, 0);
  };

  const services = [
    {
      title: "Transfers",
      image: transfers,
      description:
        "Enjoy a comfortable and safe journey with our professional drivers. Whether it’s an airport transfer, a city tour, or a long-distance trip, we ensure a premium travel experience tailored to your needs.",
    },
    {
      title: "Business",
      image: business,
      description:
        "Travel in style and comfort with our premium business class services. We understand your need for professionalism and luxury, making every journey seamless and sophisticated.",
    },
    {
      title: "Tourist",
      image: tourists,
      description:
        "Embark on an unforgettable journey with our well-planned vacation packages. Explore breathtaking destinations with ease and comfort, ensuring a memorable experience.",
    },
    {
      title: "Car Rental",
      image: carRental,
      description:
        "Choose from a wide range of well-maintained vehicles for your travel needs. Whether it's a short trip or an extended rental, we offer top-quality cars for a smooth ride.",
    },
  ];

  const whyChooseUs = [
    {
      title: "Meet & Greet",
      description: "Our driver is waiting for you in the arrival hall",
    },
    {
      title: "24/7 support",
      description: "Transfers around the clock all year round",
    },
    {
      title: "No hidden costs",
      description: "No additional costs for luggage and other equipment",
    },
    {
      title: "Best value",
      description:
        "Enjoy a high quality transfer experience at surprisingly low prices",
    },
    {
      title: "security",
      description: "A safe customer experience is an important goal in",
    },
    {
      title: "Service of the highest quality",
      description:
        "Our trust and professionalism are based on our many years of experience with highly qualified professional chauffeurs",
    },
  ];

  return (
    <div className="">
      <Toast ref={toast} />

      <div className="homePageContainer01">
        <div className="h-[80vh]"></div>
      </div>
      <div className="homePageContainer02 relative">
        <section
          className="w-11/12 md:w-9/12 mx-auto mt-[-40px] shadow-xl bg-white rounded-md"
          aria-multiselectable="false"
        >
          <ul
            className="flex items-center border-b border-slate-200"
            role="tablist"
            ref={wrapperRef}
          >
            <li className="" role="presentation">
              <button
                className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-3 text-sm font-medium tracking-wide transition duration-300 hover:bg-emerald-50 hover:stroke-[#02569c] focus:bg-emerald-50 focus-visible:outline-none disabled:cursor-not-allowed ${
                  tabSelected.currentTab === 1
                    ? "border-[#02569c] stroke-[#02569c] text-[#02569c] hover:border-[#02569c]  hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:border-slate-500"
                    : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-[#02569c] hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:text-slate-500"
                }`}
                id="tab-label-1ai"
                role="tab"
                aria-setsize="3"
                aria-posinset="1"
                tabindex={`${tabSelected.currentTab === 1 ? "0" : "-1"}`}
                aria-controls="tab-panel-1ai"
                aria-selected={`${
                  tabSelected.currentTab === 1 ? "true" : "false"
                }`}
                onClick={() =>
                  setTabSelected({ ...tabSelected, currentTab: 1 })
                }
              >
                <span className="order-2 ">Tour</span>
                <span className="relative only:-mx-6">
                  <Send />
                </span>
              </button>
            </li>
            <li className="" role="presentation">
              <button
                className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-3 text-sm font-medium tracking-wide transition duration-300 hover:bg-emerald-50 hover:stroke-[#02569c] focus:bg-emerald-50 focus-visible:outline-none disabled:cursor-not-allowed ${
                  tabSelected.currentTab === 2
                    ? "border-[#02569c] stroke-[#02569c] text-[#02569c] hover:border-[#02569c]  hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:border-slate-500"
                    : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-[#02569c] hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:text-slate-500"
                }`}
                id="tab-label-2ai"
                role="tab"
                aria-setsize="3"
                aria-posinset="2"
                tabindex={`${tabSelected.currentTab === 2 ? "0" : "-1"}`}
                aria-controls="tab-panel-2ai"
                aria-selected={`${
                  tabSelected.currentTab === 2 ? "true" : "false"
                }`}
                onClick={() =>
                  setTabSelected({ ...tabSelected, currentTab: 2 })
                }
              >
                <span className="order-2 ">Car</span>
                <CarFront />
              </button>
            </li>
            <li className="" role="presentation">
              <button
                className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-3 text-sm font-medium tracking-wide transition duration-300 hover:bg-emerald-50 hover:stroke-[#02569c] focus:bg-emerald-50 focus-visible:outline-none disabled:cursor-not-allowed ${
                  tabSelected.currentTab === 3
                    ? "border-[#02569c] stroke-[#02569c] text-[#02569c] hover:border-[#02569c]  hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:border-slate-500"
                    : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-[#02569c] hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:text-slate-500"
                }`}
                id="tab-label-3ai"
                role="tab"
                aria-setsize="3"
                aria-posinset="3"
                tabindex={`${tabSelected.currentTab === 3 ? "0" : "-1"}`}
                aria-controls="tab-panel-3ai"
                aria-selected={`${
                  tabSelected.currentTab === 3 ? "true" : "false"
                }`}
                onClick={() =>
                  setTabSelected({ ...tabSelected, currentTab: 3 })
                }
              >
                <span className="order-2 ">Cab</span>
                <span className="relative only:-mx-6">
                  <CarTaxiFront />{" "}
                </span>
              </button>
            </li>
          </ul>
          <div className="">
            <div
              className={`px-6 py-4 ${
                tabSelected.currentTab === 1 ? "" : "hidden"
              }`}
              id="tab-panel-1ai"
              aria-selected={`${
                tabSelected.currentTab === 1 ? "true" : "false"
              }`}
              role="tabpanel"
              aria-labelledby="tab-label-1ai"
              tabIndex="-1"
            >
              <div className="flex gap-3 lg:flex-row flex-column">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  <Dropdown
                    value={tourDestination}
                    onChange={(e) => setTourDestination(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Select Destination"
                    className="flex-1"
                  />
                </div>

                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-calendar-clock"></i>
                  </span>
                  <Calendar
                    value={tourFromDate}
                    placeholder="From"
                    className="flex-1"
                    onChange={(e) => setTourFromDate(e.value)}
                  />
                </div>

                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-calendar-clock"></i>
                  </span>
                  <Calendar
                    className="flex-1"
                    placeholder="To"
                    value={tourToDate}
                    onChange={(e) => setTourToDate(e.value)}
                  />
                </div>

                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputNumber
                    value={tourGuest}
                    className="flex-1"
                    placeholder="Guest"
                    onValueChange={(e) => setTourGuest(e.value)}
                  />
                </div>

                <Button label="Explore" className="" onClick={handleExplore} />
              </div>
            </div>
            <div
              className={`px-6 py-4 ${
                tabSelected.currentTab === 2 ? "" : "hidden"
              }`}
              id="tab-panel-2ai"
              aria-selected={`${
                tabSelected.currentTab === 2 ? "true" : "false"
              }`}
              role="tabpanel"
              aria-labelledby="tab-label-2ai"
              tabindex="-1"
            >
              <div className="flex gap-3 lg:flex-row flex-column">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  <Dropdown
                    value={carPickupLocation}
                    onChange={(e) => setCarPickupLocation(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Pickup Location"
                    className="flex-1"
                  />{" "}
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-calendar-clock"></i>
                  </span>
                  <Calendar
                    id="calendar-12h"
                    value={carPickupDateTime}
                    className="flex-1"
                    onChange={(e) => setCarPickupDateTime(e.value)}
                    showTime
                    placeholder="Pickup Date & Time"
                    hourFormat="12"
                  />
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  <Dropdown
                    value={carDropLocation}
                    onChange={(e) => setCarDropLocation(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Drop Off Location"
                    className="flex-1"
                  />{" "}
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-calendar-clock"></i>
                  </span>
                  <Calendar
                    id="calendar-12h"
                    value={carDropDateTime}
                    onChange={(e) => setCarDropDateTime(e.value)}
                    className="flex-1"
                    showTime
                    placeholder="Drop Off Date & Time"
                    hourFormat="12"
                  />
                </div>

                <Button
                  label="Explore"
                  className=""
                  onClick={() => navigate("/cars")}
                />
              </div>
            </div>
            <div
              className={`px-6 py-4 ${
                tabSelected.currentTab === 3 ? "" : "hidden"
              }`}
              id="tab-panel-3ai"
              aria-selected={`${
                tabSelected.currentTab === 3 ? "true" : "false"
              }`}
              role="tabpanel"
              aria-labelledby="tab-label-3ai"
              tabindex="-1"
            >
              <div className="flex gap-3 lg:flex-row flex-column">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  <Dropdown
                    value={cabPickupLocation}
                    onChange={(e) => setCabPickupLocation(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Pickup Location"
                    className="flex-1"
                  />{" "}
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-calendar-clock"></i>
                  </span>
                  <Calendar
                    id="calendar-12h"
                    value={cabPickupDateTime}
                    onChange={(e) => setCabPickupDateTime(e.value)}
                    showTime
                    placeholder="Pickup Date & Time"
                    hourFormat="12"
                  />
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  <Dropdown
                    value={cabDropLocation}
                    onChange={(e) => setCabDropLocation(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Drop Off Location"
                    className="flex-1"
                  />{" "}
                </div>

                <Button
                  label="Explore"
                  className=""
                  onClick={handleCarExplore}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex lg:flex-row flex-column justify-between items-center gap-4 w-9/12 mx-auto my-20">
        <div className="flex flex-col justify-between h-full flex-1 gap-10">
          <img
            src={home1}
            alt="Top Image"
            data-aos="fade-right"
            className="mx-auto w-[300px] rounded-lg"
          />
          <img
            src={home2}
            data-aos="fade-right"
            alt="Bottom Image"
            className="lg:self-end self-center w-[200px] rounded-lg"
          />
        </div>

        <div className="flex-1 text-center" data-aos="fade-up">
          <p className="testingFont text-4xl font-bold">Most Popular Tour</p>
          <p className="text-3xl font-bold text-black pt-2">
            Let’s Discover The World With Our Excellent Eyes
          </p>
          <p className="text-sm text-gray-600 pt-3">
            Whether you're looking for a romantic getaway, family-friendly
            vacation, or a solo journey to explore the world, a travel agency
            can provide a tailored itinerary that exceeds your expectations.
          </p>
        </div>

        <div className="flex flex-col justify-between h-full flex-1 gap-10">
          <img
            src={home3}
            alt="Top Image"
            data-aos="fade-left"
            className="mx-auto w-[300px] rounded-lg"
          />
          <img
            src={home4}
            alt="Bottom Image"
            data-aos="fade-left"
            className="lg:self-start self-center w-[200px] rounded-lg"
          />
        </div>
      </div>

      <div className="w-full md:w-10/12 mx-auto py-14">
        <div className="flex items-center justify-center flex-col">
          <p className="text-[28px] font-bold pb-4">Our Services</p>
          <div className="flex gap-5 flex-wrap justify-center">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white cursor-pointer shadow-md rounded-lg overflow-hidden flex flex-col w-70 my-3 mx-auto"
                data-aos={index % 2 === 0 ? "flip-right" : "flip-left"}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full object-cover aspect-[4/3]"
                />
                <div className="px-4 pt-4 flex-grow pb-4">
                  <h3 className="text-xl capitalize font-semibold text-center text-black line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 m-0 text-justify indent-2">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="w-full md:w-10/12 mx-auto py-14">
        <div className="flex items-center justify-center flex-col">
          <p className="text-[28px] font-bold pb-4">
            Why Vacations AG for airport transfers?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
            {whyChooseUs.map((service, index) => (
              <div
                key={index}
                className="bg-white cursor-pointer shadow-md rounded-lg overflow-hidden flex flex-col w-70 my-3 mx-auto"
                data-aos={index % 2 === 0 ? "flip-right" : "flip-left"}
              >
                <img
                  src={budha}
                  alt={service.title}
                  className="w-full object-cover aspect-[4/3]"
                />
                <div className="px-4 pt-4 flex-grow pb-4">
                  <h3 className="text-xl capitalize font-semibold text-center text-black line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 m-0 text-justify indent-2">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      <div className="flex lg:flex-row flex-col items-center h-full w-11/12 mx-auto py-20">
        {/* Left Text Content */}
        <div
          className="flex-1 flex flex-col justify-center text-left lg:text-left p-6"
          data-aos="fade-right"
        >
          <p className="testingFont text-4xl font-bold">Dream Your Next Trip</p>
          <p className="text-3xl font-bold pt-2 text-gray-700">
            Discover whenever you want to go
          </p>
          <p className="text-lg pt-3 text-gray-600 mt-2">
            Are you tired of the typical tourist destinations and looking to
            step out of your comfort zone? Adventure travel may be the perfect
            solution for you! Here are four.
          </p>
          <div className="flex mt-4">
            <img src={travel} alt="" className="w-20" />
            <div className="flex flex-col pl-4">
              <p className="font-bold text-[22px]">Best Travel Agency</p>
              <p>
                Are you tired of the typical tourist destinatio and looking step
                out of your comfort.
              </p>
            </div>
          </div>
          <div className="flex mt-4">
            <img src={secure} alt="" className="w-20" />
            <div className="flex flex-col pl-4">
              <p className="font-bold text-[22px]">Secure Journey With Us</p>
              <p>
                Are you tired of the typical tourist destinatio and looking step
                out of your comfort.
              </p>
            </div>
          </div>
        </div>

        {/* Right Image Content */}
        <div
          className="flex-1 py-10 flex justify-center items-center "
          data-aos="fade-left"
        >
          <div className="relative flex justify-center items-center">
            {/* Main Image */}
            <div className="relative w-[100%] left-[10%] lg:left-[0] lg:w-[60%]">
              <img
                src={homeImg2}
                alt="Main"
                className="lg:w-[500px] w-[240px] h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Sub Image (Overlayed) */}
            <div className="absolute top-[50%] lg:left-[30%] left-[25%] w-3/5 lg:w-[60%] transform -translate-x-1/2 -translate-y-1/2">
              <img
                src={homeImg1}
                alt="Sub"
                className="w-[250px] h-auto rounded-lg shadow-xl border-4 border-white object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bannerImage001">
        <div className="h-[100vh] flex flex-column items-center justify-center">
          <p
            className="testingFont text-white text-4xl font-bold"
            data-aos="fade-down"
          >
            Next Adventure Destination
          </p>
          <p
            className="text-6xl text-center pt-3 font-bold text-white"
            data-aos="fade-up"
          >
            Popular Travel Destinations Available Worldwide
          </p>
        </div>
      </div>

      {/* <div className="">
        <div className="flex flex-column items-center justify-center">
          <p className="testingFont text-black text-2xl font-bold">
            Clients Feedback About Us
          </p>
          <p className="text-4xl text-center pt-3 font-bold text-black">
            See Those Lovely Words From Clients
          </p>
        </div>
      </div> */}
    </div>
  );
}
