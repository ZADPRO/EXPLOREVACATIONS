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

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const initialTourDestination = location.state?.tourDestination || null;
  const initialTourFromDate = formatDate(location.state?.tourFromDate || null);
  const initialTourToDate = formatDate(location.state?.tourToDate || null);
  const initialTourGuest = location.state?.tourGuest || 0;

  const [tourDestination, setTourDestination] = useState(
    initialTourDestination
  );
  const [tourFromDate, setTourFromDate] = useState(initialTourFromDate);
  const [tourToDate, setTourToDate] = useState(initialTourToDate);
  const [tourGuest, setTourGuest] = useState(initialTourGuest);
  const [tourDetailsBackend, setTourDetailsBackend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [destinationData, setDestinationData] = useState([]);
  const toastRef = useRef(null);

  const navigate = useNavigate();

  const getDestinationData = async () => {
    try {
      const response = await Axios.get(
        import.meta.env.VITE_API_URL + "/userRoutes/listDestination",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      const destinationData = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      if (destinationData.success) {
        setDestinationData(destinationData.Details);
      }
    } catch (err) {
      console.error("Error in getDestinationData:", err);
    }
  };

  // if (!tourDestination && !tourFromDate && !tourToDate && !tourGuest) {
  //   if (toastRef.current) {
  //     toastRef.current.show({
  //       severity: "info",
  //       summary: "Showing All Tours",
  //       detail: "No filters selected. Displaying all available tours.",
  //       life: 3000,
  //     });
  //   }
  // }

  const getTourData = () => {
    const formattedFromDate = formatDate(tourFromDate);
    const formattedToDate = formatDate(tourToDate);

    Axios.post(
      import.meta.env.VITE_API_URL + "/userRoutes/getAllTour",
      {
        fromdate: formattedFromDate,
        todate: formattedToDate,
        refPersonCount: tourGuest,
        refDesignationId: tourDestination,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        const tourData = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        console.log("Tour Data:", tourData);

        if (tourData.success) {
          setTourDetailsBackend(tourData.tourDetails);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error in getTourData:", err);
      });
  };

  useEffect(() => {
    getTourData();
    getDestinationData();
  }, []);

  const handleClearFilters = () => {
    setTourDestination(null);
    setTourFromDate(null);
    setTourToDate(null);
    setTourGuest(0);
    // getTourData();
  };

  const filteredTours = tourDetailsBackend; // No frontend filtering now

  return (
    <div>
      <Popup />
      <div className="mt-20">
        <BannerCarousel moduleId={3} />
      </div>

      <div className="card w-10/12 mx-auto bg-white p-4 shadow-md rounded-lg">
        <Toast ref={toast} />
        <Toast ref={toastRef} />

        <div className="flex gap-3 lg:flex-row flex-column flex-wrap">
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
                if (!tourToDate || tourToDate <= e.value) {
                  setTourToDate(null);
                }
              }}
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

          <Button
            label="Explore"
            className="px-4"
            onClick={() => {
              console.log("Explore clicked");
              getTourData();
            }}
          />

          <Button
            label="Clear"
            className="px-4 p-button-secondary"
            onClick={handleClearFilters}
          />
        </div>
      </div>

      {loading ? (
        <div className="h-[30vh] w-full bg-[#fff] flex justify-center items-center">
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        </div>
      ) : (
        <div className="container mx-auto px-6 mt-8 w-full pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-10/12 mx-auto justify-center">
            {filteredTours && filteredTours.length > 0 ? (
              filteredTours.map((tour) => (
                <div
                  key={tour.refPackageId}
                  className="bg-white cursor-pointer shadow-md rounded-lg overflow-hidden flex flex-col w-70 my-3 mx-auto"
                  onClick={() => {
                    navigate("/tourDetails", { state: { tour } });
                    window.scrollTo(0, 0);
                  }}
                >
                  {tour.refCoverImage === null ? (
                    <img src={tourImg} alt="Alt Image for Tours" />
                  ) : (
                    <img
                      src={`https://zuericar.com/src/assets/coverImage/${tour.refCoverImage}`}
                      alt={tour.refPackageName}
                      className="w-full object-cover aspect-[4/3]"
                    />
                  )}
                  <div className="px-4 pt-4 flex-grow">
                    <h3 className="text-lg font-semibold text-black line-clamp-1">
                      {tour.refPackageName}
                    </h3>
                    <div className="flex justify-between">
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
              <p>No tours available for the selected filters.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
