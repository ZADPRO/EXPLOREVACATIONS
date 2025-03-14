import {
  BadgeSwissFranc,
  Binoculars,
  History,
  LayoutPanelLeft,
  UsersRound,
} from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";

import { TabView, TabPanel } from "primereact/tabview";

export default function ToursTemplate() {
  const location = useLocation();
  const tour = location.state?.tour;

  if (!tour) {
    return <h2 className="text-center text-red-500">No Tour Data Found!</h2>;
  }
  return (
    <div>
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
          </div>
        </div>
      </div>

      <div className="card flex w-10/12 mx-auto overflow-hidden">
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
    </div>
  );
}
