import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import time from "../../assets/Parking/time.png";
import brand from "../../assets/Parking/brand.png";
import React, { useEffect, useRef, useState } from "react";
import homeImg1 from "../../assets/Parking/parking1.jpg";
import homeImg2 from "../../assets/Parking/vechiletypes.jpg";
import parkinglogo from "../../assets/Parking/parkinglogo.png";
import vechiletype from "../../assets/Parking/standardlogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import decrypt from "../../helper";
import Popup from "../../pages/Popup/Popup";
import { useTranslation } from "react-i18next";
import BannerCarousel from "../01-Home/BannerCarousel ";
import tourImg from "../../assets/Parking/parkingin.jpg";

export default function Parking() {
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [parking, setParking] = useState([]);
  const [selectedParkingType, setSelectedParkingType] = useState(null);
  const [vechile, setVechile] = useState([]);
  const [selectedVechileType, setVechileParkingType] = useState(null);
  const [airport, setAirport] = useState([]);
  const [selectedAirportType, setSelectedAirportType] = useState(null);
  const [listParking, setListParking] = useState([]);

  const [input, setInput] = useState({
    travelStartDate: "", //string
    refAssociatedAirport: "", //string
    refCarParkingTypeId: 0, //int
    refParkingTypeId: 0, //int
    travelEndDate: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filterParking = async () => {
    console.log("Started filterParking");
    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/userRoutes/listCarParking",

        {
          travelStartDate: input.travelStartDate, //string
          refAssociatedAirport: input.refAssociatedAirport, //string
          refCarParkingTypeId: input.refCarParkingTypeId, //int
          refParkingTypeId: input.refParkingTypeId, //int
          travelEndDate: input.travelEndDate,
        },

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
      console.log("Filter data", data);
      if (data.success) {
        // localStorage.setItem("token", "Bearer " + data.token);
        setListParking(data.carParkingDetails);
      } else {
        setListParking([]);
      }
    } catch (error) {
      console.error("API Error:", error);
      setLoading(false);
      setListParking([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchParkingType();
    filterParking();
    fetchAirport();
  }, []);

  // Parking Type
  const fetchParkingType = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/userRoutes/listParkingType",
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
      console.log("data car details", data);
      if (data.success) {
        // localStorage.setItem("token", "Bearer " + data.token);
        console.log("fetchCarType--------->", data);
        setParking(data.parkingType);
        setVechile(data.vehicleType);
      }
    } catch (e) {
      console.log("Error fetching destinations:", e);
    }
  };

  // Airport

  const fetchAirport = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/userRoutes/listAssociateAirport",
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
      console.log("data car details", data);
      if (data.success) {
        // localStorage.setItem("token", "Bearer " + data.token);
        console.log("fetchAirportType--------->", data);
        setAirport(data.Details);
      }
    } catch (e) {
      console.log("Error fetching Airport:", e);
    }
  };

  return (
    <div>
      <Popup />
      <div className="p-4 md:p-20 lg:p-8 mt-10 md:mt-0 lg:mt-0">
        <BannerCarousel moduleId={1} />
      </div>

      <div
        id="tab-panel-1ai"
        role="tabpanel"
        className="card w-10/12 mx-auto bg-white p-4 shadow-md rounded-lg mt-[-30px]"
        aria-labelledby="tab-label-1ai"
        tabIndex="-1"
      >
        <div className="overflow-x-auto">
          <div className="flex gap-3 lg:flex-row flex-column">
            {/* From Date */}
            <div className="p-inputgroup flex-1 min-w-[200px]">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calendar-clock"></i>
              </span>
              <Calendar
                name="travelStartDate"
                value={input.travelStartDate}
                onChange={(e) => {
                  setInput((prev) => ({
                    ...prev,
                    travelStartDate: e.value,
                  }));
                }}
                placeholder="From"
                className="flex-1"
                minDate={new Date()}
                readOnlyInput
                dateFormat="yy-mm-dd"
              />
            </div>

            {/* To Date */}
            <div className="p-inputgroup flex-1 min-w-[200px]">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calendar-clock"></i>
              </span>
              <Calendar
                name="travelEndDate"
                value={input.travelEndDate}
                onChange={(e) => {
                  setInput((prev) => ({
                    ...prev,
                    travelEndDate: e.value,
                  }));
                }}
                placeholder="To"
                className="flex-1"
                readOnlyInput
                minDate={input.travelStartDate}
              />
            </div>

            {/* Parking Type */}
            <div className="p-inputgroup flex-1 min-w-[200px]">
              <Dropdown
                value={selectedParkingType}
                onChange={(e) => {
                  setSelectedParkingType(e.value);
                  setInput((prev) => ({
                    ...prev,
                    refParkingTypeId: e.value,
                  }));
                }}
                options={parking}
                optionValue="refParkingTypeId"
                optionLabel="refParkingTypeName"
                placeholder="Choose Parking Type"
                className="w-full"
                required
              />
            </div>

            {/* Vehicle Type */}
            <div className="p-inputgroup flex-1 min-w-[200px]">
              <Dropdown
                value={selectedVechileType}
                onChange={(e) => {
                  setVechileParkingType(e.value);
                  setInput((prev) => ({
                    ...prev,
                    refCarParkingTypeId: e.value,
                  }));
                }}
                options={vechile}
                optionValue="refCarParkingTypeId"
                optionLabel="refCarParkingTypeName"
                placeholder="Choose Vehicle Type"
                className="w-full"
                required
              />
            </div>

            {/* Airport */}
            <div className="p-inputgroup flex-1 min-w-[200px]">
              <Dropdown
                value={selectedAirportType}
                onChange={(e) => {
                  setSelectedAirportType(e.value);
                  setInput((prev) => ({
                    ...prev,
                    refAssociatedAirport: e.value,
                  }));
                }}
                options={airport}
                optionValue="refAssociatedAirport"
                optionLabel="refAssociatedAirport"
                placeholder="Choose Airport Associative"
                className="w-full"
                required
              />
            </div>

            {/* Button */}
            <div className="min-w-[120px] flex items-center">
              <Button
                label="Explore"
                className="w-full"
                onClick={filterParking}
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-[30vh] w-full bg-[#fff] flex justify-center items-center">
          {/* <h1>Loading</h1> */}
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        </div>
      ) : (
        <>
          {/* Car map List - Start */}

          <div className="container mx-auto px-6 mt-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-10/12 mx-auto justify-center">
              {!loading && listParking.length === 0 && (
                <div className="text-center mt-6 text-lg text-gray-600">
                  No parking available for the selected criteria.
                </div>
              )}

              {listParking.map((car) => (
                <div
                  onClick={() => {
                    navigate("/parkingDetails", { state: { car } });
                    window.scrollTo(0, 0);
                  }}
                  key={car.refCarParkingId}
                  className="bg-white cursor-pointer shadow-md rounded-lg overflow-hidden flex flex-col w-70 my-3 mx-auto"
                >
                  {car.parkingSlotImage === null ? (
                    <>
                      <img src={tourImg} alt="Alt Image for Tours" />
                    </>
                  ) : (
                    <>
                      {" "}
                      <img
                        src="https://i.pinimg.com/736x/7f/70/dd/7f70dd969120a6912a4cb9b9c85514ae.jpg"
                        // src={`https://explorevacations.max-idigital.ch/src/assets/cars/${car.parkingSlotImage}`}
                        alt={car.refParkingName}
                        className="w-full object-cover aspect-[4/3]"
                      />
                    </>
                  )}

                  <div className="px-4 pt-4 flex-grow mb-3">
                    <h3 className="text-lg font-semibold text-black line-clamp-1">
                      {car.refParkingName}
                    </h3>
                    <div className="flex w-[100%] pt-[1rem] text-[0.8rem]">
                      <p className="text-gray-600 m-0 w-[50%] flex gap-1">
                        <img className="w-2 h-5" src={brand} alt="time" />
                        {car.refParkingTypeName}
                      </p>
                      <p className="text-gray-700 m-0 w-[50%] flex gap-1">
                        <img className="w-2 h-5" src={time} alt="time" />
                        {car.pricePerHourORday}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 pb-3  flex flex-col lg:flex-row items-center">
                    <div className="w-[100%] lg:w-[60%] pb-[10px] lg:pb-0 flex gap-1">
                      <div className="text-[1rem] font-bold">
                        {car.refPrice}
                      </div>
                      <div className="text-[0.7rem] mt-[0.3rem]">CHF</div>
                    </div>
                    <div className="w-[100%] lg:w-[40%]">
                      <div className="w-[100%] bg-[#0166b3] hover:bg-[#fff] text-center h-[2rem] flex justify-center items-center rounded-sm font-bold text-[#fff] border-2 border-[#0166b3] hover:text-[#0166b3] transition-colors duration-300 ease-in-out">
                        Book Now
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex lg:flex-row flex-col items-center h-full w-11/12 mx-auto py-20">
        {/* Left Text Content */}
        <div
          className="flex-1 flex flex-col justify-center text-left lg:text-left p-6"
          data-aos="fade-right"
        >
          <p className="testingFont text-4xl font-bold mb-2">
            {t("parking.Reserve")}{" "}
          </p>
          <p className="text-3xl font-medium pt-2 text-gray-700">
            {t("parking.Find the Best Parking Options for You")}
          </p>

          <div className="flex mt-4">
            <img src={parkinglogo} alt="" className="w-30 h-30" />
            <div className="flex flex-col pl-4">
              <p className="font-bold text-[22px]">
                {t("parking.Travel in Comfort with Our Sedan")}
              </p>
              <p className=" text-xl ">{t("parking.des1")}</p>
            </div>
          </div>
          <div className="flex mt-4">
            <img src={vechiletype} alt="" className="w-30 h-30" />
            <div className="flex flex-col pl-4">
              <p className="font-bold text-[22px]">
                {t("parking.Flexible Parking Choices for Your Trip")}
              </p>
              <p className=" text-xl ">
                {t(
                  "parking.Secure and convenient parking options designed to fit your travel needs."
                )}
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
    </div>
  );
}
