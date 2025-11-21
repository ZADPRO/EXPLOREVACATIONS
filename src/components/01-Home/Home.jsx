import React, { useState, useRef, useEffect } from "react";
import { Send, CarFront, CircleParking, Car } from "lucide-react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FaMinus, FaPlus } from "react-icons/fa";
import budha from "../../assets/tours/buddha[1].jpg";
import { motion, AnimatePresence } from "framer-motion";
import home1 from "../../assets/homeCards/card3.jpg";
import home2 from "../../assets/homeCards/card1.jpg";
import home3 from "../../assets/homeCards/card2.jpg";
import home4 from "../../assets/homeCards/card4.jpg";
import decrypt from "../../helper";
import Axios from "axios";
import img1 from '../../assets/Home1/img1.png'
import img2 from '../../assets/Home1/img2.png'
import Glide from "@glidejs/glide";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useTranslation } from "react-i18next";
import car1 from '../../assets/Home1/1 (1).png';
import car2 from '../../assets/Home1/2.png';
import car5 from '../../assets/Home1/car5.jpeg';
import car6 from '../../assets/cars/luxury.jpg';
import { Carousel } from "primereact/carousel";
// import t1 from "../../assets/Home1/image.png";

import car3 from '../../assets/Home1/3.png'
import car4 from '../../assets/Home1/4.png';
import business from "../../assets/service/busines.jpg";
import carRental from "../../assets/service/carRental.jpg";
import tourists from "../../assets/service/tourists.jpg";
import transfers from "../../assets/service/transfers.jpg";

import homeImg1 from "../../assets/homeCards/front.jpg";
import homeImg2 from "../../assets/homeCards/back.jpg";

