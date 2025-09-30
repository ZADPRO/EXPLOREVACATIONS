import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
// import { Dropdown } from "primereact/dropdown";
// import time from "../../assets/Parking/time.png";
// import brand from "../../assets/Parking/brand.png";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";

import { FileUpload } from "primereact/fileupload";
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
import Pdf from "../../components/Pdf/index2";

export default function ParkingTemplate() {
  // const [parkinglist, setParkinglist] = useState({});
  const [_profile, setProfile] = useState("");
  const [_parkingState, setParkingState] = useState();
  const [refParkingId, setRefParkingId] = useState("");
  const [parkingListData, setParkingLIstData] = useState({});
  const [ismodelOpen, setIsModelOpen] = useState(false);
  const [_ismodelOpen1, setIsModelOpen1] = useState(false);
  const [agreementparking, setAgreementparking] = useState([]);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

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

  const location = useLocation();
  const tour = location.state?.tour;
  console.log("tour-----------", tour);

  // payment
  const checkingApi = async () => {
    try {
      console.log("checkingApi running");
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/paymentRoutes/payment",
        {
          successRedirectUrl:
            "https://karmacuisine.ch/orders?status=success&message=Payment+Successful",
          failedRedirectUrl: "https:/karmacuisine.ch//orders?status=failure",
          purpose: "Payment processing",
          userEmail: email,
          firstname: name.split(" ")[0],
          totalAmount: amount,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      // Decrypt the response
      const decryptedData = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      console.log("decryptedData:", decryptedData);

      if (decryptedData?.success) {
        const paymentLink = decryptedData?.data?.[0]?.link;
        if (paymentLink) {
          console.log("Redirecting to paymentLink:", paymentLink);
          window.location.href = paymentLink;
        } else {
          console.warn("Payment link not found in success response.");
          alert("Payment link not found. Please try again later.");
        }
      } else {
        console.error(
          "Payment creation failed:",
          decryptedData?.message || "Unknown error"
        );
        alert(
          "Payment creation failed: " +
            (decryptedData?.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error while making API call:", error?.message || error);
      alert("Error while making payment. Please try again later.");
    }
  };

  const toast = useRef(null);
  useEffect(() => {
    fetchProfileData();
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

  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.post(
  //       import.meta.env.VITE_API_URL + "/userRoutes/carParkingBooking",
  //       {
  //         travelStartDate: formdata.travelStartDate,
  //         travelEndDate: formdata.travelEndDate,
  //         // refCarParkingId: formdata.refCarParkingId,
  //         refCarParkingId: refParkingId,
  //         returnFlightNumber: formdata.returnFlightNumber,
  //         returnFlightLocation: formdata.returnFlightLocation,
  //         VehicleModel: formdata.VehicleModel,
  //         vehicleNumber: formdata.vehicleNumber,
  //         refHandOverTime: formdata.refHandOverTime,
  //         refReturnTime: formdata.refReturnTime,
  //         WhoWillHandover: formdata.WhoWillHandover,
  //         HandoverPersonName: formdata.HandoverPersonName,
  //         HandoverPersonPhone: formdata.HandoverPersonPhone,
  //         HandoverPersonEmail: formdata.HandoverPersonEmail,
  //         refAgreementPath: agreementparking,
  //       },
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const data = decrypt(
  //       response.data[1],
  //       response.data[0],
  //       import.meta.env.VITE_ENCRYPTION_KEY
  //     );
  //     console.log(data);
  //     if (data.success) {
  //       localStorage.setItem("token", "Bearer " + data.token);
  //       toast.current?.show({
  //         severity: "success",
  //         summary: "Success",
  //         detail: "Successfully Booked !",
  //         life: 3000,
  //       });

  //       setIsModelOpen(false);
  //     }
  //   } catch (error) {
  //     toast.current.show({
  //       severity: "error",
  //       summary: "Submission Failed",
  //       detail: "Something went wrong. Please try again.",
  //       life: 3000,
  //     });
  //     console.error("API Error:", error);
  //   }
  // };
  console.log("amount-------------->", amount);

  const handlePaycheck = async () => {
    const Details = parkingListData?.Details || [];
    console.log("parkingListData------------Details", Details);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/paymentRoutes/calculation",
        {
          travelStartDate: formdata.travelStartDate,
          travelEndDate: formdata.travelEndDate,
          pricePerDayorHour: parkingListData?.pricePerHourORday,
          refCarParkingId: refParkingId,
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
        setAmount(data.totalAmount);
        console.log(
          "data.totalAmount------------------",
          setAmount(data.totalAmount)
        );
        console.log("data.totalAmount------------------", amount);
        console.log("data.totalAmount------------------", data.totalAmount);

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

  //upload agreement

  const agreementUploader = async (event) => {
    console.table("event", event);

    // Create a FormData object

    // Loop through the selected files and append each one to the FormData
    for (let i = 0; i < event.files.length; i++) {
      const formData = new FormData();
      const file = event.files[i];
      formData.append("PdfFile ", file);

      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL +
            "/bookingRoutes/uploadParkingAgreement",

          formData,

          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        const data = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        // localStorage.setItem("token", "Bearer " + data.token);
        console.log("data==============", data);

        if (data.success) {
          localStorage.setItem("token", "Bearer " + data.token);
          handleUploadSuccess(data);
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Uploaded Successfully!",
            life: 3000,
          });
        } else {
          handleUploadFailure(data);
        }
      } catch (error) {
        handleUploadFailure(error);
      }
    }
  };
  const handleUploadSuccess = (response) => {
    let temp = [...agreementparking]; // Create a new array to avoid mutation
    temp.push(response.filePath); // Add the new file path
    console.log("Upload Successful:", response);
    setAgreementparking(temp); // Update the state with the new array
  };

  const handleUploadFailure = (error) => {
    console.error("Upload Failed:", error);
    // Add your failure handling logic here
  };

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/userRoutes/profileData",
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

      console.log("data ---------->list Profiledata", data);

      if (data.success) {
        localStorage.setItem("token", "Bearer " + data.token);
        const profileInfo = data.profileData[0];

        setProfile(profileInfo);
        if (data.success) {
          localStorage.setItem("token", "Bearer " + data.token);
          const profileInfo = data.profileData[0];

          setProfile(profileInfo);
          setName(profileInfo.refFName || "");
          setEmail(profileInfo.refUserEmail || "");
        }
      }
    } catch (e) {
      console.log("Error fetching profile data:", e);
    }
  };

  // const downloadPdf = async () => {
  //   const doc = (
  //     <Pdf
  //       // title={ parkingListData?.refParkingTypeName}
  //       // firstName={parkingListData?.refParkingTypeName}
  //       // lastName={parkingListData?.refParkingTypeName}
  //       // bookingNumber={parkingListData?.refParkingCustId}
  //       // customerName={parkingListData?.refParkingTypeName}
  //       // vehicleMake={parkingListData?.refParkingTypeName}
  //       // vehicleModel={parkingListData?.refParkingTypeName}
  //       // vehicleLicensePlate={parkingListData?.refParkingTypeName}
  //       // location={parkingListData?.refLocation}
  //       // paymentStatus={parkingListData?.refStatus}
  //       // checkInDate={parkingListData?.MaximumBookingDuration}
  //       // checkInTime={parkingListData?.MaximumBookingDuration}
  //       // checkOutDate={parkingListData?.MaximumBookingDuration}
  //       // checkOutTime={parkingListData?.MaximumBookingDuration}
  //       // nearbylocation={parkingListData?.refAssociatedAirport}
  //       title="title"
  //       firstName="John"
  //       lastName="Doe"
  //       bookingNumber="8782729"
  //       customerName="John Doe"
  //       vehicleMake="Tesla"
  //       vehicleModel="Model 3"
  //       vehicleLicensePlate="ZH-123456"
  //       location="location"
  //       paymentStatus="yes"
  //       checkInDate="05/06/2025"
  //       checkInTime="10:00"
  //       checkOutDate="05/07/2025"
  //       checkOutTime="10:00"
  //       nearbylocation="nearbylocation"
  //     />
  //   );

  //   try {
  //     // Generate PDF as Blob
  //     const pdfBlob = await pdf(doc).toBlob();

  //     // Create a URL for the Blob
  //     const a = document.createElement("a");
  //     a.href = URL.createObjectURL(pdfBlob);
  //     a.download = "Sample.pdf";
  //     a.click();
  //     URL.revokeObjectURL(a.href);

  //     // const url = URL.createObjectURL(pdfBlob);

  //     // // Create an anchor element and trigger download
  //     // a.href = url;
  //     // a.download = `Booking Confirmation.pdf`;
  //     // document.body.appendChild(a);
  //     // a.click();

  //     // // Cleanup
  //     // document.body.removeChild(a);
  //     // URL.revokeObjectURL(url);

  //     console.log("PDF downloaded successfully!");
  //   } catch (error) {
  //     console.error("Error generating or downloading PDF:", error);
  //   }
  // };

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

            <div className="flex gap-2 items-center">
              <p className="flex gap-2 items-center">
                <button
                  className="border-1 px-4 py-2 rounded bg-[#009ad7] text-white cursor-pointer"
                  onClick={() => {
                    setIsModelOpen(true);
                  }}
                >
                  <span className="font-semibold">Book Now</span>{" "}
                </button>
              </p>
              {/* <p className="flex gap-2 items-center">
                <button
                  onClick={downloadPdf}
                  className="border-1 px-4 py-2 rounded bg-[#009ad7] text-white cursor-pointer"
                >
                  <span className="font-semibold">Download</span>{" "}
                </button>
              </p> */}
            </div>
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
              Contact ZüriCar GO GmbH :{" "}
              <button
                className=" p-2 rounded-2xl text-[#065784] underline cursor-pointer "
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
            localStorage.setItem(
              "formData",
              JSON.stringify({
                api:
                  import.meta.env.VITE_API_URL +
                  "/userRoutes/carParkingBooking",
                payload: {
                  travelStartDate: formdata.travelStartDate,
                  travelEndDate: formdata.travelEndDate,
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
                  // refAgreementPath: agreementparking,
                },
              })
            );
            // handleSubmit();
            handlePaycheck();
            checkingApi();
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

          {/* <div className="w-[100%]">
            <h2 className="">Upload Agreement</h2>
            <FileUpload
              name="logo"
              customUpload
              className="mt-3"
              uploadHandler={agreementUploader}
              accept="application/pdf"
              maxFileSize={10000000}
              emptyTemplate={
                <p className="m-0">Drag and drop your pdf here to upload.</p>
              }
              multiple
            />
          </div> */}

          <div className="pt-[1rem] flex justify-center">
            <Button
              severity="error"
              className="w-[20%]"
              label="Pay "
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
