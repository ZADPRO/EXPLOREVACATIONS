import {
  BadgeSwissFranc,
  Binoculars,
  History,
  LayoutPanelLeft,
  UsersRound,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";

import { useLocation } from "react-router-dom";

import { TabView, TabPanel } from "primereact/tabview";
import axios from "axios";

import decrypt from "../../helper";

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
  const [otherRequirements, setOtherRequirements] = useState("");
  const [ismodelOpen, setIsModelOpen] = useState(false);
  const [carListData, setCarLIstData] = useState({});
  const [refCarsId, setRefCarsId] = useState("");
 



  const toast = useRef(null);

  useEffect(() => {
    console.log("asdf===========asfd");
 
   
    const car = location.state?.car;
    setCarState(car);
    setRefCarsId(car.refCarsId);
    

    const fetchData = async () => {
      try {
        console.log("Verify Token Running --- ");

        const listDestinations = await axios.post(
          import.meta.env.VITE_API_URL + "/userRoutes/getCarById",
          {
            refCarsId: car.refCarsId,
          },
          {
            headers: {
              Authorization: localStorage.getItem("JWTtoken"),
              "Content-Type": "application/json",
            },
          }
        );
        const destinationData = decrypt(
          listDestinations.data[1],
          listDestinations.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("destinationData ========== line 118 >", destinationData);
        setCarLIstData(destinationData.tourDetails[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
        },
        {
          headers: {
            Authorization: localStorage.getItem("JWTtoken"),
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
        // localStorage.setItem("token", "Bearer " + data.token);
        setIsModelOpen(false);
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

  return (
    <div>
      <Toast ref={toast} />

      <div className="carsPageCont01 relative h-[40vh] flex items-center justify-center text-white text-3xl font-bold">
        {/* Centered Text Here */}
      </div>

      <div className="flex w-10/12 mx-auto">
        <div className="flex lg:flex-row flex-column gap-6 p-4">
          <div className="lg:w-2/4 flex-shrink-0">
            {carListData?.refCarPath && (
              <img
                // src={`data:${carListData?.refCarPath.contentType};base64,${carListData?.refCarPath.content}`}
                src={`https://explorevacations.max-idigital.ch/src/assets/cars/${carListData?.refCarPath}`}
                alt="Car Image"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>

          <div className="lg:w-2/4 flex flex-col justify-center gap-4">
            <p className="flex gap-2 items-center font-bold uppercase text-[22px]">
              {carListData.refVehicleTypeName}
            </p>
            <p className="flex gap-2 items-center">
              <History
                className="bg-[#009ad7] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Bags:</span>{" "}
              {carListData.refBagCount} (Count){" "}
            </p>
            <p className="flex gap-2 items-center">
              <BadgeSwissFranc
                className="bg-[#009ad7] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Fuel Type:</span>{" "}
              {carListData.refFuelType}
            </p>
            <p className="flex gap-2 items-center">
              <Binoculars
                className="bg-[#009ad7] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Fuel Limit:</span>{" "}
              {carListData.refFuleLimit}
            </p>
            <p className="flex gap-2 items-center">
              <UsersRound
                className="bg-[#009ad7] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Max Count:</span>{" "}
              <p>
                {carListData.refPersonCount === "0"
                  ? "Not Specified"
                  : carListData.refPersonCount}
              </p>
            </p>
            <p className="flex gap-2 items-center">
              <LayoutPanelLeft
                className="bg-[#009ad7] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Transmission Type:</span>{" "}
              {carListData.refTrasmissionType}
            </p>

            <p className="flex gap-2 items-center">
              <LayoutPanelLeft
                className="bg-[#009ad7] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Manufacturing Year:</span>{" "}
              {carListData.refcarManufactureYear}
            </p>

            <p className="flex gap-2 items-center">
              <button
                className="border-1 px-4 py-2 rounded bg-[#009ad7] text-white cursor-pointer"
                onClick={() => {
                  setIsModelOpen(true);
                }}
              >
                <span className="font-semibold">Book Now</span>{" "}
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className="card flex w-10/12 mx-auto overflow-hidden py-8">
        <TabView className="w-full overflow-x-auto">
          {/* <TabPanel header="Driver Details" key="tab1">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              <p>
                <b>Driver Name:</b> {carListData.refDriverName}
              </p>
              <p>
                <b>Mobile:</b> {carListData.refDriverMobile}
              </p>
              <p>
                <b>Mail ID:</b> {carListData.refDriverMail}
              </p>
              <p>
                <b>Location:</b> {carListData.refDriverLocation}
              </p>
              <p>
                <b>Age:</b> {carListData.refDriverAge}
              </p>
            </div>
          </TabPanel> */}
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

        <h6 className="pt-[1.5rem]">Extras (chargeable)</h6>

        {/* <div className="flex flex-wrap justify-start pt-[1rem] gap-3">
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

        <div className="pt-[1rem] flex justify-center">
          <Button
            severity="success"
            className="w-[20%]"
            label="Submit"
            onClick={handleSubmit}
          />
        </div>
      </Dialog>
    </div>
  );
}
