import { RiPencilFill } from "react-icons/ri";
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
// import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
// import { color } from "framer-motion";
import decrypt from "../../helper";
// import { classNames } from "primereact/utils";
import box from "../../assets/TouBooking/Box.png";
import { useTranslation } from "react-i18next";
import { BiWorld } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { MdOutlineLocalParking } from "react-icons/md";

export default function Profile() {
  // const getFlag = () => {
  //   switch (language) {
  //     case "en":
  //       return flagEN;
  //     case "de":
  //       return flagDE;
  //     default:
  //       return flagEN;
  //   }
  // };

  const { t, i18n } = useTranslation("global");

  // const handleChangeLang = (lang) => {
  //   i18n.changeLanguage(lang);
  // };
  const toast = useRef(null);
  const [selectedTab, setSelectedTab] = useState("Personal Info");
  const [isEditable, setIsEditable] = useState(false);
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "success",
      detail: "Updated Successfully",
      life: 3000,
    });
  };
  const [input, setInput] = useState({
    refFName: "",
    refLName: "",
    refDOB: "",
    refMoblile: "",
    refUserEmail: "",
    refUserPassword: "",
    refUserAddress: "",
    refUserCity: "",
    refUserState: "",
    refUserCountry: "",
    refUserZipCode: "",
  });

  const [address, setAddress] = useState({
    refUserAddress: "",
    refUserCity: "",
    refUserState: "",
    refUserCountry: "",
    refUserZipCode: "",
  });

  const [history, setHistory] = useState("");
  const [carHistory, setCarHistory] = useState("");
  const [parkingHistory, setParkingHistory] = useState("");
  const [setProfile] = useState("");

  // const [profileData, setProfileData] = useState(initialData);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // const handleAddress = (e) => {
  //   const { name, value } = e.target;
  //   setAddress((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleSave = async () => {
    await ProfileUpdate();
    showSuccess();
    setIsEditable(false);
  };

  useEffect(() => {
    fetchTourHistory();
    fetchProfileData();
    fetchCarHistory();
    fetchParkingHistory();
  }, []);

  useEffect(() => {
    console.log("Input state updated:", input);
  }, [input]);

  const fetchTourHistory = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/userRoutes/tourBookingHistory",
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
      console.log("data ---------->list tour History", data);
      if (data.success) {
        localStorage.setItem("token", "Bearer " + data.token);
        console.log("Tourhistory----------------", data);
        setHistory(data.tourBookingresult);
      }
    } catch (e) {
      console.log("Error fetching tour history:", e);
    }
  };

  const fetchCarHistory = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/userRoutes/carBookingHistory",
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
      console.log("data ---------->list car History", data);
      if (data.success) {
        localStorage.setItem("token", "Bearer " + data.token);
        console.log("Carhistory----------------", data);
        setCarHistory(data.CarBookingresult);
      }
    } catch (e) {
      console.log("Error fetching Car history:", e);
    }
  };

  const fetchParkingHistory = async () => {
    console.log("userRoutes/carParkingBooking");
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/userRoutes/carParkingHistory",
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
      console.log("data ---------->userRoutes/carParkingBooking", data);
      if (data.success) {
        localStorage.setItem("token", "Bearer " + data.token);
        console.log("userRoutes/carParkingBooking----------------", data);
        setParkingHistory(data.CarParkingBookingresult);
      }
    } catch (e) {
      console.log("Error fetching Car history:", e);
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/userRoutes/profileData",
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

      console.log("data ---------->list Profiledata", data);

      if (data.success) {
        localStorage.setItem("token", "Bearer " + data.token);
        const profileInfo = data.profileData[0];

        setInput({
          refFName: profileInfo.refFName || "",
          refLName: profileInfo.refLName || "",
          refDOB: profileInfo.refDOB ? profileInfo.refDOB.split("T")[0] : "",
          refMoblile: profileInfo.refMoblile || "",
          refUserEmail: profileInfo.refUserEmail || "",
          refUserPassword: "",
          refUserAddress: profileInfo.refUserAddress || "",
          refUserCity: profileInfo.refUserCity || "",
          refUserState: profileInfo.refUserState || "",
          refUserCountry: profileInfo.refUserCountry || "",
          refUserZipCode: profileInfo.refUserZipCode || "",
        });
        setAddress({
          refUserAddress: profileInfo.refUserAddress || "",
          refUserCity: profileInfo.refUserCity || "",
          refUserState: profileInfo.refUserState || "",
          refUserCountry: profileInfo.refUserCountry || "",
          refUserZipCode: profileInfo.refUserZipCode || "",
        });

        setProfile(profileInfo);
      }
    } catch (e) {
      console.log("Error fetching profile data:", e);
    }
  };

  const ProfileUpdate = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/userRoutes/UpdateprofileData",

        {
          refFName: input.refFName,
          refLName: input.refLName,
          refDOB: input.refDOB,
          refMoblile: input.refMoblile,
          refUserEmail: input.refUserEmail,
          refUserPassword: input.refUserPassword,
          refUserAddress: input.refUserAddress,
          refUserCity: input.refUserCity,
          refUserState: input.refUserState,
          refUserCountry: input.refUserCountry,
          refUserZipCode: input.refUserZipCode,
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
        localStorage.setItem("token", "Bearer " + data.token);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  //address

  const Addaddress = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/userRoutes/addUserAddress",

        {
          refUserAddress: address.refUserAddress,
          refUserCity: address.refUserCity,
          refUserState: address.refUserState,
          refUserCountry: address.refUserCountry,
          refUserZipCode: address.refUserZipCode,
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
        localStorage.setItem("token", "Bearer " + data.token);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <div className="min-h-screen flex flex-row lg:flex-col md:flex-col bg-gray-100 font-sans">
      {/* Left Sidebar */}
      <div className="w-[30%]  lg:w-[20%] md:w-[20%] bg-[#065784] text-white hidden lg:flex flex-col lg:flex-col md:flex-col">
        {/* Logo */}
        <div className="mt-13 border-b border-[#065784]"></div>

        {/* Navigation Items */}
        <div className="flex flex-col mt-10">
          <div
            className={`p-3 text-xl font-bold ${
              selectedTab === "Personal Info"
                ? "bg-[#daf1ff] text-[#065784]"
                : ""
            }`}
            onClick={() => setSelectedTab("Personal Info")}
          >
            {t("profile.Personal Information")}
          </div>
          <div
            className={`p-3 text-xl font-bold ${
              selectedTab === "Tour Bookings"
                ? "bg-[#daf1ff] text-[#065784]"
                : ""
            }`}
            onClick={() => setSelectedTab("Tour Bookings")}
          >
            {t("profile.Tour Bookings")}
          </div>
          <div
            className={`p-3 text-xl  font-bold ${
              selectedTab === "Car Booking" ? "bg-[#daf1ff] text-[#065784]" : ""
            }`}
            onClick={() => setSelectedTab("Car Booking")}
          >
            {t("profile.Car Booking")}
          </div>
          <div
            className={`p-3 text-xl  font-bold ${
              selectedTab === "Parking Booking"
                ? "bg-[#daf1ff] text-[#065784]"
                : ""
            }`}
            onClick={() => setSelectedTab("Parking Booking")}
          >
            {t("profile.Parking Booking")}
          </div>
        </div>
      </div>

      <div className="  lg:w-[20%] md:w-[20%]  text-white lg:hidden flex flex-col lg:flex-col md:flex-col">
        
        <div className="fixed bottom-0 left-0 right-0 bg-[#065784] p-3 border-t shadow-md flex justify-around items-center md:hidden z-50">
          <div
            className={`flex flex-col items-center p-2 ${
              selectedTab === "Personal Info"
                ? "text-[#ffff]"
                :"text-[#000000]"
            }`}
            onClick={() => setSelectedTab("Personal Info")}
          >
            <FaUser size={24} />
            {/* <span className="text-xs">{t("profile.Personal Information")}</span> */}
          </div>
          <div
            className={`flex flex-col items-center p-2 ${
              selectedTab === "Tour Bookings"
                ? "text-[#ffff]"
                :  "text-[#000000]"
            }`}
            onClick={() => setSelectedTab("Tour Bookings")}
          >
            <BiWorld size={24} />
            {/* <span className="text-xs">{t("profile.Tour Bookings")}</span> */}
          </div>
          <div
            className={`flex flex-col items-center p-2 ${
              selectedTab === "Car Booking" ? "text-[#ffff]" : "text-[#000000]"
            }`}
            onClick={() => setSelectedTab("Car Booking")}
          >
            <FaCar  size={24} />
            {/* <span className="text-xs">{t("profile.Car Booking")}</span> */}
          </div>
          <div
            className={`flex flex-col items-center p-2 ${
              selectedTab === "Parking Booking"
                ? "text-[#ffff]"
                :  "text-[#000000]"
            }`}
            onClick={() => setSelectedTab("Parking Booking")}
          >
            <MdOutlineLocalParking  size={24} />
            {/* <span className="text-xs">{t("profile.Parking Booking")}</span> */}
          </div>
        </div>
      {/* </div> */}

      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Toast ref={toast} />
        <div className="lg:p-8 md:p-8 mt-6">
       
          {selectedTab === "Personal Info" && (
            <div className="bg-white p-10  rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold uppercase">
                    {t("profile.Personal Information")}
                  </h2>
                  {isEditable && (
                    <span className="text-sm  font-semibold"></span>
                  )}
                </div>
                <button
                  onClick={() => setIsEditable(!isEditable)}
                  className="text-gray-600 hover:text-black"
                  title={t("profile.Edit Profile")}
                >
                  <RiPencilFill className="w-20 h-7 text-[#065784] cursor-pointer" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-5 px-3 mb-5">
                {/* Personal Info Inputs */}
                {[
                  {
                    label: t("profile.First Name"),
                    name: "refFName",
                    value: input.refFName,
                  },
                  {
                    label: t("profile.Last Name"),
                    name: "refLName",
                    value: input.refLName,
                  },
                  {
                    label: t("profile.Email ID"),
                    name: "refUserEmail",
                    value: input.refUserEmail,
                  },
                  {
                    label: t("profile.Password"),
                    name: "refUserPassword",
                    value: input.refUserPassword,
                  },
                  {
                    label: t("profile.Mobile No"),
                    name: "refMoblile",
                    value: input.refMoblile,
                  },
                  {
                    label: t("profile.Date of Birth"),
                    name: "refDOB",
                    value: input.refDOB,
                  },
                ].map((field, index) => (
                  <div key={index}>
                    <label className="block text-xl text-[#065784] mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      value={field.value}
                      onChange={handleInput}
                      disabled={!isEditable}
                      className={`border rounded-md p-3 w-[130%] lg:w-full ${
                        !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                    />
                  </div>
                ))}

           
              </div>
                   {/* Address Form */}
                   <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    Addaddress();
                  }}
                  method="post"
                  className="col-span-2"
                >
                  <div className="grid grid-cols-2 gap-5 px-3">
                    {[
                      {
                        label: t("profile.Address"),
                        name: "refUserAddress",
                        value: address.refUserAddress,
                      },
                      {
                        label: t("profile.City"),
                        name: "refUserCity",
                        value: address.refUserCity,
                      },
                      {
                        label: t("profile.State"),
                        name: "refUserState",
                        value: address.refUserState,
                      },
                      {
                        label: t("profile.Country"),
                        name: "refUserCountry",
                        value: address.refUserCountry,
                      },
                      {
                        label: t("profile.Zip code"),
                        name: "refUserZipCode",
                        value: address.refUserZipCode,
                      },
                    ].map((field, idx) => (
                      <div key={idx}>
                        <label className="block text-xl text-[#065784] mb-1">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          name={field.name}
                          value={field.value}
                          onChange={handleInput}
                          disabled={!isEditable}
                          className={`border rounded-md p-3 lg:w-full w-[130%] ${
                            !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                          }`}
                        />
                      </div>
                    ))}

                    <div className="col-span-2 flex justify-end">
                      <button
                        disabled={!isEditable}
                        className={`${
                          !isEditable
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-[#565656]"
                        } bg-[#000000] text-white px-8 py-3 mt-4 rounded-md`}
                        type="submit"
                      >
                        {t("profile.Add Address")}
                      </button>
                    </div>
                  </div>
                </form>

              {isEditable && (
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    className="bg-gray-500 text-white px-8 py-3 rounded-md hover:bg-gray-600"
                    onClick={() => setIsEditable(false)}
                  >
                    {t("profile.Cancel")}
                  </button>
                  <button
                    className="bg-[#065784] text-white px-8 py-3 rounded-md hover:bg-[#265bb3]"
                    onClick={() => {
                      ProfileUpdate();
                      handleSave();
                      showSuccess();
                      setIsEditable(false);
                    }}
                  >
                    {t("profile.Save Changes")}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Booking History */}

          {selectedTab === "Tour Bookings" && (
            <div className="bg-white p-4 flex  flex-col lg:flex-col md:flex-col gap-10 mt-3 rounded-lg shadow-sm">
              {history?.length > 0 ? (
                history.map((item, index) => (
                  <div
                    key={index}
                    className="flex  items-start gap-4  p-4 rounded-xl shadow-md"
                    style={{
                      backgroundImage: `url(${box})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg"
                      alt="Trip"
                      className="w-40 h-32 object-cover rounded-lg"
                    />
                    <div className="flex flex-col  lg:flex-col md:flex-col gap-2 justify-between w-full">
                      <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">
                        {item.refPackageName}
                      </h2>
                      <div className="flex flex-col lg:flex-row md:flex-row">
                        <div className="flex flex-col w-[100%] gap-2  text-sm font-bold text-[#1a1a1a]">
                          <div>
                            <p className="font-medium">{t("profile.Code")}:</p>
                            <p className="text-[#327ada]">{item.refTourCode}</p>
                          </div>
                          <div>
                            <p className="font-medium">{t("profile.Days")}:</p>
                            <p className="text-[#327ada]">
                              {item.refDurationIday} {t("profile.Days")} &{" "}
                              {item.refDurationINight} {t("profile.Nights")}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col w-[100%] gap-2  text-sm font-bold text-[#1a1a1a]">
                          <div>
                            <p className="font-medium">{t("profile.Price")}:</p>
                            <p className="text-[#327ada]">
                              CHF {item.refTourPrice}
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">{t("profile.Pickup")}:</p>
                            <p className="text-[#327ada]">
                              {new Date(item.refPickupDate).toLocaleString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col w-[100%] gap-2  text-sm font-bold text-[#1a1a1a]">
                          <div>
                            <p className="font-medium">{t("profile.AdultCount")}:</p>
                            <p className="text-[#327ada]">
                              {item.refAdultCount}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">{t("profile.ChildrenCount")}:</p>
                            <p className="text-[#327ada]">
                              {item.refChildrenCount}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center">{t("profile.No bookings found")}</p>
              )}
            </div>
          )}

          {/* Car Parking */}
          {/* Car Parking */}

          {selectedTab === "Car Booking" && (
            <div className="bg-white p-4 flex  flex-col lg:flex-col md:flex-col gap-10 mt-3 rounded-lg shadow-sm">
              {carHistory?.length > 0 ? (
                carHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex  items-start gap-4 p-4 rounded-xl shadow-md"
                    style={{
                      backgroundImage: `url(${box})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    <img
                      src="https://i.pinimg.com/736x/d9/5c/d0/d95cd04d85043401df2b957eeba934cd.jpg"
                      alt="Car"
                      className="w-40 h-32 object-cover rounded-lg"
                    />

                    {/* <img
                      src={`data:${car.refCarPath.contentType};base64,${car.refCarPath.content}`}
                      src={`https://explorevacations.max-idigital.ch/src/assets/cars/${car.refCarPath}`}
                      alt={car.refVehicleTypeName}
                      className="w-full object-cover aspect-[4/3]"
                    /> */}
                    <div className="flex flex-col  lg:flex-col md:flex-col gap-2 justify-between w-full">
                      <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">
                        {item.refVehicleTypeName}
                      </h2>
                      <div className="flex flex-col lg:flex-row md:flex-row">
                        <div className="flex flex-col w-[100%] gap-2  text-sm font-bold text-[#1a1a1a]">
                          <div>
                            <p className="font-medium">{t("profile.CarType")} :</p>
                            <p className="text-[#327ada]">
                              {item.refCarTypeName}
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">{t("profile.Bag Count")} :</p>
                            <p className="text-[#327ada]">{item.refBagCount}</p>
                          </div>
                        </div>
                        <div className="flex flex-col w-[100%] gap-2  text-sm font-bold text-[#1a1a1a]">
                          <div>
                            <p className="font-medium">{t("profile.Price")} :</p>
                            <p className="text-[#327ada]">
                              CHF {item.refCarPrice}
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">{t("profile.Pickup")} :</p>
                            <p className="text-[#327ada]">
                              {new Date(item.refPickupDate).toLocaleString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col w-[100%] gap-2  text-sm font-bold text-[#1a1a1a]">
                          <div>
                            <p className="font-medium">{t("profile.AdultCount")} :</p>
                            <p className="text-[#327ada]">
                              {item.refAdultCount}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">{t("profile.Person Count")} :</p>
                            <p className="text-[#327ada]">
                              {item.refPersonCount}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center">{t("profile.No bookings found")}.</p>
              )}
            </div>
          )}

          {/* Parking Booking */}

          {selectedTab === "Parking Booking" && (
            <div className="bg-white p-4 flex  flex-col lg:flex-col md:flex-col gap-10 mt-3 rounded-lg shadow-sm">
              {parkingHistory?.length > 0 ? (
                parkingHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex  items-start gap-4  p-4 rounded-xl shadow-md"
                    style={{
                      backgroundImage: `url(${box})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    <img
                      src="https://i.pinimg.com/736x/96/53/d6/9653d647a34afd3d3b130a37396ea3bf.jpg"
                      alt="Car"
                      className="w-40 h-32 object-cover rounded-lg"
                    />

                    {/* <img
                      src={`data:${car.refCarPath.contentType};base64,${car.refCarPath.content}`}
                      src={`https://explorevacations.max-idigital.ch/src/assets/cars/${car.refCarPath}`}
                      alt={car.refVehicleTypeName}
                      className="w-full object-cover aspect-[4/3]"
                    /> */}
                    <div className="flex flex-col  lg:flex-col md:flex-col gap-2 justify-between w-full">
                      <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">
                        {item.refParkingName}
                      </h2>
                      <div className="flex flex-col lg:flex-row md:flex-row">
                        <div className="flex flex-col w-[100%] gap-2  text-sm font-bold text-[#1a1a1a]">
                          <div>
                            <p className="font-medium">{t("profile.ParkingTypeName")} :</p>
                            <p className="text-[#327ada]">
                              {item.refParkingTypeName}
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">{t("profile.Vehicle Model")} :</p>
                            <p className="text-[#327ada]">
                              {item.VehicleModel}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col w-[100%] gap-2  text-sm font-bold text-[#1a1a1a]">
                          <div>
                            <p className="font-medium">{t("profile.Price")} :</p>
                            <p className="text-[#327ada]">
                              CHF {item.refPrice}
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">{t("profile.travel StartDate")} :</p>
                            <p className="text-[#327ada]">
                              {new Date(item.travelStartDate).toLocaleString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col w-[100%] gap-2  text-sm font-bold text-[#1a1a1a]">
                          <div>
                            <p className="font-medium">{t("profile.Location")} :</p>
                            <p className="text-[#327ada]">{item.refLocation}</p>
                          </div>
                          <div>
                            <p className="font-medium">{t("profile.travel EndDate")} :</p>
                            <p className="text-[#327ada]">
                              {new Date(item.travelEndDate).toLocaleString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center">{t("profile.No bookings found")}.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
