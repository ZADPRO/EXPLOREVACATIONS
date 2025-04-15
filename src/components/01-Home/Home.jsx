import React, { useState, useRef, useEffect } from "react";

import { Send, CarFront, CarTaxiFront } from "lucide-react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FaMinus, FaPlus } from "react-icons/fa";
import budha from "../../assets/tours/buddha[1].jpg";
import { motion, AnimatePresence } from 'framer-motion';
import home1 from "../../assets/homeCards/card3.jpg";
import home2 from "../../assets/homeCards/card1.jpg";
import home3 from "../../assets/homeCards/card2.jpg";
import home4 from "../../assets/homeCards/card4.jpg";
import decrypt from "../../helper";
import Axios from "axios";
import Glide from "@glidejs/glide";

import { Carousel } from "primereact/carousel";

import business from "../../assets/service/busines.jpg";
import carRental from "../../assets/service/carRental.jpg";
import tourists from "../../assets/service/tourists.jpg";
import transfers from "../../assets/service/transfers.jpg";

import homeImg1 from "../../assets/homeCards/front.jpg";
import homeImg2 from "../../assets/homeCards/back.jpg";

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
  const [destinationData, setDestinationData] = useState([]);
  const [cabPickupLocation, setCabPickupLocation] = useState(null);
  const [cabPickupDateTime, setCabPickupDateTime] = useState(null);
  const [cabDropLocation, setCabDropLocation] = useState(null);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(-1);
  const handleTopicChange = (e) => {
    setSelectedTopicIndex(parseInt(e.target.value));
    setOpenIndex(-1); // Reset open FAQ on topic change
  };



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

    const url = new URL("https://explorevacations.yelowtaxi.com/ride/add");

    // Append query parameters
    url.searchParams.append("cabPickupLocation", cabPickupLocation);
    url.searchParams.append("cabPickupDateTime", cabPickupDateTime);
    url.searchParams.append("cabDropLocation", cabDropLocation);

    // Open in a new tab
    window.open(url.toString(), "_blank");
    window.scrollTo(0, 0);
  };



  const faqTopics = [
    {
      title: "General",
      items: [
        {
          question: "Is there a minimum or maximum rental period for an Explore Vacations AG van?",
          answer: "The minimum rental period is half a day. The maximum rental period is generally 30 days. If you need a vehicle for longer than 30 days, please contact our Sales Team. We will gladly prepare an offer for you."
        },
        {
          question: "Can I return the van at a different location?",
          answer: "Yes, that is possible. Please contact us by phone at +41 44 442 30 35 for further information."
        },
        {
          question: "Can I return the van abroad?",
          answer: "No. Please contact your station directly for all details. Phone: +41 44 442 30 35"
        },
        {
          question: "Who should I contact if I experience issues with the vehicle?",
          answer: "For general inquiries regarding your rented vehicle or rental agreement, please contact us at +41 44 442 30 35. If your vehicle breaks down and is no longer drivable, please contact our roadside assistance at the same number."
        },
        {
          question: "Can I return the vehicle outside business hours?",
          answer: "Yes, that’s no problem. If you return the vehicle outside opening hours, please park it in one of the available parking spaces at the Explore Vacations AG station and drop the key in the key drop box. Please note that returning the key does not end your rental agreement. For more details, refer to your rental terms."
        },
        {
          question: "Can I drive an Explore Vacations AG van with a Category B driver's license?",
          answer: "Yes, all vehicles are permitted for Category B license holders. The only requirement is that you’ve held your license for at least one year."
        }
      ]
    },
    {
      title: "Rates & Fees",
      items: [
        {
          question: "I received a fine. What happens next?",
          answer: "The fine is sent to Explore Vacations AG. We identify the driver responsible and forward their details to the police or relevant authority. You will receive the fine directly from them. Additionally, we charge an administrative fee of CHF 80.00 (incl. VAT)."
        },
        {
          question: "What is included in the van rental rates?",
          answer: "Our published rates include: service, liability insurance, comprehensive insurance (with deductible), theft protection (with deductible), vehicle tax, Swiss motorway vignette, winter tires (November–March), up to 150 free kilometers per day, and VAT. (Exceptions may apply for special corporate rates.)"
        },
        {
          question: "How are rental costs calculated?",
          answer: "The total rental cost consists of the base rate (depending on vehicle category) plus the kilometers driven."
        },
        {
          question: "I have a discount code – when can I use it?",
          answer: "Please provide your discount code when making the reservation. It is not possible to apply a discount code after the rental has started."
        },
        {
          question: "What currency are the rates in?",
          answer: "All prices are listed in Swiss Francs (CHF) and include VAT."
        },
        {
          question: "Are there additional costs for driving abroad?",
          answer: "Yes, a Cross Border Fee (CBF) of up to CHF 185.00 (incl. VAT) applies. Please refer to the travel restrictions for each country and vehicle category in your rental agreement."
        }
      ]
    },
    {
      title: "Insurance",
      items: [
        {
          question: "Is there a liability reduction included?",
          answer: "Yes, liability reduction is included in all rates (a deductible remains)."
        },
        {
          question: "What is the amount of the deductible?",
          answer: "The deductible per damage case is CHF 3000 for categories O4, C4, and W4, and CHF 5000 for category H4. With the Premium Insurance add-on, you can reduce the deductible to CHF 500 per damage case."
        },
        {
          question: "Is there a young driver surcharge?",
          answer: "Yes, all drivers under the age of 25 must pay a young driver surcharge. Prices vary by category, with a maximum fee of CHF 199 per rental month."
        },
        {
          question: "What is the SuperCover Insurance?",
          answer: "With Premium Insurance (liability waiver), you can reduce your deductible to CHF 350 per damage case, protecting you from high costs in case of loss or damage."
        }
      ]
    },
    {
      title: "Reservation",
      items: [
        {
          question: "How can I reserve a van from Explore Vacations AG?",
          answer: "You can reserve a van online at explorevacations.ch, by phone, or directly at an Explore Vacations AG station."
        },
        {
          question: "Are there additional costs for driving abroad?",
          answer: "Yes, a Cross Border Fee (CBF) starting from CHF 185.00 (incl. VAT) applies. Please refer to travel restrictions in your rental terms for country-specific limitations."
        },
        {
          question: "Can I rent a van for an extended period?",
          answer: "Absolutely! If you need a vehicle for more than 30 days, please contact our Sales Team. We’ll be happy to prepare an offer for you."
        },
        {
          question: "How far in advance should I book?",
          answer: "We recommend booking as early as possible to accommodate your preferences for vehicle models, etc. Reservations are generally possible anytime up to shortly before the desired rental start."
        },
        {
          question: "Can I reserve a specific vehicle model?",
          answer: "You can reserve vehicle categories, but not specific models."
        }
      ]
    },
    {
      title: "Before the Trip",
      items: [
        {
          question: "Can I park my private car at the Explore Vacations AG station during the rental period?",
          answer: "Yes, this is generally possible at all our locations. However, please check availability with your specific station in advance. Explore Vacations AG assumes no liability for any damage to your private vehicle."
        },
        {
          question: "I noticed damage on the van before departure – what should I do?",
          answer: "You must report any damage immediately. Please speak directly with a staff member at your pickup station."
        },
        {
          question: "What should I check before starting my trip?",
          answer: "For your own safety, please inspect the vehicle for any existing damage, adjust seat and mirrors, buckle up, switch on headlights, and ensure visibility through all windows."
        },
        {
          question: "Can I request a test drive with assistance?",
          answer: "Yes! With prior notice, an Explore Vacations AG staff member will gladly accompany you on a short drive to help you get familiar with the van. Please contact your station in advance."
        }
      ]
    },
    {
      title: "During the Trip",
      items: [
        {
          question: "Can I smoke in the van?",
          answer: "No, all Explore Vacations AG vehicles are non-smoking. Cleaning fees may apply in case of violation."
        },
        {
          question: "What should I do if I’m involved in an accident?",
          answer: "You’ll find a detailed checklist and documents in the glove compartment. Stay calm, secure the site, help the injured, and call the police (117)."
        }
      ]
    },
    {
      title: "End of Trip / Vehicle Return",
      items: [
        {
          question: "What if I can’t return the vehicle on time?",
          answer: "Please plan enough time and extend your reservation in advance by contacting your station or calling +41 44 442 30 35. Late returns may incur fees."
        },
        {
          question: "Can I return the vehicle earlier than planned?",
          answer: "Early returns may result in rate adjustments and additional charges. Refunds are not possible."
        },
        {
          question: "Can I return the vehicle later than planned?",
          answer: "Unless you’ve received a confirmed extension, the vehicle must be returned at the end of your rental. Late returns will incur fees."
        },
        {
          question: "Do I need to clean the van before returning it?",
          answer: "We take care of cleaning, but kindly dispose of any trash and leave the cargo area broom-clean. Excessive dirt may result in additional cleaning charges."
        },
        {
          question: "Do I need to refuel or recharge the van?",
          answer: "Fuel and electricity are not included in the rental rate. You must return the vehicle with the same fuel level. We offer a refueling/recharging service for an extra fee, which will be listed on your invoice. Of course, you can also refuel/recharge the vehicle yourself at no extra cost."
        }
      ]
    },
    {
      title: "Payment",
      items: [
        {
          question: "How do I receive my invoice?",
          answer: "An invoice will be issued at the end of each rental. You will receive it directly at the station or by email. (Exceptions may apply for corporate clients.)"
        },
        {
          question: "What payment methods are accepted?",
          answer: "You can pay using credit cards (American Express, MasterCard, Visa) or cash at the station during business hours. A deposit is required if no credit card is provided."
        }
      ]
    },
    {
      title: "Vehicles",
      items: [
        {
          question: "Do you have vehicles with a trailer hitch?",
          answer: "Some vehicles are equipped with trailer hitches. Use is only permitted with prior approval. Always observe the maximum towing capacity."
        },
        {
          question: "Can your vans be equipped with child seats?",
          answer: "Explore Vacations AG does not provide installed child seats and cannot take responsibility for their installation. Some vehicles do not allow deactivation of the front airbag."
        },
        {
          question: "Are Explore Vacations AG vans winter-ready?",
          answer: "Yes, all vehicles undergo a winter check. We install winter or all-weather tires, add windshield antifreeze, and provide an ice scraper. Textile snow socks are also available."
        }
      ]
    },
    {
      title: "Private Customers",
      items: [
        {
          question: "What is the minimum age to rent a vehicle?",
          answer: "You must be at least 19 years old and have held a valid driver’s license for at least one year."
        }
      ]
    },
    {
      title: "Lost Items",
      items: [
        {
          question: "I found items in the vehicle – what should I do?",
          answer: "Please report any found items to staff at your Explore Vacations AG station or call +41 44 442 30 35."
        },
        {
          question: "I forgot something in the vehicle – what should I do?",
          answer: "Please contact your Explore Vacations AG station or call us at +41 44 442 30 35 to request a search. This service costs CHF 80.– even if the item is not found."
        }
      ]
    },
    {
      title: "Abroad",
      items: [
        {
          question: "Can I drive the Explore Vacations AG van abroad?",
          answer: "Yes, but a Cross Border Fee (CBF) starting from CHF 185.00 (incl. VAT) applies. Please refer to the travel restrictions for each country and vehicle category in your rental terms."
        }
      ]
    }
  ];
  
  const selectedTopic = faqTopics[selectedTopicIndex];
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

    const fetchData = async () => {
      try {
        console.log("Verify Token Running --- ");
  
        const listDestinations = await Axios.get(
          import.meta.env.VITE_API_URL + "/userRoutes/listDestination",
          {
            headers: {
              Authorization: localStorage.getItem("JWTtoken"),
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
        setDestinationData(destinationData.Details);
        // setTourDetailsBackend(destinationData.tourDetails);
  
        const listTourResponse = await Axios.get(
          import.meta.env.VITE_API_URL + "/userRoutes/getAllTour",
          {
            headers: {
              Authorization: localStorage.getItem("JWTtoken"),
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
        setTourDetailsBackend(data.tourDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
      useEffect(() => {
       
        fetchData();
      }, []);

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
                        <div className="p-inputgroup flex-1">
                          <span className="p-inputgroup-addon">
                            <i className="pi pi-map-marker"></i>
                          </span>
                          <Dropdown
                            value={tourDestination}
                            onChange={(e) => setTourDestination(e.value)}
                            options={destinationData.map((item) => ({
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
                  <p className="text-gray-700 text-[16px] m-0 text-justify indent-2">
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
          <p className="text-3xl font-medium pt-2 text-gray-700">
            Discover whenever you want to go
          </p>
          <p className="text-[15px] pt-3 text-gray-600 mt-2">
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
            <div className="relative w-[100%] left-[10%] lg:left-[5] lg:w-[60%]">
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



      <div className="">
        <div className="flex flex-column items-center justify-center">
          <p className="testingFont text-black text-2xl font-bold">
          Frequently Asked Questions
          </p>
          <p className="text-4xl text-center pt-3 font-bold text-black">
            See Those Lovely Words From Clients
          </p>



          <div className="mt-10 mb-5 w-[80%]">
      {/* Dropdown */}
      <div className="mb-6">
        <label htmlFor="faq-topic" className="block mb-2 font-semibold testingFont text-black text-2xl">
          Select a topic
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
                {isOpen ? <FaMinus className="text-[#002E2C] " /> : <FaPlus className="text-[#002E2C]" />}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mt-2 text-[16px] text-gray-600">{faq.answer}</p>
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