import { Toast } from "primereact/toast";
import minivan from '../../assets/cars/minivan.jpg'
import secure from "../../assets/home/secure.png";
import travel from "../../assets/home/travel.png";
import car7 from '../../assets/cars/ca2.webp'
import car from '../../assets/cars/car1.webp'
import FleetCarousel from "./FleetCarousel/FleetCarousel";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Popup from "../../pages/Popup/Popup";
import BannerCarousel from "./BannerCarousel";
import carr1 from '../../assets/cars/carr1.jpg';
import exImage from '../../assets/Home1/eximage.jpeg'
import InfoCarousel from "./FleetCarousel/infocarousel";
export default function Home() {
  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 3,
  });
  const wrapperRef = useRef(null);

  const getFlag = () => {
    switch (language) {
      case "en":
        return flagEN;
      case "de":
        return flagDE;
      default:
        return flagEN;
    }
  };

  const { t, i18n } = useTranslation("global");

  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

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

  const [Banner, setBanner] = useState([]);
  const [tourDestination, setTourDestination] = useState(null);
  const [tourFromDate, setTourFromDate] = useState(null);
  const [tourToDate, setTourToDate] = useState(null);
  const [tourGuest, setTourGuest] = useState("");
  const [carGuest, setCarGuest] = useState("");
  const [vechilecount, setvechilecount] = useState("");
  const [carPickupLocation, setCarPickupLocation] = useState(null);
  const [carPickupDateTime, setCarPickupDateTime] = useState(null);
  const [carDropLocation, setCarDropLocation] = useState(null);
  const [carDropDateTime, setCarDropDateTime] = useState(null);
  const [destinationData, setDestinationData] = useState([]);
  const [carData, setCarData] = useState([]);
  const [carTypeData, setCarTypeData] = useState([]);
  const [cabPickupLocation, setCabPickupLocation] = useState(null);
  const [cabPickupDateTime, setCabPickupDateTime] = useState(null);
  const [cabDropLocation, setCabDropLocation] = useState(null);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(-1);
  const handleTopicChange = (e) => {
    setSelectedTopicIndex(parseInt(e.target.value));
    setOpenIndex(-1); // Reset open FAQ on topic change
  };
  const [carName, setCarName] = useState(null);
  const [carType, setCarType] = useState(null);

  const toast = useRef(null);

  // const cities = [
  //   { name: "New York", code: "NY" },
  //   { name: "Rome", code: "RM" },
  //   { name: "London", code: "LDN" },
  //   { name: "Istanbul", code: "IST" },
  //   { name: "Paris", code: "PRS" },
  // ];

  const navigate = useNavigate();
  ;

  const slides = [
    {
      img: img1,
      title: t("home.Best Travel Agency"),
      description: t(
        "home.Are you tired of the typical tourist destinatio and looking step out of your comfort."
      ),
    },
    {
      img: img2,
      title: t("home.Secure Journey With Us"),
      description: t(
        "home.Are you tired of the typical tourist destinatio and looking step out of your comfort."
      ),
    },
  ];
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

  const handleparking = () => {
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
    if (!vechilecount) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Number of vechile is required",
      });
      return;
    }

    navigate("/parking", {
      state: {
        tourFromDate,
        tourToDate,
        vechilecount,
      },
    });
    window.scrollTo(0, 0);
  };

  const handleCarExplore = () => {
    if (!cabPickupDateTime) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Date & Time is required",
      });
      return;
    }

    const queryParams = new URLSearchParams({
      cabPickupLocation,
      cabPickupDateTime,
      cabDropLocation,
    });

    navigate(`/transfer?${queryParams.toString()}`);
    window.scrollTo(0, 0);
  };
  const faqTopics = [
    {
      title: t("home.General"),
      items: [
        { question: t("home.q1"), answer: t("home.a1") },
        { question: t("home.q2"), answer: t("home.a2") },
        { question: t("home.q3"), answer: t("home.a3") },
        { question: t("home.q4"), answer: t("home.a4") },
        { question: t("home.q5"), answer: t("home.a5") },
        { question: t("home.q6"), answer: t("home.a6") },
      ],
    },
    {
      title: t("home.Rates & Fees"),
      items: [
        { question: t("home.q7"), answer: t("home.a7") },
        { question: t("home.q8"), answer: t("home.a8") },
        { question: t("home.q9"), answer: t("home.a9") },
        { question: t("home.q10"), answer: t("home.a10") },
        { question: t("home.q11"), answer: t("home.a11") },
        { question: t("home.q12"), answer: t("home.a12") },
      ],
    },
    {
      title: t("home.Insurance"),
      items: [
        { question: t("home.q13"), answer: t("home.a13") },
        { question: t("home.q14"), answer: t("home.a14") },
        { question: t("home.q15"), answer: t("home.a15") },
        { question: t("home.q16"), answer: t("home.a16") },
      ],
    },
    {
      title: t("home.Reservation"),
      items: [
        { question: t("home.q17"), answer: t("home.a17") },
        { question: t("home.q18"), answer: t("home.a18") },
        { question: t("home.q19"), answer: t("home.a19") },
        { question: t("home.q20"), answer: t("home.a20") },
        { question: t("home.q21"), answer: t("home.a21") },
      ],
    },
    {
      title: t("home.Before the Trip"),
      items: [
        { question: t("home.q22"), answer: t("home.a22") },
        { question: t("home.q23"), answer: t("home.a23") },
        { question: t("home.q24"), answer: t("home.a24") },
        { question: t("home.q25"), answer: t("home.a25") },
      ],
    },
    {
      title: t("home.During the Trip"),
      items: [
        { question: t("home.q26"), answer: t("home.a26") },
        { question: t("home.q27"), answer: t("home.a27") },
      ],
    },
    {
      title: t("home.End of Trip / Vehicle Return"),
      items: [
        { question: t("home.q28"), answer: t("home.a28") },
        { question: t("home.q29"), answer: t("home.a29") },
        { question: t("home.q30"), answer: t("home.a30") },
        { question: t("home.q31"), answer: t("home.a31") },
        { question: t("home.q32"), answer: t("home.a32") },
      ],
    },
  ];

  const getRouteFromTitle = (title) => {
    switch (title.toLowerCase()) {
      case "transfers":
        return "/transfer";
      case "business":
        return "/contact";
      case "tourist":
        return "/tours";
      case "car rental":
        return "/cars";
      default:
        return "/";
    }
  };

  const selectedTopic = faqTopics[selectedTopicIndex];
  const services = [
    {
      title: t("home.Transfers"),
      image: transfers,
      description: t("home.d1"),
    },
    {
      title: t("home.Business"),
      image: business,
      description: t("home.d2"),
    },
    {
      title: t("home.Tourist"),
      image: tourists,
      description: t("home.d3"),
    },
    {
      title: t("home.Car Rental"),
      image: carRental,
      description: t("home.d4"),
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

  const fetchData = async () => {
    try {
      console.log("Verify Token Running --- ");

      const listDestinations = await Axios.get(
        import.meta.env.VITE_API_URL + "/userRoutes/listDestination",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      console.log("listDestinations------------------>", listDestinations);
      const destinationData = decrypt(
        listDestinations.data[1],
        listDestinations.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log("data list tour data ======= line 738", destinationData);
      console.log("destinationData.Details", destinationData.Details);
      if (destinationData.success) {
        // localStorage.setItem("token", "Bearer " + data.token);
        // setIsModelOpen(false);
        setDestinationData(destinationData.Details);
        setCarData(destinationData.VehicleType);
        setCarTypeData(destinationData.carType);
      }

      // setTourDetailsBackend(destinationData.tourDetails);

      const listTourResponse = await Axios.post(
        import.meta.env.VITE_API_URL + "/userRoutes/getAllTour",
        {
          refPackageId: tour.refPackageId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      const data = decrypt(
        listTourResponse.data[1],
        listTourResponse.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log("data list tour data ======= ?", data);
      if (data.success) {
        // localStorage.setItem("token", "Bearer " + data.token);
        // setIsModelOpen(false);
        // setTourDetailsBackend(data.tourDetails);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBanner = async () => {
    try {
      const response = await Axios.get(
        import.meta.env.VITE_API_URL + "/bookingRoutes/listhomeImageUserSide",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log("fetchbanner", data);
      if (data.success) {
        // localStorage.setItem("token", "Bearer " + data.token);
        console.log("fetchbanner--------->", data);
        setBanner(data.result);
      }
    } catch (e) {
      console.log("Error fetching Banner:", e);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBanner();
  }, []);

  return (
    <div className="">
      <Toast ref={toast} />
      <Popup />

      <div className="mt-20">
        <BannerCarousel />
      </div>

      <div className="relative">
        <section
          className="w-11/12 md:w-9/12 mx-auto mt-[-40px] shadow-xl bg-white rounded-md"
          aria-multiselectable="false"
        >
          <ul
            className="flex items-center border-b border-slate-200 flex-wrap"
            role="tablist"
            ref={wrapperRef}
          >
            <li
              role="presentation"
              className="w-full sm:w-auto cursor-pointer "
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 1 })}
            >
              <button
                className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-3 text-sm font-medium tracking-wide transition duration-300 hover:bg-[#c6f0d5] hover:stroke-[#02569c] focus:bg-emerald-50 focus-visible:outline-none disabled:cursor-not-allowed ${tabSelected.currentTab === 1
                    ? "border-[#02569c] stroke-[#02569c] text-[#02569c] hover:border-[#02569c]  hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:border-slate-500"
                    : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-[#02569c] hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:text-slate-500"
                  }`}
                id="tab-label-1ai"
                role="tab"
                aria-setsize="3"
                aria-posinset="1"
                tabindex={`${tabSelected.currentTab === 1 ? "0" : "-1"}`}
                aria-controls="tab-panel-1ai"
                aria-selected={`${tabSelected.currentTab === 1 ? "true" : "false"
                  }`}
                onClick={() =>
                  setTabSelected({ ...tabSelected, currentTab: 1 })
                }
              >
                <span
                  onClick={() =>
                    setTabSelected({ ...tabSelected, currentTab: 1 })
                  }
                  className="order-2 hover:bg-[#c6f0d5] cursor-pointer"
                >
                  {t("home.Tour")}
                </span>
                <span
                  onClick={() =>
                    setTabSelected({ ...tabSelected, currentTab: 1 })
                  }
                  className="relative only:-mx-6"
                >
                  <Send />
                </span>
              </button>
            </li>
            <li
              className=""
              role="presentation"
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 2 })}
            >
              <button
                className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-3 text-sm font-medium tracking-wide transition duration-300 hover:bg-[#c6f0d5] hover:stroke-[#02569c] focus:bg-emerald-50 focus-visible:outline-none disabled:cursor-not-allowed ${tabSelected.currentTab === 2
                    ? "border-[#02569c] stroke-[#02569c] text-[#02569c] hover:border-[#02569c]  hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:border-slate-500"
                    : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-[#02569c] hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:text-slate-500"
                  }`}
                id="tab-label-2ai"
                role="tab"
                aria-setsize="3"
                aria-posinset="2"
                tabindex={`${tabSelected.currentTab === 2 ? "0" : "-1"}`}
                aria-controls="tab-panel-2ai"
                aria-selected={`${tabSelected.currentTab === 2 ? "true" : "false"
                  }`}
                onClick={() =>
                  setTabSelected({ ...tabSelected, currentTab: 2 })
                }
              >
                <span
                  onClick={() =>
                    setTabSelected({ ...tabSelected, currentTab: 2 })
                  }
                  className="order-2 hover:bg-[#c6f0d5] cursor-pointer "
                >
                  {t("home.Car")}
                </span>
                <CarFront
                  onClick={() =>
                    setTabSelected({ ...tabSelected, currentTab: 2 })
                  }
                />
              </button>
            </li>
            <li
              className=""
              role="presentation"
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 3 })}
            >
              <button
                className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-3 text-sm font-medium tracking-wide transition duration-300 hover:bg-[#c6f0d5] hover:stroke-[#02569c] focus:bg-emerald-50 focus-visible:outline-none disabled:cursor-not-allowed ${tabSelected.currentTab === 3
                    ? "border-[#02569c] stroke-[#02569c] text-[#02569c] hover:border-[#02569c]  hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:border-slate-500"
                    : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-[#02569c] hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:text-slate-500"
                  }`}
                id="tab-label-3ai"
                role="tab"
                aria-setsize="3"
                aria-posinset="3"
                tabindex={`${tabSelected.currentTab === 3 ? "0" : "-1"}`}
                aria-controls="tab-panel-3ai"
                aria-selected={`${tabSelected.currentTab === 3 ? "true" : "false"
                  }`}
                onClick={() =>
                  setTabSelected({ ...tabSelected, currentTab: 3 })
                }
              >
                <span
                  onClick={() =>
                    setTabSelected({ ...tabSelected, currentTab: 3 })
                  }
                  className="order-2 hover:bg-[#c6f0d5] cursor-pointer "
                >
                  {t("home.Parking")}
                </span>
                <span className="relative only:-mx-6">
                  <CircleParking
                    onClick={() =>
                      setTabSelected({ ...tabSelected, currentTab: 3 })
                    }
                  />{" "}
                </span>
              </button>
            </li>
            <li
              className=""
              role="presentation"
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 4 })}
            >
              <button
                className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-3 text-sm font-medium tracking-wide transition duration-300 hover:bg-[#c6f0d5] hover:stroke-[#02569c] focus:bg-emerald-50 focus-visible:outline-none disabled:cursor-not-allowed ${tabSelected.currentTab === 4
                    ? "border-[#02569c] stroke-[#02569c] text-[#02569c] hover:border-[#02569c]  hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:border-slate-500"
                    : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-[#02569c] hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:text-slate-500"
                  }`}
                id="tab-label-1ai"
                role="tab"
                aria-setsize="3"
                aria-posinset="1"
                tabindex={`${tabSelected.currentTab === 4 ? "0" : "-1"}`}
                aria-controls="tab-panel-1ai"
                aria-selected={`${tabSelected.currentTab === 4 ? "true" : "false"
                  }`}
                onClick={() =>
                  setTabSelected({ ...tabSelected, currentTab: 4 })
                }
              >
                <span
                  onClick={() =>
                    setTabSelected({ ...tabSelected, currentTab: 4 })
                  }
                  className="order-2 hover:bg-[#c6f0d5] cursor-pointer "
                >
                  {t("header.Transfers")}
                </span>
                <span
                  onClick={() =>
                    setTabSelected({ ...tabSelected, currentTab: 4 })
                  }
                  className="relative only:-mx-6"
                >
                  <Car
                    onClick={() =>
                      setTabSelected({ ...tabSelected, currentTab: 4 })
                    }
                  />
                </span>
              </button>
            </li>
          </ul>
          <div className="">
            <div
              className={`px-6 py-4 ${tabSelected.currentTab === 1 ? "" : "hidden"
                }`}
              id="tab-panel-1ai"
              aria-selected={`${tabSelected.currentTab === 1 ? "true" : "false"
                }`}
              role="tabpanel"
              aria-labelledby="tab-label-1ai"
              tabIndex="-1"
            >
              {/* <div className="flex gap-3 lg:flex-row flex-column">
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
              </div> */}
              <div className="flex gap-3 lg:flex-row flex-column">
                {/* Destination Dropdown */}
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  <Dropdown
                    value={tourDestination}
                    onChange={(e) => setTourDestination(e.value)}
                    options={destinationData?.map((item) => ({
                      ...item,
                      refDestinationName:
                        item.refDestinationName.charAt(0).toUpperCase() +
                        item.refDestinationName.slice(1).toLowerCase(),
                    }))}
                    optionLabel="refDestinationName"
                    optionValue="refDestinationId"
                    placeholder="Select Destination"
                    className="flex-1 capitalize"
                  />
                </div>

                {/* From Date */}
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-calendar-clock"></i>
                  </span>
                  <Calendar
                    value={tourFromDate}
                    placeholder="From"
                    className="flex-1"
                    minDate={new Date()} // Prevent past date selection
                    onChange={(e) => {
                      setTourFromDate(e.value);
                      if (tourToDate && e.value > tourToDate) {
                        setTourToDate(null);
                      }
                    }}
                  />
                </div>

                {/* To Date (minDate is set to From Date) */}
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-calendar-clock"></i>
                  </span>
                  <Calendar
                    className="flex-1"
                    placeholder="To"
                    value={tourToDate}
                    onChange={(e) => setTourToDate(e.value)}
                    minDate={tourFromDate}
                  />
                </div>

                {/* Guest Input */}
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

                {/* Explore Button */}
                <Button
                  label={t("header.Explore")}
                  className=""
                  onClick={handleExplore}
                />
              </div>
            </div>

            {/* Car Filter */}

            <div
              className={`px-6 py-4 overflow-x-auto ${tabSelected.currentTab === 2 ? "" : "hidden"
                }`}
              id="tab-panel-2ai"
              aria-selected={tabSelected.currentTab === 2 ? "true" : "false"}
              role="tabpanel"
              aria-labelledby="tab-label-2ai"
              tabIndex="-1"
            >
              <div className="flex gap-3 lg:flex-row flex-column">
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  {/* Pickup Location */}
                  <Dropdown
                    value={carType}
                    onChange={(e) => setCarType(e.value)}
                    options={carTypeData?.map((item) => ({
                      ...item,
                      refCarTypeName:
                        item.refCarTypeName.charAt(0).toUpperCase() +
                        item.refCarTypeName.slice(1).toLowerCase(),
                    }))}
                    optionLabel="refCarTypeName"
                    optionValue="refCarTypeId"
                    placeholder="Select Car Type"
                    className="flex-1 capitalize"
                  />
                </div>
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  <Dropdown
                    value={carName}
                    onChange={(e) => setCarName(e.value)}
                    options={carData?.map((item) => ({
                      ...item,
                      refVehicleTypeName:
                        item.refVehicleTypeName.charAt(0).toUpperCase() +
                        item.refVehicleTypeName.slice(1).toLowerCase(),
                    }))}
                    optionLabel="refVehicleTypeName"
                    optionValue="refVehicleTypeId"
                    placeholder="Select Car Category"
                    className="flex-1 capitalize"
                  />
                </div>

                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputNumber
                    value={carGuest}
                    className="flex-1"
                    placeholder="Guest"
                    onValueChange={(e) => setCarGuest(e.value)}
                  />
                </div>
                {/* Explore Button */}
                <div className="flex items-center min-w-[150px]">
                  <Button
                    label="Explore"
                    className="ml-2"
                    onClick={() => navigate("/cars")}
                  />
                </div>
              </div>
            </div>

            <div
              className={`px-6 py-4 ${tabSelected.currentTab === 3 ? "" : "hidden"
                }`}
              id="tab-panel-3ai"
              aria-selected={`${tabSelected.currentTab === 3 ? "true" : "false"
                }`}
              role="tabpanel"
              aria-labelledby="tab-label-3ai"
              tabindex="-1"
            >
              <div className="flex gap-3 lg:flex-row flex-column">
                {/* From Date */}
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-calendar-clock"></i>
                  </span>
                  <Calendar
                    value={tourFromDate}
                    placeholder="From"
                    className="flex-1"
                    minDate={new Date()} // Prevent past date selection
                    onChange={(e) => {
                      setTourFromDate(e.value);
                      if (tourToDate && e.value > tourToDate) {
                        setTourToDate(null);
                      }
                    }}
                  />
                </div>

                {/* To Date (minDate is set to From Date) */}
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-calendar-clock"></i>
                  </span>
                  <Calendar
                    className="flex-1"
                    placeholder="To"
                    value={tourToDate}
                    onChange={(e) => setTourToDate(e.value)}
                    minDate={tourFromDate}
                  />
                </div>

                {/* Guest Input */}
                <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputNumber
                    value={vechilecount}
                    className="flex-1"
                    placeholder="Vechile count"
                    onValueChange={(e) => setvechilecount(e.value)}
                  />
                </div>

                {/* Explore Button */}
                <Button label="Explore" className="" onClick={handleparking} />
              </div>
            </div>

            <div
              className={`px-6 py-4 ${tabSelected.currentTab === 4 ? "" : "hidden"
                }`}
              id="tab-panel-3ai"
              aria-selected={`${tabSelected.currentTab === 4 ? "true" : "false"
                }`}
              role="tabpanel"
              aria-labelledby="tab-label-3ai"
              tabindex="-1"
            >
              <div className="flex gap-3 lg:flex-row flex-column">
                {/* <div className="p-inputgroup flex-1">
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
                </div> */}
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
                {/* <div className="p-inputgroup flex-1">
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
                </div> */}

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
            src={car4}
            alt="Top Image"
            data-aos="fade-right"
            className="mx-auto bg-transparent w-[300px] rounded-lg"
          />
          <img
            src={car2}
            data-aos="fade-right"
            alt="Bottom Image"
            className="lg:self-end self-center bg-transparent w-[200px] rounded-lg"
          />
        </div>


        <div className="flex-1 text-center" data-aos="fade-up">
          <p className="testingFont text-4xl font-bold text-[#2472bc]">
            {" "}
            {t("home.Most Popular Tour")}
          </p>
          <p className="text-3xl font-bold text-black pt-2">
            {t("home.Let’s Discover The World With Our Excellent Eyes")}
          </p>
          <p className="text-sm text-gray-600 pt-3 ">
            {t(
              "home.Whether you are planning a romantic escape, a family holiday, or a solo adventure, our travel agency designs bespoke itineraries tailored to your needs. Alongside carefully crafted tours and exclusive holiday packages, we also offer flexible car rental solutions to ensure your journey is seamless, comfortable, and unforgettable."
            )}
          </p>
        </div>

        <div className="flex flex-col justify-between h-full flex-1 gap-10">
          <img
            src={car3}
            alt="Top Image"
            data-aos="fade-right"
            className="mx-auto w-[300px] rounded-lg"
          />
          <img
            src={car1}
            alt="Bottom Image"
            data-aos="fade-right"
            className="lg:self-start self-center w-[200px] rounded-lg"
          />
        </div>
      </div>

      <div className="w-full md:w-10/12 mx-auto lg:py-14 md:py-14 py-0">
        <div className="flex items-center justify-center flex-col">
          <p className="text-[28px] font-bold pb-4">{t("home.Our Services")}</p>
          <div className="flex gap-5 flex-wrap justify-center">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => navigate(getRouteFromTitle(service.title))}
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
                  <p
                    className="text-gray-700 text-[16px] m-0 flex text-center"
                    style={{ wordSpacing: "normal" }}
                  >
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

      <div className="flex flex-col items-center w-11/12 mx-auto lg:py-20 md:py-16 py-10">
        {/* Top Title + Carousel */}
        <div
          className="flex flex-col justify-center text-left w-full lg:w-10/12 p-6"
          data-aos="fade-right"
        >
          {/* <p className="testingFont text-4xl ml-[121px] font-bold text-[#2472bc] mb-6">
    {t("home.Dream Your Next Trip")}
  </p> */}
          <p className="testingFont text-4xl font-bold mb-[-40px] text-center">
            {t("home.title")}
          </p>

          {/* Fleet Carousel */}
          <div className="mt-4 mb-10">
            <FleetCarousel />
          </div>
        </div>


        {/* Middle Section: Text + Right Image Side-by-Side */}
       <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:w-10/12 mx-auto gap-6">

  <div
    className="flex-1 flex flex-col text-center lg:text-left p-4 sm:p-6"
    data-aos="fade-right"  
  >
    <p className="text-2xl sm:text-3xl font-bold text-gray-700 leading-snug">
      {t("home.Discover whenever you want to go")}
    </p>
    <p className="text-[14px] sm:text-[15px] text-gray-600 mt-3 leading-relaxed">
      {t("home.desc1")}<br />{t("home.desc2")}
    </p>
    <div className="mt-4 sm:mt-6 mb-8 sm:mb-12">
      <InfoCarousel />
    </div>
  </div>
</div>


      </div>

      <div className="">
        <div className="flex flex-column items-center justify-center">
          <p className="testingFont text-[#2472bc] text-2xl font-bold">
            {t("home.Frequently Asked Questions")}
          </p>
          <p className="text-4xl text-center pt-3 font-bold text-black">
            {t("home.See Those Lovely Words From Clients")}
          </p>

          <div className="mt-10 mb-5 w-[80%]">
            {/* Dropdown */}
            <div className="mb-6">
              <label
                htmlFor="faq-topic"
                className="block mb-2 font-semibold testingFont text-black text-2xl"
              >
                {t("home.Select a topic")}
              </label>
              <select
                id="faq-topic"
                value={selectedTopicIndex}
                onChange={handleTopicChange}
                className="p-2 border border-gray-300 rounded-md italic w-[100%] max-w-sm text-[#002E2C]"
              >
                {faqTopics.map((topic, index) => (
                  <option key={index} value={index}>
                    {topic.title}
                  </option>
                ))}
              </select>
            </div>

            {/* FAQ List */}
            <div className="w-[100%]">
              {selectedTopic.items.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index} className="pb-3">
                    <button
                      className="flex justify-between items-center italic w-[100%] text-[20px] md:text-[20px] font-light text-[#002E2C]"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    >
                      {faq.question}
                      {isOpen ? (
                        <FaMinus className="text-[#002E2C] " />
                      ) : (
                        <FaPlus className="text-[#002E2C]" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="mt-2 text-[16px] text-gray-600">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
