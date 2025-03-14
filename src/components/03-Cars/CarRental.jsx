import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/floatlabel";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";

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

export default function CarRental() {
  const location = useLocation();

  const cabPickupLocation = location.state?.cabPickupLocation || null;
  const cabPickupDateTime = location.state?.cabPickupDateTime || null;
  const cabDropLocation = location.state?.cabDropLocation || null;

  const [selectedCity, setSelectedCity] = useState(null);
  const [datetime12h, setDateTime12h] = useState(null);

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

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

  return (
    <div>
      <div className="carsPageCont01">
        <div className="h-[80vh]"></div>
      </div>

      <div className="flex w-10/12 py-10 mx-auto">
        <div className="">
          <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputText
                  id="username"
                  className="w-[100%]"
                  //  value={value} onChange={(e) => setValue(e.target.value)}
                />
                <label htmlFor="username">Your Name</label>
              </FloatLabel>
            </div>
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputText
                  id="username"
                  //  value={value} onChange={(e) => setValue(e.target.value)}
                  className="w-[100%]"
                />
                <label htmlFor="username">Your Email</label>
              </FloatLabel>
            </div>
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputNumber
                  id="username"
                  className="w-[100%]"
                  useGrouping={false}
                  //  value={value} onChange={(e) => setValue(e.target.value)}
                />
                <label htmlFor="username">Your Mobile Number</label>
              </FloatLabel>
            </div>
          </div>

          <div className="pt-[2rem] flex flex-col lg:flex-row gap-[1rem]">
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputText
                  id="username"
                  className="w-[100%]"
                  //  value={value} onChange={(e) => setValue(e.target.value)}
                />
                <label htmlFor="username">Pick Up Address</label>
              </FloatLabel>
            </div>
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputText
                  id="username"
                  className="w-[100%]"
                  //  value={value} onChange={(e) => setValue(e.target.value)}
                />
                <label htmlFor="username">Submission Address</label>
              </FloatLabel>
            </div>
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <Calendar
                  id="calendar-12h"
                  value={carPickupDateTime}
                  className="flex-1 w-[100%]"
                  onChange={(e) => setCarPickupDateTime(e.value)}
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
                  // value={carPickupLocation}
                  // onChange={(e) => setCarPickupLocation(e.value)}
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
                  id="username"
                  className="w-[100%]"
                  useGrouping={false}
                  //  value={value} onChange={(e) => setValue(e.target.value)}
                />
                <label htmlFor="username">Adults</label>
              </FloatLabel>
            </div>
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputNumber
                  id="username"
                  className="w-[100%]"
                  useGrouping={false}
                  //  value={value} onChange={(e) => setValue(e.target.value)}
                />
                <label htmlFor="username">Children</label>
              </FloatLabel>
            </div>
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputNumber
                  id="username"
                  className="w-[100%]"
                  useGrouping={false}
                  //  value={value} onChange={(e) => setValue(e.target.value)}
                />
                <label htmlFor="username">Infants</label>
              </FloatLabel>
            </div>
          </div>

          <h6 className="pt-[1.5rem]">Extras (chargeable)</h6>

          <div className="flex flex-wrap justify-start pt-[1rem] gap-3">
            <div className="flex items-start">
              <Checkbox
                inputId="ingredient1"
                name="pizza"
                // value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')}
              />
              <label htmlFor="ingredient1" className="ml-2">
                Cheese
              </label>
            </div>

            <div className="flex align-items-center">
              <Checkbox
                inputId="ingredient1"
                name="pizza"
                // value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')}
              />
              <label htmlFor="ingredient1" className="ml-2">
                Child seat (0-2 years)
              </label>
            </div>

            <div className="flex align-items-center">
              <Checkbox
                inputId="ingredient1"
                name="pizza"
                // value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')}
              />
              <label htmlFor="ingredient1" className="ml-2">
                Booster seat (3-11 years)
              </label>
            </div>
            <div className="flex align-items-center">
              <Checkbox
                inputId="ingredient1"
                name="pizza"
                // value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')}
              />
              <label htmlFor="ingredient1" className="ml-2">
                Golf bag
              </label>
            </div>
            <div className="flex align-items-center">
              <Checkbox
                inputId="ingredient1"
                name="pizza"
                // value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')}
              />
              <label htmlFor="ingredient1" className="ml-2">
                Mountain bike
              </label>
            </div>
            <div className="flex align-items-center">
              <Checkbox
                inputId="ingredient1"
                name="pizza"
                // value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')}
              />
              <label htmlFor="ingredient1" className="ml-2">
                Wine bottle
              </label>
            </div>
            <div className="flex align-items-center">
              <Checkbox
                inputId="ingredient1"
                name="pizza"
                // value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')}
              />
              <label htmlFor="ingredient1" className="ml-2">
                Champagne bottle
              </label>
            </div>
            <div className="flex align-items-center">
              <Checkbox
                inputId="ingredient1"
                name="pizza"
                // value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')}
              />
              <label htmlFor="ingredient1" className="ml-2">
                Beer bottle
              </label>
            </div>
            <div className="flex align-items-center">
              <Checkbox
                inputId="ingredient1"
                name="pizza"
                // value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')}
              />
              <label htmlFor="ingredient1" className="ml-2">
                Local SIM card
              </label>
            </div>
            <div className="flex align-items-center">
              <Checkbox
                inputId="ingredient1"
                name="pizza"
                // value="Cheese" onChange={onIngredientsChange} checked={ingredients.includes('Cheese')}
              />
              <label htmlFor="ingredient1" className="ml-2">
                GPS device
              </label>
            </div>
          </div>

          <div className="pt-[2.5rem] flex flex-col lg:flex-row gap-[1rem]">
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputTextarea
                  className="w-[100%]"
                  // value={value} onChange={(e) => setValue(e.target.value)}
                  rows={5}
                  cols={30}
                />
                <label htmlFor="username">Your other requirements</label>
              </FloatLabel>
            </div>
          </div>

          <div className="pt-[1rem] flex justify-center">
            <Button severity="success" className="w-[20%]" label="Submit" />
          </div>
        </div>
      </div>
    </div>
  );
}
