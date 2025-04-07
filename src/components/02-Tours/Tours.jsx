import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import decrypt from "../../helper";

import Axios from "axios";

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

  const [tourDetailsBackend, setTourDetailsBackend] = useState([]);

  const [destinationData, setDestinationData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Verify Token Running --- ");

        const listDestinations = await Axios.get(
          import.meta.env.VITE_API_URL + "/userRoutes/listDestination",
          {
            headers: {
              Authorization: localStorage.getItem("JWTtoken"),
              "Content-Type": "application/json",
            },
          }
        );
        console.log('listDestinations', listDestinations)
        const destinationData = decrypt(
          listDestinations.data[1],
          listDestinations.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data list tour data ======= line 738", destinationData);
        setDestinationData(destinationData.Details);
        // setTourDetailsBackend(destinationData.tourDetails);

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
        setTourDetailsBackend(data.tourDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [filterApplied, setFilterApplied] = useState(false);
  const toastRef = useRef(null);

  const handleExplore = () => {
    if (!tourDestination && !tourFromDate && !tourToDate && !tourGuest) {
      toastRef.current.show({
        severity: "warn",
        summary: "No Filters Selected",
        detail: "Please select at least one filter to continue.",
        life: 3000,
      });
      return;
    }
    setFilterApplied(true);
  };

  const filteredTours = filterApplied
    ? tourDetailsBackend.filter((tour) => {
        const fromDate = tourFromDate ? new Date(tourFromDate) : null;
        const toDate = tourToDate ? new Date(tourToDate) : null;

        const tourStartDate = new Date(tour.tourFromDate);
        console.log("tourStartDate", tourStartDate);
        const tourEndDate = new Date(tour.tourToDate);
        console.log("tourEndDate", tourEndDate);

        const isWithinDateRange =
          (!fromDate || fromDate >= tourStartDate) &&
          (!toDate || toDate <= tourEndDate);
        console.log("isWithinDateRange", isWithinDateRange);

        const isWithinDuration =
          !fromDate ||
          !toDate ||
          (toDate - fromDate) / (1000 * 60 * 60 * 24) + 1 <=
            Number(tour.refDurationIday);
        console.log("isWithinDuration", isWithinDuration);

        const isMatchingDestination =
          !tourDestination || tour.refDesignationId === tourDestination;

        return isWithinDateRange && isWithinDuration && isMatchingDestination;
      })
    : tourDetailsBackend;

  console.log("filteredTours", filteredTours);

  return (
    <div>
      <div className="toursPageContents01">
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
        <Toast ref={toastRef} />

        <div className="flex gap-3 lg:flex-row flex-column">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-map-marker"></i>
            </span>
            <Dropdown
              value={tourDestination}
              onChange={(e) => setTourDestination(e.value)}
              options={destinationData.map((item) => ({
                ...item,
                refDestinationName:
                  item.refDestinationName.charAt(0).toUpperCase() +
                  item.refDestinationName.slice(1).toLowerCase(),
              }))}
              optionLabel="refDestinationName"
              optionValue="refDestinationId"
              placeholder="Select Destination"
              className="flex-1 capitalize"
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

      <div className="container mx-auto px-6 mt-8 w-full pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-10/12 mx-auto justify-center">
          {filteredTours.length > 0 ? (
            filteredTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white cursor-pointer shadow-md rounded-lg overflow-hidden flex flex-col w-70 my-3 mx-auto"
                onClick={() => {
                  navigate("/tourDetails", { state: { tour } });
                  window.scrollTo(0, 0);
                }}
              >
                <img
                  src={`data:${tour.refCoverImage.contentType};base64,${tour.refCoverImage.content}`}
                  alt={tour.title}
                  className="w-full object-cover aspect-[4/3]"
                />
                <div className="px-4 pt-4 flex-grow">
                  <h3 className="text-lg font-semibold text-black line-clamp-1">
                    {tour.refPackageName}
                  </h3>
                  <div className="flex justify-content-between">
                    <p className="text-gray-600 m-0">
                      {tour.refDurationIday} D & {tour.refDurationINight} N
                    </p>
                    <p className="text-gray-700 m-0">
                      {tour.refDestinationName}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-gray-100">
                  <span className="text-md font-bold px-3 bg-[#ffcb27] mt-2 py-3 rounded-tr-xl">
                    CHF {tour.refTourPrice} / Person
                  </span>
                  <span className="text-md font-bold pe-3 py-3 mt-2">
                    View Tour
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No tours available for the selected dates.</p>
          )}
        </div>
      </div>
    </div>
  );
}
