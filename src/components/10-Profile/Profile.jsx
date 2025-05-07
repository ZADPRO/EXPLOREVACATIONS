import { RiPencilFill } from "react-icons/ri";
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { color } from "framer-motion";
import decrypt from "../../helper";
import { classNames } from "primereact/utils";
import box from "../../assets/TouBooking/Box.png";

export default function Profile() {
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
  const [profile, setProfile] = useState("");

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
      <div className="w-[30%]  lg:w-[20%] md:w-[20%] bg-[#065784] text-white flex flex-col lg:flex-col md:flex-col">
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
            Personal Info
          </div>
          <div
            className={`p-3 text-xl font-bold ${
              selectedTab === "Tour Bookings"
                ? "bg-[#daf1ff] text-[#065784]"
                : ""
            }`}
            onClick={() => setSelectedTab("Tour Bookings")}
          >
            Tour Bookings
          </div>
          <div
            className={`p-3 text-xl  font-bold ${
              selectedTab === "Car Booking" ? "bg-[#daf1ff] text-[#065784]" : ""
            }`}
            onClick={() => setSelectedTab("Car Booking")}
          >
            Car Booking
          </div>
          <div
            className={`p-3 text-xl  font-bold ${
              selectedTab === "Parking Booking"
                ? "bg-[#daf1ff] text-[#065784]"
                : ""
            }`}
            onClick={() => setSelectedTab("Parking Booking")}
          >
            Parking Booking
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Toast ref={toast} />
        <div className="lg:p-8 md:p-8 mt-6">
          {/* Profile Content */}
          {selectedTab === "Personal Info" && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2
                  className="text-xl font-semibold "
                  style={{ textTransform: "uppercase" }}
                >
                  Personal Information
                </h2>
                <button
                  onClick={() => setIsEditable(!isEditable)}
                  className="text-gray-600 hover:text-black"
                  title="Edit Profile"
                >
                  <RiPencilFill className="w-20 h-7 text-[#065784]  cursor-pointer" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block  text-xl text-[#065784] mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="refFName"
                    value={input.refFName}
                    onChange={handleInput}
                    disabled={!isEditable}
                    className="border rounded-md p-3 w-full"
                  />
                </div>
                <div>
                  <label className="block  text-xl text-[#065784] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="refLName"
                    value={input.refLName}
                    onChange={handleInput}
                    disabled={!isEditable}
                    className="border rounded-md p-3 w-full"
                  />
                </div>
                <div>
                  <label className="block  text-xl text-[#065784] mb-1">
                    Email ID
                  </label>
                  <input
                    type="text"
                    name="refUserEmail"
                    value={input.refUserEmail}
                    onChange={handleInput}
                    disabled={!isEditable}
                    className="border rounded-md p-3 w-full"
                  />
                </div>
                <div>
                  <label className="block  text-xl text-[#065784] mb-1">
                    Password
                  </label>
                  <input
                    type="text"
                    name="refUserPassword"
                    value={input.refUserPassword}
                    onChange={handleInput}
                    disabled={!isEditable}
                    className="border rounded-md p-3 w-full"
                  />
                </div>
                <div>
                  <label className="block  text-xl text-[#065784] mb-1">
                    Mobile No:
                  </label>
                  <input
                    type="text"
                    name="refMoblile"
                    value={input.refMoblile}
                    onChange={handleInput}
                    disabled={!isEditable}
                    className="border rounded-md p-3 w-full"
                  />
                </div>
                <div>
                  <label className="block  text-xl text-[#065784] mb-1">
                    Date of Birth:
                  </label>
                  <input
                    type="text"
                    name="refDOB"
                    value={input.refDOB}
                    onChange={handleInput}
                    disabled={!isEditable}
                    className="border rounded-md p-3 w-full"
                  />
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    Addaddress();
                  }}
                  method="post"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {" "}
                    <div>
                      <label className="block  text-xl text-[#065784] mb-1">
                        Address:
                      </label>
                      <input
                        type="text"
                        name="refUserAddress"
                        value={address.refUserAddress}
                        onChange={handleInput}
                        disabled={!isEditable}
                        className="border rounded-md p-3 w-full"
                      />
                    </div>
                    <div>
                      <label className="block  text-xl text-[#065784] mb-1">
                        City:
                      </label>
                      <input
                        type="text"
                        name="refUserCity"
                        value={address.refUserCity}
                        onChange={handleInput}
                        disabled={!isEditable}
                        className="border rounded-md p-3 w-full"
                      />
                    </div>
                    <div>
                      <label className="block  text-xl text-[#065784] mb-1">
                        State:
                      </label>
                      <input
                        type="text"
                        name="refUserState"
                        value={address.refUserState}
                        onChange={handleInput}
                        disabled={!isEditable}
                        className="border rounded-md p-3 w-full"
                      />
                    </div>
                    <div>
                      <label className="block  text-xl text-[#065784] mb-1">
                        Country:
                      </label>
                      <input
                        type="text"
                        name="refUserCountry"
                        value={address.refUserCountry}
                        onChange={handleInput}
                        disabled={!isEditable}
                        className="border rounded-md p-3 w-full"
                      />
                    </div>
                    <div>
                      <label className="block  text-xl text-[#065784] mb-2">
                        Zip code:
                      </label>
                      <input
                        type="text"
                        name="refUserZipCode"
                        value={address.refUserZipCode}
                        onChange={handleInput}
                        disabled={!isEditable}
                        className="border rounded-md p-3 w-full"
                      />
                    </div>
                    <button
                      label="Success"
                      severity="success"
                      className="bg-[#000000] text-white px-8 py-3 h-15 mt-5 rounded-md hover:bg-[#565656]"
                      type="submit"
                    >
                      Add Address
                    </button>
                  </div>
                </form>
              </div>

              {isEditable && (
                <div className="mt-6 flex justify-end">
                  <button
                    label="Success"
                    severity="success"
                    className="bg-[#065784] text-white px-8 py-3 rounded-md hover:bg-[#265bb3]"
                    onClick={() => {
                      ProfileUpdate();
                      handleSave();
                      showSuccess();
                    }}
                  >
                    Save Changes
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
                            <p className="font-medium">Code:</p>
                            <p className="text-[#327ada]">{item.refTourCode}</p>
                          </div>
                          <div>
                            <p className="font-medium">Days:</p>
                            <p className="text-[#327ada]">
                              {item.refDurationIday} Days &{" "}
                              {item.refDurationINight} Nights
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col w-[100%] gap-2  text-sm font-bold text-[#1a1a1a]">
                          <div>
                            <p className="font-medium">Price:</p>
                            <p className="text-[#327ada]">
                              CHF {item.refTourPrice}
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">Pickup:</p>
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
                            <p className="font-medium">AdultCount:</p>
                            <p className="text-[#327ada]">
                              {item.refAdultCount}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">ChildrenCount:</p>
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
                <p className="text-gray-600 text-center">No bookings found.</p>
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
                            <p className="font-medium">CarType :</p>
                            <p className="text-[#327ada]">
                              {item.refCarTypeName}
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">Bag Count :</p>
                            <p className="text-[#327ada]">{item.refBagCount}</p>
                          </div>
                        </div>
                        <div className="flex flex-col w-[100%] gap-2  text-sm font-bold text-[#1a1a1a]">
                          <div>
                            <p className="font-medium">Price :</p>
                            <p className="text-[#327ada]">
                              CHF {item.refCarPrice}
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">Pickup :</p>
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
                            <p className="font-medium">AdultCount :</p>
                            <p className="text-[#327ada]">
                              {item.refAdultCount}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Person Count :</p>
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
                <p className="text-gray-600 text-center">No bookings found.</p>
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
                            <p className="font-medium">ParkingTypeName :</p>
                            <p className="text-[#327ada]">
                              {item.refParkingTypeName}
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">Vehicle Model</p>
                            <p className="text-[#327ada]">
                              {item.VehicleModel}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col w-[100%] gap-2  text-sm font-bold text-[#1a1a1a]">
                          <div>
                            <p className="font-medium">Price :</p>
                            <p className="text-[#327ada]">
                              CHF {item.refPrice}
                            </p>
                          </div>

                          <div>
                            <p className="font-medium">travel StartDate :</p>
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
                            <p className="font-medium">Location :</p>
                            <p className="text-[#327ada]">{item.refLocation}</p>
                          </div>
                          <div>
                            <p className="font-medium">travel EndDate :</p>
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
                <p className="text-gray-600 text-center">No bookings found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
