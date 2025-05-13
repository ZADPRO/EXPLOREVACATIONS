import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import decrypt from "../../helper";

import Axios from "axios";

import tourImg from "../../assets/tours/image.jpg";
import Popup from "../../pages/Popup/Popup";
import BannerCarousel from "../01-Home/BannerCarousel ";

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
  const [loading, setLoading] = useState(true);
  const [destinationData, setDestinationData] = useState([]);

  const navigate = useNavigate();
  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("Verify Token Running --- ");

      const listDestinations = await Axios.get(
        import.meta.env.VITE_API_URL + "/userRoutes/listDestination",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      console.log("listDestinations------------------>", listDestinations);
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
            Authorization: localStorage.getItem("token"),
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
      if (data.success) {
        // localStorage.setItem("token", "Bearer " + data.token);
        setTourDetailsBackend(data.tourDetails);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
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

  console.log("tourDetailsBackend", tourDetailsBackend);
  const filteredTours = filterApplied
    ? tourDetailsBackend.filter((tour) => {
        console.log("tour", tour);
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
      <Popup/>
     <div className="p-4 md:p-20 lg:p-8 mt-10 md:mt-0 lg:mt-0">
        <BannerCarousel moduleId={4} />
      </div>

      <div
        id="tab-panel-1ai"
        role="tabpanel"
        className="card w-10/12 mx-auto bg-white p-4 shadow-md rounded-lg "
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
              options={destinationData?.map((item) => ({
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
          {/* From Date */}
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-calendar-clock"></i>
            </span>
            <Calendar
              value={tourFromDate}
              placeholder="From"
              className="flex-1"
              minDate={new Date()}
              onChange={(e) => {
                setTourFromDate(e.value);
                // Optional: reset To Date if it's before the next valid date
                const nextDay = new Date(e.value);
                nextDay.setDate(nextDay.getDate() + 1);
                if (!tourToDate || tourToDate <= e.value) {
                  setTourToDate(null);
                }
              }}
            />
          </div>

          {/* To Date */}
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-calendar-clock"></i>
            </span>
            <Calendar
              className="flex-1"
              placeholder="To"
              value={tourToDate}
              onChange={(e) => setTourToDate(e.value)}
              minDate={
                tourFromDate
                  ? new Date(
                      new Date(tourFromDate).setDate(
                        new Date(tourFromDate).getDate() + 1
                      )
                    )
                  : new Date()
              }
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
      {loading ? (
        <div className="h-[30vh] w-full bg-[#fff] flex justify-center items-center">
          {/* <h1>Loading</h1> */}
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        </div>
      ) : (
        <>
          <div className="container mx-auto px-6 mt-8 w-full pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-10/12 mx-auto justify-center">
              {filteredTours && filteredTours.length > 0 ? (
                filteredTours.map((tour) => (
                  <div
                    key={tour.id}
                    className="bg-white cursor-pointer shadow-md rounded-lg overflow-hidden flex flex-col w-70 my-3 mx-auto"
                    onClick={() => {
                      navigate("/tourDetails", { state: { tour } });
                      window.scrollTo(0, 0);
                    }}
                  >
                    {tour.refCoverImage === null ? (
                      <>
                        <img src={tourImg} alt="Alt Image for Tours" />
                      </>
                    ) : (
                      <>
                        {" "}
                        <img
                          src={`https://explorevacations.max-idigital.ch/src/assets/coverImage/${tour.refCoverImage}`}
                          // src={`data:${tour.refCoverImage};base64,${tour.refCoverImage.content}`}
                          alt={tour.title}
                          className="w-full object-cover aspect-[4/3]"
                        />
                      </>
                    )}

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
        </>
      )}
    </div>
  );
}
