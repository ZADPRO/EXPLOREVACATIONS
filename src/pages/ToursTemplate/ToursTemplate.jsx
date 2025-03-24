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
import Axios from "axios";

import decrypt from "../../helper";

export default function ToursTemplate() {
  const location = useLocation();
  const tour = location.state?.tour;

  const [ismodelOpen, setIsModelOpen] = useState(false);

  const toast = useRef(null);

  const [packageId, setPackageId] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pickupDateTime, setPickupDateTime] = useState(null);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [otherRequirements, setOtherRequirements] = useState("");

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

    console.log("data.tourDetails[0].refPackageId", packageId);
    try {
      const response = await Axios.post(
        import.meta.env.VITE_API_URL + "/userRoutes/tourBooking",
        {
          refPackageId: packageId,
          refUserName: name,
          refUserMail: email,
          refUserMobile: mobileNumber,
          refPickupDate: pickupDateTime,
          refAdultCount: adults,
          refChildrenCount: children,
          refInfants: infants,
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
      console.log("data list tour data ======= ?", data);
      if (data.success) {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Verify Token Running --- ");

        const listDestinations = await Axios.post(
          import.meta.env.VITE_API_URL + "/userRoutes/listTour",
          {
            refPackageId: tour.refPackageId,
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
        console.log(
          "data list tour data ======= line 121",
          destinationData.tourDetails[0].refPackageId
        );
        setPackageId(destinationData.tourDetails[0].refPackageId);

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
              src={`data:${tour.refCoverImage.contentType};base64,${tour.refCoverImage.content}`}
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
              <span className="font-semibold">Duration:</span>{" "}
              {tour.refDurationIday} Days & {tour.refDurationINight} Nights
            </p>
            <p className="flex gap-2 items-center">
              <BadgeSwissFranc
                className="bg-[#20c0bd] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Price:</span> CHF{" "}
              {tour.refTourPrice}
            </p>
            <p className="flex gap-2 items-center">
              <Binoculars
                className="bg-[#20c0bd] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Tour Code:</span>{" "}
              {tour.refTourCode}
            </p>
            <p className="flex gap-2 items-center">
              <UsersRound
                className="bg-[#20c0bd] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Group Size:</span>{" "}
              <p>
                {tour.refGroupSize === "0"
                  ? "Not Specified"
                  : tour.refGroupSize}
              </p>
            </p>
            <p className="flex gap-2 items-center">
              <LayoutPanelLeft
                className="bg-[#20c0bd] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Categories:</span>{" "}
              {tour.refCategoryName}
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
              <div
                dangerouslySetInnerHTML={{ __html: tour?.refTravalOverView }}
              />
            </div>
          </TabPanel>

          <TabPanel header="Itinerary" key="tab2">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              <div dangerouslySetInnerHTML={{ __html: tour?.refItinary }} />
            </div>
          </TabPanel>

          <TabPanel header="Itinerary Map" key="tab3">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              <img
                src={`data:${tour.refItinaryMapPath.contentType};base64,${tour.refCoverImage.content}`}
                alt=""
              />
            </div>
          </TabPanel>

          <TabPanel header="Travel Includes" key="tab4">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              <ul className="list-disc pl-5">
                {tour?.travalInclude?.map((item, index) => (
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
                {tour?.travalExclude?.map((item, index) => (
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
              {tour?.refSpecialNotes ? (
                <ul className="list-none pl-0">
                  <li className="mb-2">{tour.refSpecialNotes}</li>
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
