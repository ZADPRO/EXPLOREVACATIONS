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
// import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import defaultCarImage from "../../assets/cars/minivan.jpg";
import { useLocation } from "react-router-dom";

import { TabView, TabPanel } from "primereact/tabview";
import speed from "../../assets/cars/speed.svg";
import fueltype from "../../assets/cars/fueltype.svg";
import carmodel from "../../assets/cars/carmodel.svg";
import geartype from "../../assets/cars/geartype.svg";
import person from "../../assets/cars/person.svg";
import bags from "../../assets/cars/bags.svg";
import logo from "../../assets/logo/logoPng.png";
import tourImg from "../../assets/cars/image.png";
import { PiSeatFill } from "react-icons/pi";
// import { FaBabyCarriage } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import axios from "axios";

import decrypt from "../../helper";
import { Checkbox } from "primereact/checkbox";
import { FileUpload } from "primereact/fileupload";

export default function CarsTemplate() {
  const location = useLocation();
  const [carState, setCarState] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [submissionAddress, setSubmissionAddress] = useState("");
  const [pickupDateTime, setPickupDateTime] = useState(null);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [extras, setExtras] = useState([]);
  const [otherRequirements, setOtherRequirements] = useState("");
  const [ismodelOpen, setIsModelOpen] = useState(false);
  const [carListData, setCarLIstData] = useState({});
  const [refCarsId, setRefCarsId] = useState("");
  const [carAgreement, setCarAgreement] = useState([]);
  const [listCarData, setListCarData] = useState([]);
  const [activeTab, setActiveTab] = useState("Standard");
  const [extrakm, setExtrakm] = useState({ isChecked: false, value: 0 });
  const [shouldCalculate, setShouldCalculate] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedExtra, setSelectedExtra] = useState([]);

  const selectedExtrasArray = Object.keys(extras).filter((key) => extras[key]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useRef(null);

  const [imgSrc, setImgSrc] = useState(
    carListData?.refCarPath?.trim()
      ? `https://explorevacations.max-idigital.ch/src/assets/cars/${carListData.refCarPath}`
      : tourImg
  );

  useEffect(() => {
    setShouldCalculate(extrakm.value > 0 || selectedExtra.length > 0);
    if (extrakm.value === 0 && selectedExtra.length === 0) {
      setTotalPrice(parseInt(carListData.refCarPrice));
    }
  }, [selectedExtra, extrakm]);

  useEffect(() => {
    console.log("routing cary");

    const car = location.state?.car;
    setCarState(car);
    setRefCarsId(car.refCarsId);

    const fetchData = async () => {
      try {
        console.log("Verify Token Running --- ");
        console.log("car.refCarsId", car.refCarsId);

        const listDestinations = await axios.post(
          import.meta.env.VITE_API_URL + "/userRoutes/getCarById",
          {
            refCarsId: car.refCarsId,
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

        setCarLIstData(carDetails);
        setExtras(formDetailsArray);
        console.log("formDetailsArray--------------------->", formDetailsArray);

        setCarLIstData(destinationData.tourDetails[0]);
        setTotalPrice(parseInt(destinationData.tourDetails[0].refCarPrice));

        console.log("getCarById ========== line 118 >", destinationData);
        // setCarLIstData(destinationData.tourDetails[0]);
        // setExtras(destinationData.tourDetails[0].refFormDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const handleSubmit = async () => {
  //   if (!name || !email || !mobileNumber || !pickupDateTime) {
  //     toast.current.show({
  //       severity: "error",
  //       summary: "Validation Error",
  //       detail: "Please fill in all required fields.",
  //       life: 3000,
  //     });
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       import.meta.env.VITE_API_URL + "/userRoutes/userCarBooking",
  //       {
  //         refCarsId: refCarsId,
  //         refUserName: name,
  //         refUserMail: email,
  //         refUserMobile: mobileNumber + "",
  //         refPickupAddress: pickupAddress,
  //         refSubmissionAddress: submissionAddress,
  //         refPickupDate: pickupDateTime,
  //         refAdultCount: adults + "",
  //         refChildrenCount: children + "",
  //         refInfants: infants + "",
  //         refOtherRequirements: otherRequirements,
  //         refFormDetails: selectedExtrasArray,
  //         refCarAgreement: carAgreement,
  //       },
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const data = decrypt(
  //       response.data[1],
  //       response.data[0],
  //       import.meta.env.VITE_ENCRYPTION_KEY
  //     );

  //     console.log(data);

  //     if (data.success) {
  //       localStorage.setItem("token", "Bearer " + data.token);
  //       setIsModelOpen(false);
  //     }
  //   } catch (error) {
  //     toast.current.show({
  //       severity: "error",
  //       summary: "Submission Failed",
  //       detail: "Something went wrong. Please try again.",
  //       life: 3000,
  //     });
  //     console.error("API Error:", error);
  //   }
  // };

  const agreementUploader = async (event) => {
    console.table("event", event);

    // Create a FormData object

    // Loop through the selected files and append each one to the FormData
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
          handleAgreementUploadSuccess(data);
          toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Added Successfully!",
          life: 3000,
        });
        } else {
          handleAgreemtUploadFailure(data);
        }
      } catch (error) {
        handleAgreemtUploadFailure(error);
      }
    }
  };
  const handleAgreementUploadSuccess = (response) => {
    let temp = [...passportImage]; // Create a new array to avoid mutation
    temp.push(response.filePath); // Add the new file path
    console.log("Upload Successful:", response);
    setCarAgreement(temp); // Update the state with the new array
  };

  const handleAgreemtUploadFailure = (error) => {
    console.error("Upload Failed:", error);
    // Add your failure handling logic here
  };

  // payment
  const checkingApi = async () => {
    try {
      console.log("checkingApi running--->",totalPrice);
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/paymentRoutes/payment",
        {
          successRedirectUrl: "https://explorevacations.max-idigital.ch",
          failedRedirectUrl: "https://explorevacations.max-idigital.ch",
          purpose: "Payment processing",
          userEmail: email,
          firstname: name.split(" ")[0],
          totalAmount:totalPrice,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      // Decrypt the response
      const decryptedData = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      console.log("decryptedData:", decryptedData);

      if (decryptedData?.success) {
        const paymentLink = decryptedData?.data?.[0]?.link;
        if (paymentLink) {
          console.log("Redirecting to paymentLink:", paymentLink);
          window.location.href = paymentLink;
        } else {
          console.warn("Payment link not found in success response.");
          alert("Payment link not found. Please try again later.");
        }
      } else {
        console.error(
          "Payment creation failed:",
          decryptedData?.message || "Unknown error"
        );
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

  //filter data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        const destinationData = decrypt(
          listDestinations.data[1],
          listDestinations.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("Tour Data ======= line 738", destinationData);
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
        console.log("Car Data ======= line 738", data);
        if (data.success) {
          // localStorage.setItem("token", "Bearer " + data.token);
          setListCarData(data.Details);
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, [activeTab]);

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //extra

  const getIcon = (label) => {
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
    console.log("extrakm.value",extrakm.value)
    const basePayload = {
      refCarsId: refCarsId,
    };
    if (extrakm.isChecked && extrakm.value > 0) {
      basePayload.refExtraKm = extrakm.value + "";
      basePayload.isExtraKMneeded = true;
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
      console.log("data ======= ?", data);
      if (data.success) {
        // setTotalPrice(
        //   parseInt(carListData.refCarPrice) + data.result.totalAmount
        // );
        setTotalPrice(data.result.totalAmount);
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
    setShouldCalculate(false);
  }

  return (
    <div>
      <Toast ref={toast} />

      <div className="relative mt-10 min-h-[60vh] bg-[#dbeefa] flex items-center justify-center text-2xl sm:text-3xl font-bold ">
        {loading ? (
          <div className="h-[10vh] w-full flex justify-center items-center">
            <i
              className="pi pi-spin pi-spinner"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
        ) : (
          <>
            <div className="w-[100%] sm:w-[40%] md:w-[30%] lg:w-[20%] mx-auto mb-4">
              <div className="flex flex-col   justify-center gap-2 sm:gap-4 bg-gray-100 p-2 rounded-xl">
                {["Standard", "Premium"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 py-2 text-sm sm:text-base font-medium rounded-2xl transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-[#014986] text-white shadow-md"
                        : "text-gray-600 hover:bg-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full px-2 sm:px-4">
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
                              import.meta.env.VITE_API_URL +
                                "/userRoutes/getCarById",
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
                            const formDetailsArray =
                              carDetails.refFormDetails || [];

                            setCarLIstData(carDetails);
                            setExtras(formDetailsArray);
                            window.scrollTo(0, 500); // Optional: scroll to details section
                          } catch (error) {
                            console.error(
                              "Error fetching car details on click:",
                              error
                            );
                          }
                        }}
                        className="bg-white cursor-pointer p-1 shadow-md rounded-lg overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.02] w-[100%] sm:w-[90%] mx-auto"
                      >
                        <img
                          src={
                            car.refCarPath === null
                              ? tourImg
                              : `https://explorevacations.max-idigital.ch/src/assets/cars/${car.refCarPath}`
                          }
                          alt={car.refVehicleTypeName}
                          className="w-full h-40 sm:h-48 object-cover"
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
                      {
                        breakpoint: "1024px",
                        numVisible: 2,
                        numScroll: 1,
                      },
                      {
                        breakpoint: "768px",
                        numVisible: 1,
                        numScroll: 1,
                      },
                    ]}
                    circular
                    autoplayInterval={4000}
                    showIndicators={false}
                    showNavigators={true}
                  />
                ) : (
                  <div className="text-center text-gray-600 text-lg py-12">
                    No cars available
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
              {carListData?.refCarPath && (
                <img
                  src={imgSrc}
                  alt="Car"
                  onError={() => setImgSrc(tourImg)} // fallback when image fails to load
                  className="w-full h-[200px] object-cover rounded-lg"
                />
              )}
              <div className="w-full">
                <img src={logo} alt="logo" className="w-1/2" />
              </div>
            </div>

            {/* Car Info */}
            <div className="flex flex-col justify-center gap-3 lg:w-1/2 w-full">
              <p className="flex gap-2 items-center font-bold uppercase text-sm">
                {carListData.refVehicleTypeName}
              </p>
              <p className="flex gap-2 items-center text-sm">
                <History className="bg-[#009ad7] p-1 w-[20px] h-[20px] rounded-xl text-white" />
                <span className="font-semibold">Bags:</span>{" "}
                {carListData.refBagCount} (Count)
              </p>
              <p className="flex gap-2 items-center text-sm">
                <BadgeSwissFranc className="bg-[#009ad7] p-1 w-[20px] h-[20px] rounded-xl text-white" />
                <span className="font-semibold">Fuel Type:</span>{" "}
                {carListData.refFuelType}
              </p>
              <p className="flex gap-2 items-center text-sm">
                <Binoculars className="bg-[#009ad7] p-1 w-[20px] h-[20px] rounded-xl text-white" />
                <span className="font-semibold">Fuel Limit:</span>{" "}
                {carListData.refFuleLimit}
              </p>
              <p className="flex gap-2 items-center text-sm">
                <UsersRound className="bg-[#009ad7] p-1 w-[20px] h-[20px] rounded-xl text-white" />
                <span className="font-semibold">Max Count:</span>{" "}
                {carListData.refPersonCount === "0"
                  ? "Not Specified"
                  : carListData.refPersonCount}
              </p>
              <p className="flex gap-2 items-center text-sm">
                <LayoutPanelLeft className="bg-[#009ad7] p-1 w-[20px] h-[20px] rounded-xl text-white" />
                <span className="font-semibold">Transmission Type:</span>{" "}
                {carListData.refTrasmissionType}
              </p>
              <p className="flex gap-2 items-center text-sm">
                <LayoutPanelLeft className="bg-[#009ad7] p-1 w-[20px] h-[20px] rounded-xl text-white" />
                <span className="font-semibold">Manufacturing Year:</span>{" "}
                {carListData.refcarManufactureYear}
              </p>
              {/* <div>
                <button
                  className="px-3 py-1 rounded bg-[#009ad7] text-white text-sm font-semibold"
                  // onClick={() => setIsModelOpen(true)}
                >
                  Book Now
                </button>
              </div> */}
            </div>
          </div>
          {/* <div className="mt-6 border rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              Add in extras to your booking
            </h2>
            <div className="flex flex-col gap-3">
              {[
                {
                  label: "Booster Seat",

                  icon: <PiSeatFill />,
                  price: 6.0,
                },
                {
                  label: "Child Safety Seat",
                  icon: <FaBabyCarriage />,
                  price: 6.0,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border rounded-lg px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-medium">{item.label}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#119705] font-semibold text-sm">
                      + CHF{item.price.toFixed(2)} / day
                    </span>
                    <div className="flex items-center border rounded-md px-2">
                      <button className="text-gray-600 font-bold px-1">
                        −
                      </button>
                      <span className="mx-2 text-sm">0</span>
                      <button className="text-gray-600 font-bold px-1">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* <div className="mt-6 border rounded-xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Add in extras to your booking
      </h2>

      <div className="flex flex-col gap-3">
        {extra?.map((item) => (
          <div
            key={item.refFormDetailsId}
            className="flex items-center justify-between border rounded-lg px-4 py-3"
          >
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
                + CHF {Number(item.refPrice).toFixed(2)} / day
              </span>
              <div className="flex items-center border rounded-md px-2">
                <button
                  className="text-gray-600 font-bold px-1 cursor-pointer"
                  onClick={() => decrementCount(item.refFormDetailsId)}
                >
                  −
                </button>
                <span className="mx-2 text-sm ">
                  {extraCounts[item.refFormDetailsId] || 0}
                </span>
                <button
                  className="text-gray-600 font-bold px-1 cursor-pointer"
                  onClick={() => incrementCount(item.refFormDetailsId)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}

       
        {extra?.[0]?.refCarPath && (
          <img
            src={imgSrc || extra[0].refCarPath}
            alt="Car"
            onError={() => setImgSrc(tourImg)}
            className="w-full h-[200px] object-cover rounded-lg"
          />
        )}
      </div>
    </div> */}

          <div className="mt-6 border rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              Add in extras to your booking
            </h2>

            <div className="flex flex-col gap-3">
              {extras?.map((item) => (
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
                      + CHF {Number(item.refPrice).toFixed(2)} / day
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className=" flex flex-col lg:flex-row md:flex-row lg:items-center md:items-center  gap-3 items-start  mt-4">
              <div>
                {" "}
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
                {" "}
                <h3 className="">Extra Km</h3>
              </div>

              <div className=" ">
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
          </div>
        </div>

        {/* Right Section - Booking Summary */}
        <div className="w-full lg:w-[50%] md:w-1/3 border rounded-xl shadow p-5 space-y-4">
          <div className="text-center text-3xl text-[#f73e3e] testingFont lg:p-3 md:p-3 mb-4 font-medium">
            <span className="text-4xl">🎉</span> Don’t wait — book now before
            rates increase!
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your booking</h2>
            <span className="text-xs bg-[#d4cdcd] text-[#000] px-2 py-1 rounded-full">
              1 daily rate
            </span>
          </div>

          <div className="flex justify-between text-sm font-medium border-b pb-2">
            <span>Vehicle Value</span>
            <span>{totalPrice}CHF</span>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Plan Flex</h3>
            <ul className="text-sm space-y-1">
              <li className="flex items-center gap-2">
                <span className="text-[#0ca42a]">✔</span> Vehicle Protection
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#0ca42a]">✔</span> Third-Party Protection
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#0ca42a]">✔</span> Theft Protection
              </li>
            </ul>
          </div>

          <div className="flex justify-between text-sm border-t border-b py-2">
            <span>Car hire company fees</span>
            <span className="text-[#0ca42a] font-medium">
              Included in Price
            </span>
          </div>

          <div className="flex justify-between items-center font-semibold text-base border-b pb-2">
            <span>Total amount</span>
            <span>{totalPrice}CHF</span>
          </div>

          <div className="flex justify-center">
            {shouldCalculate ? (
              <button
                className="w-[50%] bg-[#eda917] hover:bg-[#e0a473] text-white text-base py-2 rounded-md font-semibold"
                onClick={handlePriceCalculation}
              >
                Calculate New Price
              </button>
            ) : (
              <button
                className="w-[30%] bg-[#0ca42a] hover:bg-[#35683f] text-white text-base py-2 rounded-md font-semibold"
                onClick={() => setIsModelOpen(true)}
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>

      <div className=" py-3 sm:px-8 max-w-1xl body mx-auto text-sm sm:text-base text-gray-600 leading-relaxed text-center ">
        <p>
          By continuing to use our services, you acknowledge that your personal
          data will be processed in accordance with{" "}
          <span
            onClick={() => handleNavigate("/privacy")}
            className="text-[#014986] font-medium underline cursor-pointer hover:text-[#009ad7] transition"
          >
            Privacy Policy
          </span>
          . <br className="hidden sm:block" />
          By creating an account, you agree to{" "}
          <span
            onClick={() => handleNavigate("/terms")}
            className="text-[#014986] font-medium underline cursor-pointer hover:text-[#009ad7] transition"
          >
            Terms of Use
          </span>
          .
        </p>
      </div>

      <div className="card flex w-11/12 mx-auto overflow-hidden py-8">
        <TabView className="w-full overflow-x-auto">
          <TabPanel header="Travel Include" key="tab1">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              <ul className="list-disc pl-5">
                {carListData?.refIncludeName?.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                )) || <p>Loading...</p>}
              </ul>
            </div>
          </TabPanel>
          <TabPanel header="Travel Exclude" key="tab1">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              <ul className="list-disc pl-5">
                {carListData?.refExcludeName?.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                )) || <p>Loading...</p>}
              </ul>
            </div>
          </TabPanel>
          <TabPanel header="Travel Details" key="tab1">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              <ul className="list-disc pl-5">
                {carListData?.refFormDetails?.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                )) || <p>Loading...</p>}
              </ul>
            </div>
          </TabPanel>
          <TabPanel header="Others" key="tab1">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              <p>
                <b>Payment Terms:</b> {carListData.refPaymentTerms}
              </p>
              <p>
                <b>Rental Agreement:</b> {carListData.refRentalAgreement}
              </p>
              <p>
                <b>Other Requirements:</b> {carListData.refOtherRequirements}
              </p>
            </div>
          </TabPanel>
        </TabView>
      </div>

      <Dialog
        header="Book your Car"
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
              <label htmlFor="username">User Name</label>
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
              <label htmlFor="email">Your Email</label>
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
              <label htmlFor="mobileNumber">Your Mobile Number</label>
            </FloatLabel>
          </div>
        </div>

        <div className="pt-[2rem] flex flex-col lg:flex-row gap-[1rem]">
          <div className="w-[100%]">
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
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="submissionAddress"
                className="w-[100%]"
                required
                value={submissionAddress}
                onChange={(e) => setSubmissionAddress(e.target.value)}
              />
              <label htmlFor="submissionAddress">Submission Address</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <Calendar
                id="calendar-12h"
                value={pickupDateTime} // Updated variable name
                className="flex-1 w-[100%]"
                onChange={(e) => setPickupDateTime(e.value)} // Updated variable name
                showTime
                required
                placeholder="Pickup Date & Time"
                hourFormat="12"
              />
              <label htmlFor="calendar-12h">Pick Up Date & Time</label>
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

        <h6 className="pt-[1.5rem]">Number of passengers traveling</h6>

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
        </div>
        {/* 
        <h6 className="pt-[1.5rem]">Extras (chargeable)</h6>

        <div className="flex flex-wrap justify-start pt-[1rem] gap-3">
          {Object.keys(extras).map((key) => (
            <div className="flex align-items-center" key={key}>
              <Checkbox
                inputId={key}
                name={key}
                checked={extras[key]}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={key} className="ml-2">
                {key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1")}
              </label>
            </div>
          ))}
        </div> */}

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
              <label htmlFor="otherRequirements">Your other requirements</label>
            </FloatLabel>
          </div>
        </div>

        <div className="w-[100%]">
          <h2 className="">Upload Agreement</h2>
          <FileUpload
            name="logo"
            customUpload
            className="mt-3"
            uploadHandler={agreementUploader}
            accept="application/pdf"
            maxFileSize={10000000}
            emptyTemplate={
              <p className="m-0">Drag and drop your Image here to upload.</p>
            }
            multiple
          />
        </div>

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
                    refUserName: name,
                    refUserMail: email,
                    refUserMobile: mobileNumber + "",
                    refPickupAddress: pickupAddress,
                    refSubmissionAddress: submissionAddress,
                    refPickupDate: pickupDateTime,
                    refAdultCount: adults + "",
                    refChildrenCount: children + "",
                    refInfants: infants + "",
                    refOtherRequirements: otherRequirements,
                    refFormDetails: selectedExtrasArray,
                    refCarAgreement: carAgreement,
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
