import {
  BadgeSwissFranc,
  Binoculars,
  History,
  LayoutPanelLeft,
  UsersRound,
} from "lucide-react";
import React, { useRef, useState } from "react";
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

export default function ToursTemplate() {
  const location = useLocation();
  const tour = location.state?.tour;

  const [ismodelOpen, setIsModelOpen] = useState(false);

  const toast = useRef(null);

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

  const [otherRequirements, setOtherRequirements] = useState("");

  const handleSubmit = async () => {
    if (
      !name ||
      !email ||
      !mobileNumber ||
      !pickupAddress ||
      !submissionAddress ||
      !pickupDateTime ||
      !selectedVehicleType
    ) {
      toast.current.show({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill in all required fields.",
        life: 3000,
      });
      return;
    }
    const payload = {
      refPackageId: 1,
      refUserName: name,
      refUserMail: email,
      refUserMobile: mobileNumber,
      refPickupDate: pickupDateTime.toISOString().split("T")[0],
      refAdultCount: adults || 0,
      refChildrenCount: children || 0,
      refInfants: infants || 0,
      refOtherRequirements: otherRequirements || "",
    };

    try {
      const response = await axios.post("YOUR_API_ENDPOINT", payload);

      if (response.status === 200 || response.status === 201) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Your details have been submitted!",
          life: 3000,
        });
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

  if (!tour) {
    return <h2 className="text-center text-red-500">No Tour Data Found!</h2>;
  }

  return (
    <div>
      <Toast ref={toast} />

      <div className="tourBannerBg01 relative h-[60vh] flex items-center justify-center text-white text-3xl font-bold">
        {/* Centered Text Here */}
      </div>

      <div className="flex w-10/12 mx-auto">
        <div className="flex lg:flex-row flex-column gap-6 p-4">
          <div className="lg:w-2/4 flex-shrink-0">
            <img
              src={tour.image}
              alt="Tour Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="lg:w-2/4 flex flex-col justify-center gap-4">
            <p className="flex gap-2 items-center font-bold uppercase text-[22px]">
              {tour.name}
            </p>
            <p className="flex gap-2 items-center">
              <History
                className="bg-[#20c0bd] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Duration:</span> {tour.duration}
            </p>
            <p className="flex gap-2 items-center">
              <BadgeSwissFranc
                className="bg-[#20c0bd] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Price:</span> {tour.price}
            </p>
            <p className="flex gap-2 items-center">
              <Binoculars
                className="bg-[#20c0bd] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Tour Code:</span> {tour.tour_code}
            </p>
            <p className="flex gap-2 items-center">
              <UsersRound
                className="bg-[#20c0bd] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Group Size:</span>{" "}
              {tour.group_size}
            </p>
            <p className="flex gap-2 items-center">
              <LayoutPanelLeft
                className="bg-[#20c0bd] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Categories:</span>{" "}
              {tour.categories}
            </p>
            <p className="flex gap-2 items-center">
              <button
                className="border-1 px-4 py-2 rounded bg-[#20c0bd] text-white cursor-pointer"
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
          <TabPanel header="Travel Overview" key="tab1">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              {tour?.travel_overview?.map((paragraph, index) => (
                <p key={index} className="mb-2">
                  {paragraph}
                </p>
              )) || <p>Loading...</p>}
            </div>
          </TabPanel>

          <TabPanel header="Itinerary" key="tab2">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              <ul className="list-disc list-inside">
                {tour.itinerary.map((item) => (
                  <li key={item.day} className="mt-2">
                    <strong>Day {item.day}:</strong> {item.title}
                    <p className="text-sm text-gray-600">Meals: {item.meals}</p>
                    <ul className="list-disc list-inside ml-4 text-sm">
                      {item.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>{" "}
          </TabPanel>

          <TabPanel header="Itinerary Map" key="tab3">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              <img src={tour.map} alt="" />
            </div>
          </TabPanel>

          <TabPanel header="Travel Includes" key="tab4">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              <ul className="list-disc pl-5">
                {tour?.inclusions?.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                )) || <p>Loading...</p>}
              </ul>
            </div>
          </TabPanel>

          <TabPanel header="Travel Ends" key="tab6">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              <ul className="list-disc pl-5">
                {tour?.exclusions?.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                )) || <p>Loading...</p>}
              </ul>
            </div>
          </TabPanel>

          {/* <TabPanel header="Gallery" key="tab7">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full"></div>
          </TabPanel> */}

          <TabPanel header="Special Notes" key="tab8">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              {tour?.special_notes ? (
                <ul className="list-none pl-0">
                  <li className="mb-2">
                    <strong>Validity:</strong> {tour.special_notes.validity}
                  </li>
                  <li className="mb-2">
                    <strong>Visa Info:</strong> {tour.special_notes.visa_info}
                  </li>
                  <li className="mb-2">
                    <strong>Room Category:</strong>{" "}
                    {tour.special_notes.room_category}
                  </li>
                </ul>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </TabPanel>
        </TabView>
      </div>
      <Dialog
        header={tour.name}
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
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="username">Your Name</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="email"
                className="w-[100%]"
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
                value={pickupDateTime}
                className="flex-1 w-[100%]"
                onChange={(e) => setPickupDateTime(e.value)}
                showTime
                placeholder="Pickup Date & Time"
                hourFormat="12"
              />
              <label htmlFor="calendar-12h">Pick Up Date & Time</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <Dropdown
                id="vehicle"
                value={selectedVehicleType}
                onChange={(e) => setSelectedVehicleType(e.value)}
                // options={typescar}
                optionLabel="name"
                placeholder="Choose Vehicle Type"
                className="flex-1 w-[100%]"
              />
              <label htmlFor="vehicle">Your Preferred Vehicle</label>
            </FloatLabel>
          </div>
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
                value={infants}
                onValueChange={(e) => setInfants(e.value)}
              />
              <label htmlFor="infants">Infants</label>
            </FloatLabel>
          </div>
        </div>

        <div className="pt-[2.5rem] flex flex-col lg:flex-row gap-[1rem]">
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputTextarea
                className="w-[100%]"
                value={otherRequirements}
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
