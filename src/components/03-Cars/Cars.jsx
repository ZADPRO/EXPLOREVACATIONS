import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/floatlabel";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState } from "react";

// cars Image
import minivan from "../../assets/cars/minivan.jpg";
import standard from "../../assets/cars/standard.jpg";
import suv from "../../assets/cars/suv.jpg";
import luxury from "../../assets/cars/luxury.jpg";

// Car Features Image
import speed from "../../assets/cars/speed.svg";
import fueltype from "../../assets/cars/fueltype.svg";
import carmodel from "../../assets/cars/carmodel.svg";
import geartype from "../../assets/cars/geartype.svg";
import person from "../../assets/cars/person.svg";
import bags from "../../assets/cars/bags.svg";

export default function Cars() {
  const pickuplocation = [
    { location: "Abu Dhabi" },
    { location: "Bangkok" },
    { location: "Dhaka" },
    { location: "Dubai" },
    { location: "Jakarta" },
  ];

  const dropofflocation = [
    { location: "Abu Dhabi" },
    { location: "Bangkok" },
    { location: "Dhaka" },
    { location: "Dubai" },
    { location: "Jakarta" },
  ];

  const typescar = [
    { name: "Minivan" },
    { name: "Standard" },
    { name: "Suv's" },
    { name: "Luxury" },
  ];

  const carData = [
    {
      id: 1,
      name: "Minivan",
      img: minivan,
      speed: "Unlimited",
      fueltype: "Diesel",
      carmodel: "2021",
      gearType: "Manual",
      person: "7",
      bags: "3",
      price: "80.00",
    },
    {
      id: 2,
      name: "Standard",
      img: standard,
      speed: "Unlimited",
      fueltype: "Petrol",
      carmodel: "2022",
      gearType: "Auto",
      person: "5",
      bags: "4",
      price: "120.00",
    },
    {
      id: 3,
      name: "Suv's",
      img: suv,
      speed: "Unlimited",
      fueltype: "Petrol",
      carmodel: "2022",
      gearType: "Auto",
      person: "5",
      bags: "4",
      price: "120.00",
    },
    {
      id: 4,
      name: "Luxury",
      img: luxury,
      speed: "Unlimited",
      fueltype: "Petrol",
      carmodel: "2022",
      gearType: "Auto",
      person: "5",
      bags: "4",
      price: "120.00",
    },
  ];

  const [carPickupLocation, setCarPickupLocation] = useState(null);
  const [carPickupDateTime, setCarPickupDateTime] = useState(null);
  const [carDropLocation, setCarDropLocation] = useState(null);
  const [carDropDateTime, setCarDropDateTime] = useState(null);

  const [ismodelOpen, setIsModelOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [submissionAddress, setSubmissionAddress] = useState("");
  const [pickupDateTime, setPickupDateTime] = useState(null); // Renamed
  const [selectedVehicleType, setSelectedVehicleType] = useState(null); // Renamed
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [extras, setExtras] = useState({
    cheese: false,
    childSeat: false,
    boosterSeat: false,
    golfBag: false,
    mountainBike: false,
    wineBottle: false,
    champagneBottle: false,
    beerBottle: false,
    localSimCard: false,
    gpsDevice: false,
  });
  const [otherRequirements, setOtherRequirements] = useState("");

  const handleCheckboxChange = (e) => {
    setExtras({ ...extras, [e.target.name]: e.target.checked });
  };

  return (
    <div>
      {/* Header Background Image - Start  */}
      <div className="carsPageCont01">
        <div className="h-[80vh]"></div>
      </div>
      {/* Header Background Image - End  */}

      {/* Input Finder - Start */}
      <div
        id="tab-panel-1ai"
        role="tabpanel"
        className="card w-10/12 mx-auto bg-white p-4 shadow-md rounded-lg mt-[-30px]"
        aria-labelledby="tab-label-1ai"
        tabIndex="-1"
      >
        <div className="flex gap-3 lg:flex-row flex-column">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-map-marker"></i>
            </span>
            <Dropdown
              value={carPickupLocation}
              onChange={(e) => setCarPickupLocation(e.value)}
              options={pickuplocation}
              optionLabel="location"
              placeholder="Pickup Location"
              className="flex-1"
            />{" "}
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-calendar-clock"></i>
            </span>
            <Calendar
              id="calendar-12h"
              value={carPickupDateTime}
              className="flex-1"
              onChange={(e) => setCarPickupDateTime(e.value)}
              showTime
              placeholder="Pickup Date & Time"
              hourFormat="12"
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-map-marker"></i>
            </span>
            <Dropdown
              value={carDropLocation}
              onChange={(e) => setCarDropLocation(e.value)}
              options={dropofflocation}
              optionLabel="location"
              placeholder="Drop Off Location"
              className="flex-1"
            />{" "}
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-calendar-clock"></i>
            </span>
            <Calendar
              id="calendar-12h"
              value={carDropDateTime}
              onChange={(e) => setCarDropDateTime(e.value)}
              className="flex-1"
              showTime
              placeholder="Drop Off Date & Time"
              hourFormat="12"
            />
          </div>

          <Button label="Explore" className="" />
        </div>
      </div>
      {/* Input Finder - End */}

      {/* Car map List - Start */}

      <div className="container mx-auto px-6 mt-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-10/12 mx-auto justify-center">
          {carData.map((car) => (
            <div
              onClick={() => {
                setIsModelOpen(true);
              }}
              key={car.id}
              className="bg-white cursor-pointer shadow-md rounded-lg overflow-hidden flex flex-col w-70 my-3 mx-auto"
            >
              <img
                src={car.img}
                alt={car.name}
                className="w-full object-cover aspect-[4/3]"
              />
              <div className="px-4 pt-4 flex-grow">
                <h3 className="text-lg font-semibold text-black line-clamp-1">
                  {car.name}
                </h3>
                <div className="flex w-[100%] pt-[1rem] text-[0.8rem]">
                  <p className="text-gray-600 m-0 w-[50%] flex gap-1">
                    <img src={speed} alt="speed" />
                    {car.speed}
                  </p>
                  <p className="text-gray-700 m-0 w-[50%] flex gap-1">
                    <img src={fueltype} alt="fueltype" />
                    {car.fueltype}
                  </p>
                </div>
                <div className="flex w-[100%] text-[0.8rem] pt-[0.5rem] pb-[0.5rem]">
                  <p className="text-gray-600 m-0 w-[50%] flex gap-1">
                    <img src={carmodel} alt="carmodel" />
                    {car.carmodel}
                  </p>
                  <p className="text-gray-700 m-0 w-[50%] flex gap-1">
                    <img src={geartype} alt="geartype" />
                    {car.gearType}
                  </p>
                </div>
                <div className="flex w-[100%] pb-[1rem] text-[0.8rem]">
                  <p className="text-gray-600 m-0 w-[50%] flex gap-1">
                    <img src={person} alt="person" />
                    {car.person} Person
                  </p>
                  <p className="text-gray-700 m-0 w-[50%] flex gap-1">
                    <img src={bags} alt="bags" />
                    {car.bags} Bag
                  </p>
                </div>
              </div>
              <div className="px-4 pb-3  flex flex-col lg:flex-row items-center">
                <div className="w-[100%] lg:w-[60%] pb-[10px] lg:pb-0 flex gap-1">
                  <div className="text-[1rem] font-bold">CHF {car.price}</div>
                  <div className="text-[0.7rem] mt-[0.3rem]">/ Day</div>
                </div>
                <div className="w-[100%] lg:w-[40%]">
                  <div className="w-[100%] bg-[#0166b3] hover:bg-[#fff] text-center h-[2rem] flex justify-center items-center rounded-sm font-bold text-[#fff] border-2 border-[#0166b3] hover:text-[#0166b3] transition-colors duration-300 ease-in-out">
                    Book Now
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Car map List - End */}

      {/* Model Data - Start */}
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
                value={pickupDateTime} // Updated variable name
                className="flex-1 w-[100%]"
                onChange={(e) => setPickupDateTime(e.value)} // Updated variable name
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
                value={selectedVehicleType} // Updated variable name
                onChange={(e) => setSelectedVehicleType(e.value)} // Updated variable name
                options={typescar}
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

        <h6 className="pt-[1.5rem]">Extras (chargeable)</h6>

        <div className="flex flex-wrap justify-start pt-[1rem] gap-3">
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
          <Button severity="success" className="w-[20%]" label="Submit" />
        </div>
      </Dialog>

      {/* Model Data - End */}
    </div>
  );
}
