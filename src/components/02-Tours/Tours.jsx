import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import image from "../../assets/home/home4.jpg";

export default function Tours() {
  const location = useLocation();
  const toast = useRef(null);

  // Extract state from location (if any)
  const initialTourDestination = location.state?.tourDestination || null;
  const initialTourFromDate = location.state?.tourFromDate || null;
  const initialTourToDate = location.state?.tourToDate || null;
  const initialTourGuest = location.state?.tourGuest || 0;

  // Use state variables
  const [tourDestination, setTourDestination] = useState(
    initialTourDestination
  );
  const [tourFromDate, setTourFromDate] = useState(initialTourFromDate);
  const [tourToDate, setTourToDate] = useState(initialTourToDate);
  const [tourGuest, setTourGuest] = useState(initialTourGuest);

  const handleExplore = () => {
    if (!tourDestination) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Destination is required",
      });
      return;
    }
    if (!tourFromDate) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "From date is required",
      });
      return;
    }
    if (!tourToDate) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "To date is required",
      });
      return;
    }
    if (!tourGuest) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Number of guests is required",
      });
      return;
    }

    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Search submitted!",
    });
  };

  const tourData = [
    {
      id: 1,
      name: "Buddhist Cultural Trip To Sri Lanka",
      duration: "8 days / 7 nights",
      location: "Sri Lanka",
      price: "$320 / Person",
      image: image,
    },
    {
      id: 2,
      name: "Swiss Alps Adventure",
      duration: "5 days / 4 nights",
      location: "Switzerland",
      price: "$500 / Person",
      image: image,
    },
    {
      id: 3,
      name: "Misty Mountains of Ella",
      duration: "6 days / 5 nights",
      location: "Sri Lanka",
      price: "$280 / Person",
      image: image,
    },
    {
      id: 4,
      name: "Zurich City Exploration",
      duration: "4 days / 3 nights",
      location: "Switzerland",
      price: "$450 / Person",
      image: image,
    },
    {
      id: 5,
      name: "Sigiriya Rock Fortress Tour",
      duration: "3 days / 2 nights",
      location: "Sri Lanka",
      price: "$200 / Person",
      image: image,
    },
    {
      id: 6,
      name: "Lake Geneva Retreat",
      duration: "7 days / 6 nights",
      location: "Switzerland",
      price: "$600 / Person",
      image: image,
    },
    {
      id: 7,
      name: "Colombo City & Beach Escape",
      duration: "5 days / 4 nights",
      location: "Sri Lanka",
      price: "$300 / Person",
      image: image,
    },
    {
      id: 8,
      name: "Jungfraujoch: Top of Europe",
      duration: "2 days / 1 night",
      location: "Switzerland",
      price: "$700 / Person",
      image: image,
    },
    {
      id: 9,
      name: "Kandy Cultural Experience",
      duration: "3 days / 2 nights",
      location: "Sri Lanka",
      price: "$250 / Person",
      image: image,
    },
    {
      id: 10,
      name: "Matterhorn & Zermatt Excursion",
      duration: "4 days / 3 nights",
      location: "Switzerland",
      price: "$550 / Person",
      image: image,
    },
  ];

  return (
    <div>
      <div className="homePageContainer01">
        <div className="h-[80vh]"></div>
      </div>

      <div
        id="tab-panel-1ai"
        role="tabpanel"
        className="card w-10/12 mx-auto bg-white p-4 shadow-md rounded-lg mt-[-30px]"
        aria-labelledby="tab-label-1ai"
        tabIndex="-1"
      >
        <Toast ref={toast} />

        <div className="flex gap-3 lg:flex-row flex-column">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-map-marker"></i>
            </span>
            <Dropdown
              value={tourDestination}
              onChange={(e) => setTourDestination(e.value)}
              options={[
                { name: "New York", code: "NY" },
                { name: "London", code: "LD" },
                { name: "Paris", code: "PR" },
              ]}
              optionLabel="name"
              placeholder="Select Destination"
              className="flex-1"
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-calendar-clock"></i>
            </span>
            <Calendar
              value={tourFromDate}
              placeholder="From"
              className="flex-1"
              onChange={(e) => setTourFromDate(e.value)}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-calendar-clock"></i>
            </span>
            <Calendar
              className="flex-1"
              placeholder="To"
              value={tourToDate}
              onChange={(e) => setTourToDate(e.value)}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputNumber
              value={tourGuest}
              className="flex-1"
              placeholder="Guest"
              onValueChange={(e) => setTourGuest(e.value)}
            />
          </div>

          <Button label="Explore" className="" onClick={handleExplore} />
        </div>
      </div>

      <div className="container mx-auto px-6 mt-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-10/12 mx-auto justify-center">
          {tourData.map((tour) => (
            <div
              key={tour.id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col w-70 my-3 mx-auto"
            >
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full object-cover aspect-[4/3]"
              />
              <div className="px-4 pt-4 flex-grow">
                <h3 className="text-lg font-semibold text-black line-clamp-1">
                  {tour.name}
                </h3>
                <div className="flex justify-content-between">
                  <p className="text-gray-600 m-0">{tour.duration}</p>
                  <p className="text-gray-700 m-0">{tour.location}</p>
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-100">
                <span className="text-md font-bold px-3 bg-[#ffcb27] mt-2 py-3 rounded-tr-xl">
                  {tour.price}
                </span>
                <span className="text-md font-bold pe-3 py-3 mt-2">
                  View Details
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
