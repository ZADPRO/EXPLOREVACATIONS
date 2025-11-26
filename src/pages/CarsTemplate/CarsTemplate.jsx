import {
  BadgeSwissFranc,
  Binoculars,
  History,
  LayoutPanelLeft,
  UsersRound,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "primereact/carousel";
import { FaBabyCarriage } from "react-icons/fa";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import defaultCarImage from "../../assets/cars/minivan.jpg";
import { useLocation } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import logo from "../../assets/logo/ZURICAR.png";
import tourImg from "../../assets/cars/image.png";
import { PiSeatFill } from "react-icons/pi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import axios from "axios";
import decrypt from "../../helper";
import { Checkbox } from "primereact/checkbox";
import { FileUpload } from "primereact/fileupload";
import { useTranslation } from "react-i18next";
export default function CarsTemplate() {
  const location = useLocation();
  const [carState, setCarState] = useState();
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [driverName, setdriverName] = useState("");
  const [driverAge, setdriverAge] = useState("");
  const [driverMail, setdriverMail] = useState("");
  const { t } = useTranslation("global");

  const [driverMobile, setdriverMobile] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [submissionAddress, setSubmissionAddress] = useState("");
  const [pickupDateTime, setPickupDateTime] = useState("");
  const [dropDate, setDropDate] = useState("");
  const [extras, setExtras] = useState([]);
  const [otherRequirements, setOtherRequirements] = useState("");
  const [ismodelOpen, setIsModelOpen] = useState(false);
  const [carListData, setCarListData] = useState({});
  const [refCarsId, setRefCarsId] = useState("");
  const [carAgreement, setCarAgreement] = useState("");
  const [listCarData, setListCarData] = useState([]);
  const [activeTab, setActiveTab] = useState("Standard");
  const [extrakm, setExtrakm] = useState({ isChecked: false, value: 0 });
  const [shouldCalculate, setShouldCalculate] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isExtraKMneeded, setIsExtraKMneeded] = useState(false);
  const [selectedExtra, setSelectedExtra] = useState([]);

  // Days calculation state
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [baseDailyRate, setBaseDailyRate] = useState(0);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useRef(null);

  const roleId = localStorage.getItem("roleId");
  const [imgSrc, setImgSrc] = useState("");
  useEffect(() => {
    if (carListData?.refCarPath) {
      // Check if refCarPath is an object with content (base64)
      if (typeof carListData.refCarPath === 'object' && carListData.refCarPath.content) {
        const contentType = carListData.refCarPath.contentType || 'image/jpeg';
        setImgSrc(`data:${contentType};base64,${carListData.refCarPath.content}`);
      }
      // Check if it's a string path
      else if (typeof carListData.refCarPath === "string" && carListData.refCarPath.trim()) {
        setImgSrc(`https://zuericar.com/src/assets/cars/${carListData.refCarPath.trim()}`);
      } else {
        setImgSrc(defaultCarImage);
      }
    } else {
      setImgSrc(defaultCarImage);
    }
  }, [carListData]); // Updates whenever carListData changes


  // Calculate number of days between pickup and drop dates
  useEffect(() => {
    if (pickupDateTime && dropDate) {
      const pickup = new Date(pickupDateTime);
      const drop = new Date(dropDate);

      const diffTime = Math.abs(drop - pickup);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setNumberOfDays(diffDays > 0 ? diffDays : 1);
    } else {
      setNumberOfDays(1);
    }
  }, [pickupDateTime, dropDate]);

  // Update total price when days change
  useEffect(() => {
    if (baseDailyRate > 0) {
      const newTotal = baseDailyRate * numberOfDays;
      setTotalPrice(newTotal);
    }
  }, [numberOfDays, baseDailyRate]);


  useEffect(() => {
    setShouldCalculate(extrakm.value > 0 || selectedExtra.length > 0);
    if (extrakm.value === 0 && selectedExtra.length === 0) {
      setTotalPrice(parseInt(carListData.refCarPrice) * numberOfDays);
    }
  }, [selectedExtra, extrakm, numberOfDays, carListData.refCarPrice]);

  useEffect(() => {
    const car = location.state?.car;
    setCarState(car);
    setRefCarsId(car?.refCarsId);

    const fetchData = async () => {
      try {
        const listDestinations = await axios.post(
          import.meta.env.VITE_API_URL + "/userRoutes/getCarById",
          {
            refCarsId: car?.refCarsId,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );
        const destinationData = decrypt(
          listDestinations.data[1],
          listDestinations.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        const formDetailsArray =
          destinationData.tourDetails[0].refFormDetails || [];

        const carDetails = destinationData.tourDetails[0];
        setCarListData(carDetails);
        setExtras(formDetailsArray);

        const dailyRate = parseInt(carDetails.refCarPrice) || 0;
        setBaseDailyRate(dailyRate);
        setTotalPrice(dailyRate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (car?.refCarsId) {
      fetchData();
    }
  }, [location.state]);

  const agreementUploader = async (event) => {
    for (let i = 0; i < event.files.length; i++) {
      const formData = new FormData();
      const file = event.files[i];
      formData.append("PdfFile", file);

      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "/bookingRoutes/uploadCarAgreement",
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        const data = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        if (data.success) {
          localStorage.setItem("token", "Bearer " + data.token);
          setCarAgreement(data.filePath);
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Added Successfully!",
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Upload Failed:", error);
      }
    }
  };

  const checkingApi = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/paymentRoutes/payment",
        {
          successRedirectUrl: "https://explorevacations.max-idigital.ch",
          failedRedirectUrl: "https://explorevacations.max-idigital.ch",
          purpose: "Payment processing",
          userEmail: email,
          firstname: name.split(" ")[0],
          totalAmount: totalPrice,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      const decryptedData = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      if (decryptedData?.success) {
        const paymentLink = decryptedData?.data?.[0]?.link;
        if (paymentLink) {
          window.location.href = paymentLink;
        } else {
          alert("Payment link not found. Please try again later.");
        }
      } else {
        alert(
          "Payment creation failed: " +
          (decryptedData?.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error while making API call:", error?.message || error);
      alert("Error while making payment. Please try again later.");
    }
  };

  const handleCheckboxChange = (e, item) => {
    const id = String(item.refFormDetailsId);
    if (e.checked) {
      setSelectedExtra((prev) => [...prev, id]);
    } else {
      setSelectedExtra((prev) => prev.filter((existingId) => existingId !== id));
    }
  };

  const getRefCarTypeId = (tab) => {
    switch (tab) {
      case "Premium":
        return 1;
      case "Standard":
        return 2;
      default:
        return 1;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const refCarTypeId = getRefCarTypeId(activeTab);
        const listCarResponse = await axios.post(
          import.meta.env.VITE_API_URL + "/userRoutes/getAllCar",
          { refCarTypeId },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );

        const data = decrypt(
          listCarResponse.data[1],
          listCarResponse.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        if (data.success) {
          setListCarData(data.Details);
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getIcon = (label) => {
    if (!label || typeof label !== "string") {
      return <MdOutlineAddShoppingCart />;
    }

    switch (label.toLowerCase()) {
      case "booster seat":
        return <PiSeatFill />;
      case "child seat":
      case "child safety seat":
        return <FaBabyCarriage />;
      default:
        return <MdOutlineAddShoppingCart />;
    }
  };

  async function handlePriceCalculation() {
    const basePayload = {
      refCarsId: refCarsId,
    };
    if (extrakm.isChecked && extrakm.value > 0) {
      basePayload.refExtraKm = extrakm.value + "";
      basePayload.isExtraKMneeded = true;
      setIsExtraKMneeded(true);
    } else {
      setIsExtraKMneeded(false);
    }
    if (selectedExtra.length > 0) {
      basePayload.refFormDetails = selectedExtra;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/userRoutes/extraKMcharges",
        basePayload,
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
      if (data.success) {
        setTotalPrice(data.result.totalAmount * numberOfDays);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Price calculated successfully!",
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
    setShouldCalculate(false);
  }

  return (
    <div>
      <Toast ref={toast} />

      <div className="relative mt-10 min-h-[60vh] w-[100%] flex lg:flex-row md:flex-row flex-col items-center justify-center text-2xl sm:text-3xl font-bold">
        {loading ? (
          <div className="h-[10vh] w-[100%] flex justify-center items-center">
            <i
              className="pi pi-spin pi-spinner"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
        ) : (
          <>
            <div className="w-[50%] md:w-[30%] lg:w-[20%] mb-4">
              <div className="flex lg:flex-col flex-row justify-center gap-2 sm:gap-4 bg-gray-100 p-2 rounded-xl">
                {["Standard", "Premium"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 py-2 text-sm sm:text-base font-medium rounded-2xl transition-all duration-200 ${activeTab === tab
                        ? "bg-[#014986] text-white shadow-md"
                        : "text-gray-600 hover:bg-white"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-[85%] px-2 md:px-16 lg:px-24">
              <div className="max-w-7xl mx-auto">
                {listCarData.length > 0 ? (
                  <Carousel
                    value={listCarData}
                    itemTemplate={(car) => (
                      <div
                        key={car.refCarsId}
                        onClick={async () => {
                          try {
                            setRefCarsId(car.refCarsId);

                            const response = await axios.post(
                              import.meta.env.VITE_API_URL + "/userRoutes/getCarById",
                              { refCarsId: car.refCarsId },
                              {
                                headers: {
                                  Authorization: localStorage.getItem("token"),
                                  "Content-Type": "application/json",
                                },
                              }
                            );

                            const decrypted = decrypt(
                              response.data[1],
                              response.data[0],
                              import.meta.env.VITE_ENCRYPTION_KEY
                            );

                            const carDetails = decrypted.tourDetails[0];
                            const formDetailsArray = carDetails.refFormDetails || [];

                            setCarListData(carDetails);
                            setExtras(formDetailsArray);

                            const dailyRate = parseInt(carDetails.refCarPrice) || 0;
                            setBaseDailyRate(dailyRate);
                            setTotalPrice(dailyRate * numberOfDays);

                            setSelectedExtra([]);
                            setExtrakm({ isChecked: false, value: 0 });

                            window.scrollTo(0, 500);
                          } catch (error) {
                            console.error("Error fetching car details on click:", error);
                          }
                        }}
                        className="bg-white cursor-pointer p-1 shadow-md rounded-lg overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.02] w-[100%] sm:w-[90%] mx-auto"
                      >
                        <img
                          src={
                            typeof car?.refCarPath === "string" && car.refCarPath.trim()
                              ? `https://zuericar.com/src/assets/cars/${car.refCarPath.trim()}`
                              : tourImg
                          }
                          alt={car.refVehicleTypeName}
                          className="w-full h-40 sm:h-48 object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = tourImg;
                          }}
                        />
                        <div className="px-3 py-2">
                          <h3 className="text-sm sm:text-base font-semibold text-black line-clamp-1 text-center">
                            {car.refVehicleTypeName}
                          </h3>
                        </div>
                      </div>
                    )}
                    numVisible={3}
                    numScroll={1}
                    responsiveOptions={[
                      { breakpoint: "1024px", numVisible: 2, numScroll: 1 },
                      { breakpoint: "768px", numVisible: 1, numScroll: 1 },
                    ]}
                    circular
                    autoplayInterval={4000}
                    showIndicators={false}
                    showNavigators={true}
                  />
                ) : (
                  <div className="text-center text-gray-600 text-lg py-12">
                    {t("car.noCarsAvailable")}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-full flex flex-col lg:w-[100%] lg:flex-row md:flex-col p-4 gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 md:w-2/3">
          <div className="flex flex-col lg:flex-row border rounded-xl shadow p-4 gap-4">
            {/* Images */}
            <div className="flex flex-col gap-4 lg:w-1/2 w-full">
              <img
                src={imgSrc}
                alt={carListData?.refVehicleTypeName || "Car"}
                className="w-full h-[200px] object-cover rounded-lg"
                onError={(e) => {
                  console.error("Image failed to load:", e.target.src);
                  e.target.onerror = null;
                  e.target.src = tourImg;
                }}
              />
              <div className="w-full">
                <img src={logo} alt="logo" className="w-1/2" />
              </div>
            </div>

            {/* Car Info */}
            <div className="flex flex-col justify-center gap-3 lg:w-1/2 w-full">
              <p className="flex gap-2 items-center font-bold uppercase text-sm">
                {carListData.refVehicleTypeName}
              </p>
              <p className="text-sm">
                {t("car.extra")} KM  {t("car.charges")}:{" "}
                {carListData.refExtraKMcharges &&
                  carListData.refExtraKMcharges !== 0
                  ? carListData.refExtraKMcharges
                  : "No Extra KM Charges"}
              </p>
              <p className="flex gap-2 items-center text-sm">
                <History className="bg-[#009ad7] p-1 w-[20px] h-[20px] rounded-xl text-white" />
                <span className="font-semibold"> {t("tour.bag")}s:</span>{" "}
                {carListData.refBagCount} ( {t("car.count")})
              </p>
              <p className="flex gap-2 items-center text-sm">
                <BadgeSwissFranc className="bg-[#009ad7] p-1 w-[20px] h-[20px] rounded-xl text-white" />
                <span className="font-semibold"> {t("car.fuelType")}:</span>{" "}
                {carListData.refFuelType}
              </p>
              <p className="flex gap-2 items-center text-sm">
                <Binoculars className="bg-[#009ad7] p-1 w-[20px] h-[20px] rounded-xl text-white" />
                <span className="font-semibold"> {t("car.fuelLimit")}:</span>{" "}
                {carListData.refFuleLimit}
              </p>
              <p className="flex gap-2 items-center text-sm">
                <UsersRound className="bg-[#009ad7] p-1 w-[20px] h-[20px] rounded-xl text-white" />
                <span className="font-semibold"> {t("car.maxCount")}:</span>{" "}
                {carListData.refPersonCount === "0"
                  ? "Not Specified"
                  : carListData.refPersonCount}
              </p>
              <p className="flex gap-2 items-center text-sm">
                <LayoutPanelLeft className="bg-[#009ad7] p-1 w-[20px] h-[20px] rounded-xl text-white" />
                <span className="font-semibold"> {t("car.transmissionType")}:</span>{" "}
                {carListData.refTrasmissionType}
              </p>
              <p className="flex gap-2 items-center text-sm">
                <LayoutPanelLeft className="bg-[#009ad7] p-1 w-[20px] h-[20px] rounded-xl text-white" />
                <span className="font-semibold"> {t("car.manufacturingYear")}:</span>{" "}
                {carListData.refcarManufactureYear}
              </p>
            </div>
          </div>

          <div className="mt-6 border rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              {t("car.addExtras")}
            </h2>

            <div className="flex flex-col gap-3">
              {(extras || []).map((item) => (
                <div
                  key={item.refFormDetailsId}
                  className="flex items-center justify-between border rounded-lg px-4 py-3"
                >
                  <Checkbox
                    onChange={(e) => {
                      if (e.checked) {
                        setSelectedExtra((prev) => [
                          ...prev,
                          {
                            refFormDetailsId: item.refFormDetailsId,
                            refFormDetails: item.refFormDetails,
                          },
                        ]);
                      } else {
                        setSelectedExtra((prev) =>
                          prev.filter(
                            (extra) =>
                              extra.refFormDetailsId !== item.refFormDetailsId
                          )
                        );
                      }
                    }}
                    checked={
                      selectedExtra.findIndex(
                        (extra) =>
                          extra.refFormDetailsId === item.refFormDetailsId
                      ) !== -1
                    }
                  ></Checkbox>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {getIcon(item.refFormDetails)}
                    </span>
                    <div>
                      <p className="font-medium">{item.refFormDetails}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[#119705] font-semibold text-sm">
                      + CHF {Number(item.refPrice).toFixed(2)} /  {t("tour.day")}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {carListData.refExtraKMcharges > 0 && (
              <div className="flex flex-col lg:flex-row md:flex-row lg:items-center md:items-center gap-3 items-start mt-4">
                <div>
                  <Checkbox
                    onChange={(e) =>
                      setExtrakm((prev) => ({
                        value: 0,
                        isChecked: e.checked,
                      }))
                    }
                    checked={extrakm.isChecked}
                  ></Checkbox>
                </div>
                <div>
                  <h3 className=""> {t("car.extra")} Km</h3>
                </div>
                <div className="">
                  <InputNumber
                    placeholder="Enter Km"
                    disabled={!extrakm.isChecked}
                    value={extrakm.value}
                    onChange={(e) =>
                      setExtrakm((prev) => ({
                        ...prev,
                        value: e.value,
                      }))
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Booking Summary */}
        <div className="w-full lg:w-[50%] md:w-1/3 border rounded-xl shadow p-5 space-y-4">
          <div className="text-center text-3xl text-[#f73e3e] testingFont lg:p-3 md:p-3 mb-4 font-medium">
            <span className="text-4xl">🎉</span>  {t("car.bookNowWarning")}!
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold"> {t("car.yourBooking")}</h2>
            <span className="text-xs bg-[#d4cdcd] text-[#000] px-2 py-1 rounded-full">
              {numberOfDays} {numberOfDays === 1 ? 'day' : 'days'}
            </span>
          </div>

          <div className="flex justify-between text-sm border-b pb-2">
            <span> {t("car.dailyRate")}</span>
            <span>{baseDailyRate} CHF</span>
          </div>

          <div className="flex justify-between items-center text-sm border-b pb-2">
            <span> {t("car.numberOfDays")}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (numberOfDays > 1) {
                    setNumberOfDays(numberOfDays - 1);
                  }
                }}
                className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-md font-bold text-gray-700"
                disabled={numberOfDays <= 1}
              >
                −
              </button>
              <span className="font-semibold w-8 text-center">{numberOfDays}</span>
              <button
                onClick={() => setNumberOfDays(numberOfDays + 1)}
                className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-md font-bold text-gray-700"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between text-sm font-medium border-b pb-2">
            <span> {t("car.vehicleValue")}</span>
            <span>{totalPrice} CHF</span>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2"> {t("car.planFlex")}</h3>
            <ul className="text-sm space-y-1">
              <li className="flex items-center gap-2">
                <span className="text-[#0ca42a]">✔</span> {t("car.vehicleProtection")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#0ca42a]">✔</span> {t("car.thirdPartyProtection")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#0ca42a]">✔</span> {t("car.theftProtection")}
              </li>
            </ul>
          </div>

          <div className="flex justify-between text-sm border-t border-b py-2">
            <span>{t("car.carHireFees")}</span>
            <span className="text-[#0ca42a] font-medium">
              {t("car.includedInPrice")}
            </span>
          </div>

          <div className="flex justify-between items-center font-semibold text-base border-b pb-2">
            <span> {t("tour.totalAmount")}</span>
            <span>{totalPrice} CHF</span>
          </div>

          <div className="flex justify-center">
            {shouldCalculate ? (
              <button
                className="w-[50%] bg-[#eda917] hover:bg-[#e0a473] text-white text-base py-2 rounded-md font-semibold"
                onClick={handlePriceCalculation}
              >
                {t("car.calculateNewPrice")}
              </button>
            ) : (
              <button
                className="w-[30%] bg-[#0ca42a] hover:bg-[#35683f] text-white text-base py-2 rounded-md font-semibold"
                onClick={() => {
                  if (roleId === "3" || roleId === "6") {
                    setIsModelOpen(true);
                  } else {
                    navigate("/login", {
                      state: {
                        returnTo: window.location.pathname,
                        openModal: true
                      }
                    });
                  }
                }}
              >
                {t("car.continue")}
              </button>

            )}
          </div>
        </div>
      </div>

      <div className="py-3 sm:px-8 max-w-1xl body mx-auto text-sm sm:text-base text-gray-600 leading-relaxed text-center">
        <p>
          {t("tour.privacyNotice")}{" "}
          <span
            onClick={() => handleNavigate("/privacy")}
            className="text-[#014986] font-medium underline cursor-pointer hover:text-[#009ad7] transition"
          >
            {t("tour.privacyPolicy")}
          </span>
          . <br className="hidden sm:block" />
          {t("tour.termsNotice")}{" "}
          <span
            onClick={() => handleNavigate("/terms")}
            className="text-[#014986] font-medium underline cursor-pointer hover:text-[#009ad7] transition"
          >
            {t("tour.termsOfUse")}
          </span>
          .
        </p>
      </div>

      <div className="card flex w-11/12 mx-auto overflow-hidden py-8">
        <TabView className="w-full overflow-x-auto">
          <TabPanel header={t("car.Travel Include")} key="include">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              <ul className="list-disc pl-5">
                {carListData?.refIncludeName?.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                )) || <p>{t("tour.loading")}...</p>}
              </ul>
            </div>
          </TabPanel>
          <TabPanel header={t("car.Travel Exclude")} key="exclude">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              <ul className="list-disc pl-5">
                {carListData?.refExcludeName?.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                )) || <p>{t("tour.loading")}...</p>}
              </ul>
            </div>
          </TabPanel>
          <TabPanel header={t("car.Others")} key="tab1">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              <p>
                <b>{t("car.paymentTerms")}:</b> {carListData.refPaymentTerms}
              </p>
              <p>
                <b>:</b> {carListData.refRentalAgreement}
              </p>
              <p>
                <b>{t("tour.requirements")} :</b> {carListData.refOtherRequirements}
              </p>
            </div>
          </TabPanel>
        </TabView>
      </div>

      <Dialog
        header={t("car.Book your Car")}
        visible={ismodelOpen}
        className="w-[90%] lg:w-[85%] h-[80vh] overflow-auto"
        onHide={() => {
          if (!ismodelOpen) return;
          setIsModelOpen(false);
        }}
      >
        <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="username"
                className="w-[100%]"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="username">{t("tour.firstName")}</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="lastname"
                className="w-[100%]"
                value={lastname}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="lastname">{t("tour.lastName")}</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="email"
                className="w-[100%]"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">{t("tour.email")}</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputNumber
                id="mobileNumber"
                className="w-[100%]"
                useGrouping={false}
                required
                value={mobileNumber}
                onValueChange={(e) => setMobileNumber(e.value)}
              />
              <label htmlFor="mobileNumber">{t("tour.mobileNumber")}</label>
            </FloatLabel>
          </div>
        </div>
        <h6 className="pt-[1.5rem] text-[#295bac]">Your pickup & Drop Address -371/5, Negombo Road, Seeduwa Sri Lanka Office,Europa-Strasse 19 ,8152 Glattbrugg (ZH) Switzerland
        </h6>
        <div className="pt-[2rem] flex flex-col lg:flex-row gap-[1rem]">
          {/* <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="pickupAddress"
                className="w-[100%]"
                required
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
              />
              <label htmlFor="pickupAddress">Pick Up Address</label>
            </FloatLabel>
          </div> */}


          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="submissionAddress"
                className="w-[100%]"
                required
                value={submissionAddress}
                onChange={(e) => setSubmissionAddress(e.target.value)}
              />
              <label htmlFor="submissionAddress">{t("car.enterAddress")}</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <Calendar
                id="pickup-date"
                value={pickupDateTime ? new Date(pickupDateTime) : null}
                className="flex-1 w-[100%]"
                onChange={(e) => {
                  if (e.value) {
                    const formatted = e.value.toISOString().split("T")[0]; // "yyyy-mm-dd"
                    setPickupDateTime(formatted);
                  }
                }}
                dateFormat="yy-mm-dd"
                required
                placeholder="Pickup Date"
              />

              <label htmlFor="calendar-12h">{t("car.pickUpDate")} </label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <Calendar
                id="drop-date"
                value={dropDate ? new Date(dropDate) : null}
                className="flex-1 w-[100%]"
                onChange={(e) => {
                  if (e.value) {
                    const formatted = e.value.toISOString().split("T")[0]; // "yyyy-mm-dd"
                    setDropDate(formatted);
                  }
                }}
                dateFormat="yy-mm-dd"
                required
                placeholder="Drop Date"
              />

              <label htmlFor="calendar-12h">{t("car.dropDate")} </label>
            </FloatLabel>
          </div>
          {/* <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <Dropdown
                id="vehicle"
                value={selectedVehicleType} // Updated variable name
                onChange={(e) => setSelectedVehicleType(e.value)} // Updated variable name
                // options={typescar}
                optionLabel="name"
                placeholder="Choose Vehicle Type"
                className="flex-1 w-[100%]"
              />
              <label htmlFor="vehicle">Your Preferred Vehicle</label>
            </FloatLabel>
          </div> */}
        </div>

        {/* <h6 className="pt-[1.5rem]">Number of passengers traveling</h6>

        <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputNumber
                id="adults"
                className="w-[100%]"
                useGrouping={false}
                value={adults}
                required
                onValueChange={(e) => setAdults(e.value)}
              />
              <label htmlFor="adults">Adults</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputNumber
                id="children"
                className="w-[100%]"
                useGrouping={false}
                required
                value={children}
                onValueChange={(e) => setChildren(e.value)}
              />
              <label htmlFor="children">Children</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputNumber
                id="infants"
                className="w-[100%]"
                useGrouping={false}
                required
                value={infants}
                onValueChange={(e) => setInfants(e.value)}
              />
              <label htmlFor="infants">Infants</label>
            </FloatLabel>
          </div>
        </div> */}

        <h6 className="pt-[1.5rem]">{t("car.extra")} ({t("car.chargeable")})</h6>
        <div className="flex flex-wrap justify-start pt-[1rem] gap-3">
          {extras.map((item) => (
            <div key={item.refFormDetailsId}>
              <Checkbox
                inputId={item.refFormDetailsId}
                checked={selectedExtra.includes(String(item.refFormDetailsId))}

                onChange={(e) => handleCheckboxChange(e, item)}
              />
              <label htmlFor={item.refFormDetailsId}>{item.refFormDetails}</label>
            </div>
          ))}
        </div>


        <div className="pt-[2.5rem] flex flex-col lg:flex-row gap-[1rem]">
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputTextarea
                className="w-[100%]"
                value={otherRequirements}
                required
                onChange={(e) => setOtherRequirements(e.target.value)}
                rows={5}
                cols={30}
              />
              <label htmlFor="otherRequirements">{t("car.requirements")}</label>
            </FloatLabel>
          </div>
        </div>

        <h6 className="pt-[1.5rem]">{t("car.driverDetails")}</h6>

        <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="driverName"
                className="w-[100%]"
                required
                value={driverName}
                onChange={(e) => setdriverName(e.target.value)}
              />
              <label htmlFor="dname">{t("car.driverName")}</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="driverAge"
                className="w-[100%]"
                required
                value={driverAge}
                onChange={(e) => setdriverAge(e.value)}
              />
              <label htmlFor="dAge">{t("car.driverAge")}</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="driverMobile"
                className="w-[100%]"
                required
                value={driverMobile}
                onChange={(e) => setdriverMobile(e.value)}
              />
              <label htmlFor="infants">{t("car.driverMobile")}</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="driverMail"
                className="w-[100%]"
                required
                value={driverMail}
                onChange={(e) => setdriverMail(e.value)}
              />
              <label htmlFor="infants">{t("car.driverMail")}</label>
            </FloatLabel>
          </div>
        </div>

        <div className="w-[100%] mt-3">
          <h2 className="">{t("car.uploadAgreement")}</h2>
          <FileUpload
            name="logo"
            customUpload
            className="mt-3"
            uploadHandler={agreementUploader}
            accept="application/pdf"
            maxFileSize={10000000}
            emptyTemplate={
              <p className="m-0">{t("car.requirements")}.</p>
            }
            multiple
          />
        </div>
        <p className="text-sm text-gray-600 mt-2 italic">
          {t("car.uploadNote")}.
        </p>

        <div className="pt-[1rem] flex justify-center">
          <Button
            severity="success"
            className="w-[20%]"
            label="Pay"
            onClick={() => {
              localStorage.setItem(
                "formData",
                JSON.stringify({
                  api:
                    import.meta.env.VITE_API_URL + "/userRoutes/userCarBooking",
                  payload: {
                    refCarsId: refCarsId,
                    refUserFname: name,
                    refUserLname: lastname,
                    refUserMail: email,
                    refUserMobile: mobileNumber + "",
                    refUserAddress: submissionAddress,
                    refDropDate: dropDate,
                    refPickupDate: pickupDateTime,
                    // refAdultCount: adults + "",
                    // refChildrenCount: children + "",
                    // refInfants: infants + "",
                    refOtherRequirements: otherRequirements,
                    refFormDetails: selectedExtra,
                    refCarAgreement: carAgreement,
                    refDriverName: driverName,
                    refDriverAge: driverAge,
                    refDriverMobile: driverMobile,
                    refDriverMail: driverMail,
                    isExtraKMneeded: isExtraKMneeded,
                    refExtraKm: extrakm.value,
                  },
                })
              );
              // handleSubmit();
              checkingApi();
            }}
          />
        </div>
      </Dialog>
    </div>
  );
}

