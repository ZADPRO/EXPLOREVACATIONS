import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import time from "../../assets/Parking/time.png";
import brand from "../../assets/Parking/brand.png";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  MapPinCheck,
  ChartColumnIncreasing,
  ChartColumnDecreasing,
  Ban,
  CalendarCheck,
} from "lucide-react";
import decrypt from "../../helper";
import { TabPanel, TabView } from "primereact/tabview";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Toast } from "primereact/toast";

export default function ParkingTemplate() {
  const [parkinglist, setParkinglist] = useState({});
  const location = useLocation();
  const [parkingState, setParkingState] = useState();
  const [refParkingId, setRefParkingId] = useState("");
  const [parkingListData, setParkingLIstData] = useState({});
  const [ismodelOpen, setIsModelOpen] = useState(false);
  const [ismodelOpen1, setIsModelOpen1] = useState(false);
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    travelStartDate: new Date(),
    travelEndDate: null,
    refCarParkingId: 0,
    returnFlightNumber: "",
    returnFlightLocation: "",
    VehicleModel: "",
    vehicleNumber: "",
    refHandOverTime: "",
    refReturnTime: "",
    WhoWillHandover: false,
    HandoverPersonName: "",
    HandoverPersonPhone: "",
    HandoverPersonEmail: "",
    pricePerDayorHour: "",
    price: "",
  });



  const toast = useRef(null);
  useEffect(() => {
    console.log("carParkingRoutes/getCarParking");

    const car = location.state?.car;
    setParkingState(car);
    setRefParkingId(car.refCarParkingId);

    const fetchData = async () => {
      try {
        console.log("Verify Token Running --- ");

        const response = await axios.post(
          import.meta.env.VITE_API_URL + "/userRoutes/getCarParking",
          {
            refCarParkingId: car.refCarParkingId,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );
        const data = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("setParkingLIstData ========== line 118 >", data);
        if (data.success) {
          // localStorage.setItem("token", "Bearer " + data.token);
          console.log("setParkingLIstData ========== line 118 >", data);
          setParkingLIstData(data.Details[0]);
          console.log(" data.success------------[0] >", data.Details[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/userRoutes/carParkingBooking",
        {
          travelStartDate: formdata.travelStartDate,
          travelEndDate: formdata.travelEndDate,
          refCarParkingId: formdata.refCarParkingId,
          refCarParkingId: refParkingId,
          returnFlightNumber: formdata.returnFlightNumber,
          returnFlightLocation: formdata.returnFlightLocation,
          VehicleModel: formdata.VehicleModel,
          vehicleNumber: formdata.vehicleNumber,
          refHandOverTime: formdata.refHandOverTime,
          refReturnTime: formdata.refReturnTime,
          WhoWillHandover: formdata.WhoWillHandover,
          HandoverPersonName: formdata.HandoverPersonName,
          HandoverPersonPhone: formdata.HandoverPersonPhone,
          HandoverPersonEmail: formdata.HandoverPersonEmail,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log(data);
      if (data.success) {
        localStorage.setItem("token", "Bearer " + data.token);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Successfully Booked !",
          life: 3000,
        });
        
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

  const handlePaycheck = async () => {
    // const Details = parkingListData?.Details || []; 
    console.log("parkingListData------------Details");
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/userRoutes/carParkingBooking",
        {
          travelStartDate: formdata.travelStartDate,
          travelEndDate: formdata.travelEndDate,
          pricePerDayorHour: parkingListData?.pricePerDayorHour,
          price: parkingListData?.price,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log(data);
      if (data.success) {
        localStorage.setItem("token", "Bearer " + data.token);
        setIsModelOpen(false);
        // setPayment(data.result[0].travelStartDate);
        // setPayment(data.result[0].travelEndDate);
      
        setIsModelOpen1(false);
        toast.current.show({
          severity: "success",
          summary: "Payment Successful",
          detail: "Your payment was successful.",
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

  // const handleInput = (e) => {
  //   setInputs((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };
  const handleInput = (e) => {
    const { name } = e.target;
    console.log("name line ---- 144", name);
    const value = e.target.value;
    console.log("value line --- 146", value);

    setFormdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setPayment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="parkingPageContents01 relative h-[40vh] flex items-center justify-center text-white text-3xl font-bold">
        {/* Centered Text Here */}
      </div>
      <Toast ref={toast} />

      <div className="flex w-10/12 mx-auto">
        <div className="flex lg:flex-row flex-column gap-6 p-4">
          <div className="lg:w-2/4 flex-shrink-0">
            <img
              src="https://i.pinimg.com/736x/7f/70/dd/7f70dd969120a6912a4cb9b9c85514ae.jpg"
              alt="Car Image"
              className="w-full h-full object-cover rounded-lg"
            />
            {/* {parkingListData?.refCarPath && (
              <img
                
                src={`https://explorevacations.max-idigital.ch/src/assets/cars/${parkingListData?.parkingSlotImage}`}
                alt="Car Image"
                className="w-full h-full object-cover rounded-lg"
              />
            )} */}
          </div>

          <div className="lg:w-2/4 flex flex-col justify-center gap-4">
            <p className="flex  gap-2 items-center font-bold uppercase text-[22px]">
              {parkingListData.refParkingName}
            </p>
            <p className="flex gap-2 items-center">
              <MapPinCheck
                className="bg-[#009ad7] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Location:</span>{" "}
              {parkingListData.refLocation}{" "}
            </p>
            <p className="flex gap-2 items-center">
              <ChartColumnIncreasing
                className="bg-[#009ad7] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Maximum Booking Duration:</span>{" "}
              {parkingListData.MaximumBookingDuration}
            </p>
            <p className="flex gap-2 items-center">
              <ChartColumnDecreasing
                className="bg-[#009ad7] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Minimum Booking Duration:</span>{" "}
              {parkingListData.MinimumBookingDuration}
            </p>
            <p className="flex gap-2 items-center">
              <Ban
                className="bg-[#009ad7] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Cancellation Allowed:</span>{" "}
              {parkingListData.isCancellationAllowed ? "Yes" : "No"}
            </p>

            <p className="flex gap-2 items-center">
              <CalendarCheck
                className="bg-[#009ad7] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Reschedule Allowed:</span>{" "}
              {parkingListData.isRescheduleAllowed ? "Yes" : "No"}
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
              {/* <button
                className="border-1 px-4 py-2 rounded bg-[#009ad7] text-white cursor-pointer"
                onClick={() => {
                  setIsModelOpen1(true);
                }}
              >
                <span className="font-semibold">Check Payment</span>{" "}
              </button> */}
            </p>
          </div>
        </div>
      </div>

      <div className="card flex w-10/12 mx-auto overflow-hidden py-8">
        <TabView className="w-full overflow-x-auto">
          <TabPanel header="Service Features" key="tab1">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              <ul className="list-disc pl-5">
                {parkingListData?.ServiceFeaturesList?.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                )) || <p>Loading...</p>}
              </ul>
            </div>
          </TabPanel>
          <TabPanel header="Description" key="tab1">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              {parkingListData.description}
            </div>
          </TabPanel>
          <TabPanel header="Instruction" key="tab1">
            <div>{parkingListData.instructions}</div>
          </TabPanel>
          <TabPanel header="Others" key="tab1">
            <div>
              <ul className="list-disc pl-5">
                <li>Availability :{parkingListData.refAvailability}</li>
                <li>Weekly Discount :{parkingListData.refWeeklyDiscount}</li>
                <li>Operating Hours :{parkingListData.refOperatingHours}</li>
              </ul>
            </div>
          </TabPanel>
          <TabPanel header="Cancellation & Reschedule" key="tab1">
            <div>
              Contact Explore Vacation :{" "}
              <button
                className="bg-[#009ad7] p-2 rounded-2xl text-white cursor-pointer "
                onClick={() => {
                  navigate("/contact");
                  window.scrollTo(0, 0);
                }}
              >
                Click here..!
              </button>
            </div>
          </TabPanel>
        </TabView>
      </div>

      <Dialog
        header="Book your Parking Area"
        visible={ismodelOpen}
        className="w-[90%] lg:w-[85%] h-[80vh] overflow-auto"
        onHide={() => {
          if (!ismodelOpen) return;
          setIsModelOpen(false);
        }}
      >
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            handlePaycheck();
          }}
        >
          <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputText
                  id="VehicleModel"
                  name="VehicleModel"
                  value={formdata.VehicleModel}
                  onChange={handleInput}
                  className="w-[100%]"
                  required
                />
                <label htmlFor="username">Vehicle Model</label>
              </FloatLabel>
            </div>
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputText
                  id="vehicleNumber"
                  name="vehicleNumber"
                  value={formdata.vehicleNumber}
                  onChange={handleInput}
                  className="w-[100%]"
                  required
                />
                <label htmlFor="username">Vehicle Number</label>
              </FloatLabel>
            </div>
          </div>
          <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <Calendar
                  className="card flex justify-content-center"
                  id="travelStartDate"
                  name="travelStartDate"
                  value={formdata.travelStartDate}
                  onChange={handleInput}
                  minDate={new Date()}
                />
                <label htmlFor="username">travel StartDate </label>
              </FloatLabel>
            </div>
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <Calendar
                  className="card flex justify-content-center"
                  id="travelEndDate"
                  name="travelEndDate"
                  value={formdata.travelEndDate}
                  onChange={handleInput}
                />
                <label htmlFor="travelEndDate">Travel End Date</label>
              </FloatLabel>
            </div>
          </div>
          <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputText
                  id="returnFlightNumber"
                  name="returnFlightNumber"
                  value={formdata.returnFlightNumber}
                  onChange={handleInput}
                  className="w-[100%]"
                  required
                />
                <label htmlFor="username">Return Flight Number</label>
              </FloatLabel>
            </div>
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputText
                  id="returnFlightLocation"
                  name="returnFlightLocation"
                  value={formdata.returnFlightLocation}
                  onChange={handleInput}
                  className="w-[100%]"
                  required
                />
                <label htmlFor="username">Return Flight Location</label>
              </FloatLabel>
            </div>
          </div>
          <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputText
                  id="refHandOverTime"
                  name="refHandOverTime"
                  value={formdata.refHandOverTime}
                  onChange={handleInput}
                  className="w-[100%]"
                  required
                />
                <label htmlFor="username">Hand OverTime</label>
              </FloatLabel>
            </div>
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputText
                  id="refReturnTime"
                  name="refReturnTime"
                  value={formdata.refReturnTime}
                  onChange={handleInput}
                  className="w-[100%]"
                  required
                />
                <label htmlFor="username">Return Time</label>
              </FloatLabel>
            </div>
          </div>

          <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
            <div className="w-[100%]">
              <label className="block mb-2 font-medium text-gray-700">
                Who Will Handover
              </label>

              <div className="flex gap-6 items-center">
                <div className="flex items-center">
                  <RadioButton
                    inputId="handoverYes"
                    name="WhoWillHandover"
                    value={true}
                    onChange={(e) =>
                      setFormdata((prev) => ({
                        ...prev,
                        WhoWillHandover: e.value,
                      }))
                    }
                    checked={formdata.WhoWillHandover === true}
                  />
                  <label htmlFor="handoverYes" className="ml-2">
                    Myself
                  </label>
                </div>

                <div className="flex items-center">
                  <RadioButton
                    inputId="handoverNo"
                    name="WhoWillHandover"
                    value={false}
                    onChange={(e) =>
                      setFormdata((prev) => ({
                        ...prev,
                        WhoWillHandover: e.value,
                      }))
                    }
                    checked={formdata.WhoWillHandover === false}
                  />
                  <label htmlFor="handoverNo" className="ml-2">
                    Others
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputText
                  id="HandoverPersonName"
                  name="HandoverPersonName"
                  value={formdata.HandoverPersonName}
                  onChange={handleInput}
                  className="w-[100%]"
                  disabled={formdata.WhoWillHandover}
                  required
                />
                <label htmlFor="username">Handover Person Name</label>
              </FloatLabel>
            </div>
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputText
                  id="HandoverPersonPhone"
                  name="HandoverPersonPhone"
                  value={formdata.HandoverPersonPhone}
                  onChange={handleInput}
                  className="w-[100%]"
                  disabled={formdata.WhoWillHandover}
                  required
                />
                <label htmlFor="username">Handover Person Phone</label>
              </FloatLabel>
            </div>
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputText
                  id="HandoverPersonEmail"
                  name="HandoverPersonEmail"
                  value={formdata.HandoverPersonEmail}
                  onChange={handleInput}
                  className="w-[100%]"
                  disabled={formdata.WhoWillHandover}
                  required
                />
                <label htmlFor="username">Handover Person Email</label>
              </FloatLabel>
            </div>
          </div>

          <div className="pt-[1rem] flex justify-center">
            <Button
              severity="success"
              className="w-[20%]"
              label="Submit"
              type="submit"
            />
          </div>
        </form>
      </Dialog>

      {/* <Dialog
        header="Payment Details"
        visible={ismodelOpen1}
        className="w-[90%] lg:w-[85%] h-[80vh] overflow-auto"
        onHide={() => {
          if (!ismodelOpen1) return;
          setIsModelOpen1(false);
        }}
      >
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handlePaycheck();
          }}
        >
          <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <Calendar
                  name="travelStartDate"
                  value={payment.travelStartDate}
                  onChange={handleInput}
                  className="w-[100%]"
                  required
                />
                <label htmlFor="username">Travel StartDate</label>
              </FloatLabel>
            </div>
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <Calendar
                  name="travelEndDate"
                  value={payment.travelEndDate}
                  onChange={handleInput}
                  className="w-[100%]"
                  required
                />
                <label htmlFor="username">Travel End Date</label>
              </FloatLabel>
            </div>
          </div>
          <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputText
                  id="pricePerDayorHour"
                  name="pricePerDayorHour"
                  value={payment.pricePerDayorHour}
                  onChange={handleInput}
                  className="w-[100%]"
                  required
                />
                <label htmlFor="username">Price Per Day or Hour</label>
              </FloatLabel>
            </div>
            <div className="w-[100%]">
              <FloatLabel className="w-[100%]">
                <InputText
                  id="price"
                  name="price"
                  value={payment.price}
                  onChange={handleInput}
                  className="w-[100%]"
                  required
                />
                <label htmlFor="username">Price</label>
              </FloatLabel>
            </div>
          </div>

          <div className="pt-[1rem] flex justify-center">
            <Button
              severity="success"
              className="w-[20%]"
              label="Submit"
              type="submit"
            />
          </div>
        </form>
      </Dialog> */}
    </div>
  );
}
