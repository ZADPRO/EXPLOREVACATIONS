import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/floatlabel";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import defaultCarImage from "../../assets/cars/minivan.jpg";

// Car Features Image
import speed from "../../assets/cars/speed.svg";
import fueltype from "../../assets/cars/fueltype.svg";
import carmodel from "../../assets/cars/carmodel.svg";
import geartype from "../../assets/cars/geartype.svg";
import person from "../../assets/cars/person.svg";
import bags from "../../assets/cars/bags.svg";
import decrypt from "../../helper";
import axios from "axios";

import tourImg from "../../assets/cars/luxury.jpg";
import Popup from "../../pages/Popup/Popup";
import BannerCarousel from "../01-Home/BannerCarousel ";
import { useTranslation } from "react-i18next";

export default function Cars() {
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
  const toast = useRef(null);
  const navigate = useNavigate();

  const [carPickupLocation, setCarPickupLocation] = useState(null);
  const [carPickupDateTime, setCarPickupDateTime] = useState(null);
  const today = new Date();
  const [carDropLocation, setCarDropLocation] = useState(null);
  const [carDropDateTime, setCarDropDateTime] = useState(null);
  const [inputs, setInputs] = useState({ refCarTypeId: "" });
  const [cartypeId, setcarTypeId] = useState("");

  const [listCarData, setListCarData] = useState([]);
  const [activeTab, setActiveTab] = useState("Standard");
  const [loading, setLoading] = useState(true);

  const getRefCarTypeId = (tab) => {
    switch (tab) {
      case "Premium":
        return 1;
      case "Standard":
        return 2;
      default:
        return 2; // Default to Standard
    }
  };

  const [ismodelOpen, setIsModelOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [submissionAddress, setSubmissionAddress] = useState("");
  const [pickupDateTime, setPickupDateTime] = useState(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [carName, setCarName] = useState(null);
  const [carType, setCarType] = useState(null);
  const [carData, setCarData] = useState([]);
  const [carTypeData, setCarTypeData] = useState([]);
  const [carGuest, setCarGuest] = useState("");
  const [extras, setExtras] = useState({
    cheese: false,
    childSeat: false,
    boosterSeat: false,
    golfBag: false,
    mountainBike: false,
    wineBottle: false,
    champagneBottle: false,
    beerBottle: false,
    localSimCard: false,
    gpsDevice: false,
  });
  const [otherRequirements, setOtherRequirements] = useState("");

  const handleCheckboxChange = (e) => {
    setExtras({ ...extras, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    fetchDropdown();
    // Load default data based on activeTab when component mounts
    fetchCarData(getRefCarTypeId(activeTab));
  }, []);

  // When activeTab changes, fetch data for that tab
  useEffect(() => {
    fetchCarData(getRefCarTypeId(activeTab));
  }, [activeTab]);

  const fetchCarData = (defaultCarTypeId = null) => {
    console.log("Fetching Car Data...");
    setLoading(true);

    // Determine which refCarTypeId to use
    let refCarTypeIdToUse;

    // If filters are applied (carType has a value), use the filter
    if (carType) {
      refCarTypeIdToUse = carType;
    }
    // If a default is provided (from activeTab), use that
    else if (defaultCarTypeId) {
      refCarTypeIdToUse = defaultCarTypeId;
    }
    // Otherwise, use the activeTab's corresponding ID
    else {
      refCarTypeIdToUse = getRefCarTypeId(activeTab);
    }

    const requestPayload = {
      refCarTypeId: refCarTypeIdToUse,
      refVehicleTypeId: carName || null,
      refPersonCount: carGuest || null,
    };

    console.log("Request payload:", requestPayload);

    axios
      .post(
        import.meta.env.VITE_API_URL + "/userRoutes/getAllCar",
        requestPayload,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const data = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        console.log("Car Data =======", data);
        if (data.success) {
          setListCarData(data.Details);
        }
      })
      .catch((err) => {
        console.error("Error in cardata:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchDropdown = async () => {
    try {
      console.log("Verify Token Running --- ");

      const listDestinations = await axios.get(
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

      if (destinationData.success) {
        setCarData(destinationData.VehicleType);
        setCarTypeData(destinationData.carType);
      }

      const listTourResponse = await axios.post(
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

  const handleSubmit = async () => {
    if (!name || !email || !mobileNumber || !pickupDateTime) {
      toast.current.show({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill in all required fields.",
        life: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/userRoutes/userCarBooking",
        {
          refUserName: "John Doe",
          refUserMail: "johndoe@example.com",
          refUserMobile: "1234567890",
          refPickupAddress: "123 Main Street, NY",
          refSubmissionAddress: "456 Elm Street, NY",
          refPickupDate: "2025-04-01",
          refVehicleTypeId: 3,
          refAdultCount: 2,
          refChildrenCount: 1,
          refInfants: 0,
          refOtherRequirements: "Need a baby seat",
          refFormDetails: [1, 2, 3],
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
      console.log("data list tour data ======= ?", data);
      if (data.success) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Added successfully!",
          life: 3000,
        });
        localStorage.setItem("token", "Bearer " + data.token);
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Submission Failed",
        detail: "Something went wrong. Please try again.",
        life: 3000,
      });
      console.error("API Error:", error);
    }
  };

  const handleClearFilters = () => {
    setCarType(null);
    setCarName(null);
    setCarGuest(0);
    // After clearing filters, fetch data based on activeTab
    fetchCarData(getRefCarTypeId(activeTab));
  };

  // Handle filter application
  const handleApplyFilters = () => {
    fetchCarData();
  };

  return (
    <div>
      <Toast ref={toast} />
      <Popup />

      <div className="mt-20">
        <BannerCarousel moduleId={2} />
      </div>

      {/* Input Finder */}
      <div>
        <div className="card w-10/12 mx-auto bg-white p-4 shadow-md rounded-lg">
          <div className="flex gap-3 lg:flex-row flex-column flex-wrap">
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">
                <i className="pi pi-map-marker"></i>
              </span>
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

            <Button
              label="Explore"
              onClick={handleApplyFilters}
              className="bg-[#014986] text-white"
            />
            <Button
              label="Clear"
              className="px-4 p-button-secondary"
              onClick={handleClearFilters}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-[30vh] w-full bg-[#fff] flex justify-center items-center">
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        </div>
      ) : (
        <></>
      )}

      <h1 className="text-2xl font-bold mb-5 mt-2 text-center text-[#014986]">
        {t("car.Available Cars")}
      </h1>

      <div className="w-full max-w-4xl mx-auto mt-12">
        <div className="flex justify-center gap-4 bg-gray-100 p-2">
          {["Standard", "Premium"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2  text-sm font-medium transition-all duration-200 
          ${activeTab === tab
                  ? "bg-[#014986] text-white shadow-md"
                  : "text-gray-600 hover:bg-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Car map List - Start */}
      <div className="container mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-10/12 mx-auto justify-center">
          {listCarData.map((car) => (
            <div
              onClick={() => {
                navigate("/carDetails", { state: { car } });
                window.scrollTo(0, 0);
              }}
              key={car.refCarsId}
              className="bg-white cursor-pointer shadow-md rounded-lg overflow-hidden flex flex-col w-70 my-3 mx-auto"
            >
              {car.refCarPath === null ? (
                <img src={tourImg} alt="Alt Image for Tours" />
              ) : (
                <img
                  src={`https://zuericar.com/src/assets/cars/${car.refCarPath}`}
                  alt={car.refVehicleTypeName}
                  className="w-full object-cover aspect-[4/3]"
                />
              )}

              <div className="px-4 pt-4 flex-grow">
                <h3 className="text-lg font-semibold text-black line-clamp-1">
                  {car.refVehicleTypeName}
                </h3>
                <div className="flex w-[100%] pt-[1rem] text-[0.8rem]">
                  <p className="text-gray-600 m-0 w-[50%] flex gap-1">
                    <img src={speed} alt="speed" />
                    {car.refMileage}
                  </p>
                  <p className="text-gray-700 m-0 w-[50%] flex gap-1">
                    <img src={fueltype} alt="fueltype" />
                    {car.refFuelType}
                  </p>
                </div>
                <div className="flex w-[100%] text-[0.8rem] pt-[0.5rem] pb-[0.5rem]">
                  <p className="text-gray-600 m-0 w-[50%] flex gap-1">
                    <img src={carmodel} alt="carmodel" />
                    {car.refcarManufactureYear}
                  </p>
                  <p className="text-gray-700 m-0 w-[50%] flex gap-1">
                    <img src={geartype} alt="geartype" />
                    {car.refTrasmissionType}
                  </p>
                </div>
                <div className="flex w-[100%] pb-[1rem] text-[0.8rem]">
                  <p className="text-gray-600 m-0 w-[50%] flex gap-1">
                    <img src={person} alt="person" />
                    {car.refPersonCount} Person
                  </p>
                  <p className="text-gray-700 m-0 w-[50%] flex gap-1">
                    <img src={bags} alt="bags" />
                    {car.refBagCount} Bag
                  </p>
                </div>
              </div>
              <div className="px-4 pb-3  flex flex-col lg:flex-row items-center">
                <div className="w-[100%] lg:w-[60%] pb-[10px] lg:pb-0 flex gap-1">
                  <div className="text-[1rem] font-bold">{car.refCarPrice}</div>
                  <div className="text-[0.7rem] mt-[0.3rem]">/ Day</div>
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
    </div>
  );
}
