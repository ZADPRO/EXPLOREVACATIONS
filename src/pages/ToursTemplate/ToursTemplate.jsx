import {
  BadgeSwissFranc,
  Binoculars,
  History,
  LayoutPanelLeft,
  UsersRound,
} from "lucide-react";
import React, { use, useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
// import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import tourimg from "../../assets/Default/tour.jpg";

import { FaRegCircleLeft } from "react-icons/fa6";
import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/floatlabel";
import { FaDownload } from "react-icons/fa6";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import arch from "../../assets/homeCards/card4.jpg"

import PdfVieTour from "../../components/Pdf/index";

import { Toast } from "primereact/toast";
import { TabView, TabPanel } from "primereact/tabview";

import { useNavigate } from "react-router-dom";

import { pdf } from "@react-pdf/renderer";
import Axios from "axios";

import { useLocation } from "react-router-dom";
import decrypt from "../../helper";
// import PayrexxModal from "../Payment/PayrexxModal";

export default function ToursTemplate() {
  const navigate = useNavigate();
  // const handleNext = () => {
  //   navigate("/pdf", { state: { tourId: tour.refPackageId } });
  // };
  const location = useLocation();
  const tour = location.state?.tour;
  console.log("tour", tour);
  const toast = useRef(null);
  const [ismodelOpen, setIsModelOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);

  // const toast = useRef(null);

  const [packageId, setPackageId] = useState();
  const [galleryImg, SetGalleryImg] = useState([]);

  const [formDataImages, setFormdataImages] = useState([]);
  const [passportImage, setPassportImage] = useState([]);
  const [agreementImage, setAgreementImage] = useState([]);
  const [formData, setFromDate] = useState({
    refPackageId: 0,
    refUserName: "",
    refUserLname: "",
    refUserMail: "",
    refUserMobile: "",
    refArrivalDate: "",
    refSingleRoom: "",
    refTwinRoom: "",
    refTripleRoom: "",
    refAdultCount: "",
    refChildrenCount: "",
    refVaccinationType: "",
    refVaccinationCertificate: "",
    refOtherRequirements: "",
    refPassPort: "",
    refPickupDate: "",
    refInfants: "",
    refAgreementPath: "",
    refApplyOffers: "",
    refCouponCode: "",
    transactionId: "",
  });

  // const [input, setInout] = useState({
  //   totalAmount: 0,
  //   userEmail: "",
  //   firstname: "",
  //   lastname: "",
  //   purpose: "",
  // });
  const [discountedAmount, setDiscountedAmount] = useState(null);

  const roleId = localStorage.getItem("roleId");
  const [otherRequirements, setOtherRequirements] = useState("");
  const [tourcode, setTourCode] = useState("");
  const [isCouponVerified, setIsCouponVerified] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const transactionId = location.state?.transactionId;

  // const handleSubmit = async (transactionId) => {
  //   if (!name || !email || !mobileNumber || !pickupDateTime) {
  //     toast.current.show({
  //       severity: "error",
  //       summary: "Validation Error",
  //       detail: "Please fill in all required fields.",
  //       life: 3000,
  //     });
  //     return;
  //   }

  //   console.log("data.tourDetails[0].refPackageId", packageId);
  //   try {
  //     const response = await Axios.post(
  //       import.meta.env.VITE_API_URL + "/userRoutes/tourBooking",
  //       {
  //         refPackageId: packageId,
  //         refUserName: name,
  //         refUserMail: email,
  //         refUserMobile: mobileNumber + "",
  //         refPickupDate: pickupDateTime,
  //         refAdultCount: adults + "",
  //         refChildrenCount: children + "",
  //         refInfants: infants + "",
  //         refOtherRequirements: otherRequirements,
  //         refAgreement: agreementImage,
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
  //     console.log("data list tour data ======= ?", data);
  //     if (data.success) {
  //       toast.current.show({
  //         severity: "success",
  //         summary: "Success",
  //         detail: "Added successfully!",
  //         life: 3000,
  //       });
  //       localStorage.setItem("token", "Bearer " + data.token);
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
  // const CutomizeSubmit = async () => {
  //   console.log("data.tourDetails[0].refPackageId", packageId);
  //   try {
  //     const response = await Axios.post(
  //       import.meta.env.VITE_API_URL + "/userRoutes/customizeBooking",
  //       {
  //         refPackageId: tour.refPackageId,
  //         refUserName: formData.refUserName + "",
  //         refUserMail: formData.refUserMail + "",
  //         refUserMobile: formData.refUserMobile + "",
  //         refArrivalDate: formData.refArrivalDate + "",
  //         refSingleRoom: formData.refSingleRoom + "",
  //         refTwinRoom: formData.refTwinRoom + "",
  //         refTripleRoom: formData.refTripleRoom + "",
  //         refAdultCount: formData.refAdultCount + "",
  //         refChildrenCount: formData.refChildrenCount + "",
  //         refVaccinationType: formData.refVaccinationType + "",
  //         refVaccinationCertificate: formDataImages[0],
  //         refPassPort: passportImage[0],
  //         refOtherRequirements: formData.refOtherRequirements + "",
  //       },
  //       // refAgreement: agreementImage,
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
  //     console.log("Customise Tour----------->", data);
  //     if (data.success) {
  //       toast.current.show({
  //         severity: "success",
  //         summary: "Success",
  //         detail: "Added successfully!",
  //         life: 3000,
  //       });
  //       localStorage.setItem("token", "Bearer " + data.token);
  //       setModelOpen(false);
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
              Authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );
        const destinationData = decrypt(
          listDestinations.data[1],
          listDestinations.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data list tour data ======= line 121", destinationData);
        setPackageId(destinationData.tourDetails[0].refPackageId);
        SetGalleryImg(destinationData.tourDetails[0].refGallery);

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
        console.log("data list tour data ---------------- ?", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const Tourcode = async () => {
    try {
      const listDestinations = await Axios.post(
        import.meta.env.VITE_API_URL + "/userRoutes/checkoffer",
        {
          refPackageId: tour.refPackageId,
          refCouponCode: tourcode,
        },

        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      const data = decrypt(
        listDestinations.data[1],
        listDestinations.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log("Verify Token Running --- ", data);
      if (data.success) {
        setIsCouponVerified(true);
        setDiscountedAmount(data.result);
        localStorage.setItem("token", "Bearer " + data.token);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Applicable Successfully!",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Tourprice = async () => {
    try {
      const listDestinations = await Axios.post(
        import.meta.env.VITE_API_URL + "/userRoutes/checkTourPrice",
        {
          refPackageId: tour.refPackageId,
          refAdultCount: formData.refAdultCount,
          refChildrenCount: formData.refChildrenCount,
        },

        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      const data = decrypt(
        listDestinations.data[1],
        listDestinations.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log("Verify Token Running --- ", data);
      if (data.success) {
        setIsCouponVerified(true);
        setDiscountedAmount(data.totalAmount);
        localStorage.setItem("token", "Bearer " + data.token);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Applied Successfully!",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!tour) {
    return <h2 className="text-center text-red-500">No Tour Data Found!</h2>;
  }

  // const handlePayment = async () => {
  //   // if (!name || !email || !mobileNumber || !pickupDateTime) {
  //   //   toast.current.show({
  //   //     severity: "error",
  //   //     summary: "Validation Error",
  //   //     detail: "Please fill in all required fields before payment.",
  //   //     life: 3000,
  //   //   });
  //   //   return;
  //   // }

  //   const paymentForm = new FormData(); // ✅ this is the fix

  //   paymentForm.append("amount", tour.refTourPrice); // Payrexx expects amount in cents
  //   paymentForm.append("currency", "CHF");
  //   paymentForm.append("purpose", `Tour Booking - ${tour.name}`);
  //   paymentForm.append("success_url", window.location.href);
  //   paymentForm.append("failed_url", window.location.href);
  //   paymentForm.append("customer_email", email);
  //   paymentForm.append("customer_firstname", name.split(" ")[0]);
  //   paymentForm.append("customer_lastname", name.split(" ")[1] || "");

  //   try {
  //     // https://explorevacationsag.payrexx.com/en/vpos
  //     const response = await fetch(
  //       `https://explorevacationsag.payrexx.com/en/vpos`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${import.meta.env.VITE_PAYREXX_API_SECRET}`,
  //         },
  //         body: paymentForm,
  //       }
  //     );

  //     const result = await response.json();
  //     console.log("Payrexx response", result);

  //     if (result && result.data && result.data[0]?.link) {
  //       await handleSubmit(); // ensure the booking is saved before payment
  //       window.payrexx.open({ link: result.data[0].link });
  //     } else {
  //       throw new Error("Invalid response from Payrexx");
  //     }
  //   } catch (error) {
  //     console.error("Payment failed:", error);
  //     toast.current.show({
  //       severity: "error",
  //       summary: "Payment Error",
  //       detail: "Payment initiation failed. Please try again.",
  //       life: 3000,
  //     });
  //   }
  // };

  const customUploader = async (event) => {
    console.table("event", event);

    // Create a FormData object

    // Loop through the selected files and append each one to the FormData
    for (let i = 0; i < event.files.length; i++) {
      const formData = new FormData();
      const file = event.files[i];
      formData.append("PdfFile ", file);

      try {
        const response = await Axios.post(
          import.meta.env.VITE_API_URL + "/userRoutes/uploadCertificate",

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
    let temp = [...formDataImages]; // Create a new array to avoid mutation
    temp.push(response.filePath); // Add the new file path
    console.log("Upload Successful:", response);
    setFormdataImages(temp); // Update the state with the new array
  };

  const handleUploadFailure = (error) => {
    console.error("Upload Failed:", error);
    // Add your failure handling logic here
  };

  const passportUploader = async (event) => {
    console.table("event", event);

    // Create a FormData object

    // Loop through the selected files and append each one to the FormData
    for (let i = 0; i < event.files.length; i++) {
      const formData = new FormData();
      const file = event.files[i];
      formData.append("PdfFile", file);

      try {
        const response = await Axios.post(
          import.meta.env.VITE_API_URL + "/userRoutes/uploadPassport",

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

        if (data.success) {
          localStorage.setItem("token", "Bearer " + data.token);
          handlepassportUploadSuccess(data);
        } else {
          handlepassportUploadFailure(data);
        }
      } catch (error) {
        handlepassportUploadFailure(error);
      }
    }
  };
  const handlepassportUploadSuccess = (response) => {
    let temp = [...passportImage]; // Create a new array to avoid mutation
    temp.push(response.filePath); // Add the new file path
    console.log("Upload Successful:", response);
    setPassportImage(temp); // Update the state with the new array
  };

  const handlepassportUploadFailure = (error) => {
    console.error("Upload Failed:", error);
    // Add your failure handling logic here
  };

  // aggreement

  const AgreementUploader = async (event) => {
    console.table("event", event);

    // Create a FormData object

    // Loop through the selected files and append each one to the FormData
    for (let i = 0; i < event.files.length; i++) {
      const formData = new FormData();
      const file = event.files[i];
      formData.append("PdfFile", file);

      try {
        const response = await Axios.post(
          import.meta.env.VITE_API_URL + "/bookingRoutes/uploadTourAgreement",

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

        if (data.success) {
          localStorage.setItem("token", "Bearer " + data.token);
          handleagreementtUploadSuccess(data);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Uploaded successfully!",
            life: 3000,
          });
        } else {
          handleagreementUploadFailure(data);
        }
      } catch (error) {
        handleagreementUploadFailure(error);
      }
    }
  };
  const handleagreementtUploadSuccess = (response) => {
    let temp = [...passportImage]; // Create a new array to avoid mutation
    temp.push(response.filePath); // Add the new file path
    console.log("Upload Successful:", response);
    setAgreementImage(temp); // Update the state with the new array
  };

  const handleagreementUploadFailure = (error) => {
    console.error("Upload Failed:", error);
    // Add your failure handling logic here
  };

  const handleInvoiceDownload = async () => {
    const doc = (
      <PdfVieTour
        tourName={tour.refPackageName}
        tourDay={tour.refDurationIday}
        tourNight={tour.refDurationINight}
        tourPrice={tour.refTourPrice}
        tourCode={tour.refTourCode}
        tourGroupSize={tour.refGroupSize}
        tourItenary={tour.refItinary}
        tourIncludes={tour.travalInclude}
        tourExcludes={tour.travalExclude}
        specialNotes={tour.refSpecialNotes}
        tourCategory={tour.refCategoryName}
      />
    );

    try {
      // Generate PDF as Blob
      console.log("doc", doc);
      const pdfBlob = await pdf(doc).toBlob();

      // Create a URL for the Blob
      const url = URL.createObjectURL(pdfBlob);

      // Create an anchor element and trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = `Tour_Package${tour.refPackageName}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating or downloading PDF:", error);
    }
  };
  console.log("discountedAmount", discountedAmount);
  // payment
  const checkingApi = async () => {
    //sucesss
    try {
      console.log("checkingApi running");
      const response = await Axios.post(
        import.meta.env.VITE_API_URL + "/paymentRoutes/payment",
        {
          successRedirectUrl: "https://explorevacations.max-idigital.ch",
          failedRedirectUrl: "https://explorevacations.max-idigital.ch",
          // successRedirectUrl: "http://localhost:5174",
          // failedRedirectUrl: "http://localhost:51734",
          purpose: "Payment processing",
          totalAmount: discountedAmount,
          userEmail: formData.refUserMail,
          firstname: formData.refUserName.split(" ")[0],
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

  return (
    <div>
      <Toast ref={toast} />
      <div className="tourBannerBg01 relative h-[60vh] flex items-center justify-center text-white text-3xl font-bold">
        {/* Centered Text Here */}
      </div>

      <div className="flex w-[100%] lg:px-20 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:p-4  md:p-4 ">
          {/* Image Section */}
          <div className="lg:w-2/4 pt-3 flex-shrink-0">
            {/* <img
              src={
                // src={data:${tour.refCoverImage.contentType};base64,${tour.refCoverImage.content}}
                tour?.refCoverImage
                  ? `https://explorevacations.max-idigital.ch/src/assets/coverImage/${tour.refCoverImage}`
                  : {tourimg} // Replace with your actual default image path
              }
              alt="Tour Image"
              className="w-full h-full object-cover rounded-lg"
            /> */}
            <img
              src={
                tour?.refCoverImage
                  ? `https://explorevacations.max-idigital.ch/src/assets/coverImage/${tour.refCoverImage}`
                  : arch
              }
              alt="Tour Image"
              className="w-full h-full object-cover rounded-lg"
            />

          </div>

          {/* Information Section */}
          <div className="lg:w-2/4   flex flex-col justify-center gap-4">
            <p className="flex gap-2 items-center font-bold uppercase text-[22px]">
              {tour.name}
            </p>
            <p className="flex gap-2 items-center">
              <History
                className="bg-[#009ad7] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Duration:</span>{" "}
              {tour.refDurationIday} Days & {tour.refDurationINight} Nights
            </p>
            <p className="flex gap-2 items-center">
              <BadgeSwissFranc
                className="bg-[#009ad7] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Price:</span> CHF{" "}
              {tour.refTourPrice} <span>/ Person</span>
            </p>
            <p className="flex gap-2 items-center">
              <Binoculars
                className="bg-[#009ad7] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Tour Code:</span>{" "}
              {tour.refTourCode}
            </p>
            <p className="flex gap-2 items-center">
              <UsersRound
                className="bg-[#009ad7] p-1 rounded-lg text-white"
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
                className="bg-[#009ad7] p-1 rounded-lg text-white"
                size={30}
              />
              <span className="font-semibold">Categories:</span>{" "}
              {tour.refCategoryName}
            </p>

            <p className="flex gap-2 items-center">
              <button
                className="border-1 px-4 py-2 rounded bg-[#009ad7] text-white cursor-pointer"
                onClick={() => {
                  if (roleId === "3" || roleId === "6") {
                    setIsModelOpen(true);
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <span className="font-semibold">Book Now</span>


              </button>
              {/* <div className="max-h-[300px] flex flex-col w-[50%] gap-3 justify-center overflow-y-auto p-2 md:max-h-full">
                <p className="text-xl text-[#065784] ">
                  {" "}
                  Click here to Download the Tour Agreement.....!
                </p>
                <button
                  onClick={() => {
                    handleInvoiceDownload();
                  }}
                  className="text-3xl text-[#065784] cursor-pointer"
                >
                  <FaDownload />
                </button>
              </div> */}

              {/* <button
                className="border-1 px-4 py-2 rounded bg-[#009ad7] text-white cursor-pointer"
                onClick={() => {
                  if (roleId === "3" || roleId === "6") {
                    setModelOpen(true);
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <span className="font-semibold">Customize Tour</span>
              </button> */}
            </p>

            <div>
              {" "}
              <button
                onClick={() => navigate("/tours")}
                className="flex items-center w-[250px]  cursor-pointer testingFont font-semibold text-2xl md:text-base lg:text-2xl px-5 mt-3 hover:underline hover:text-[#009ad7] transition-all duration-300"
              >
                {/* <FaRegCircleLeft /> */}
                Back to Tours
              </button>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={tourcode}
                onChange={(e) => setTourCode(e.target.value)}
                className="border rounded px-4 py-2 w-60"
              />
              <button
                className="bg-[#1e811f] text-white px-4 py-2 rounded"
                onClick={Tourcode}
              >
                Apply Coupon
              </button>
            </div>
          </div>
        </div>
        <div></div>
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
            <div className=" py-3 sm:px-8 max-w-1xl body mx-auto text-sm sm:text-base text-gray-600 leading-relaxed text-center ">
              <p>
                By continuing to use our services, you acknowledge that your
                personal data will be processed in accordance with{" "}
                <span
                  onClick={() => handleNavigate("/privacy")}
                  className="text-[#014986] font-medium underline cursor-pointer hover:text-[#009ad7] transition"
                >
                  Privacy Policy
                </span>
                . <br className="hidden sm:block" />
                By creating an account, you agree to{" "}
                <span
                  onClick={() => handleNavigate("/generalpdf")}
                  className="text-[#014986] font-medium underline cursor-pointer hover:text-[#009ad7] transition"
                >
                  Terms of Use
                </span>
                .
              </p>
            </div>
          </TabPanel>

          <TabPanel header="Itinerary Map" key="tab3">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              {/* <img
                src={`data:${tour.refItinaryMapPath.contentType};base64,${tour.refItinaryMapPath.content}`}
                alt=""
              /> */}
              <img
                src={`https://explorevacations.max-idigital.ch/src/assets/map/${tour.refItinaryMapPath}`}
                alt="Itinerary Map"
                className="w-full object-contain"
              />
            </div>
          </TabPanel>
          <TabPanel header="Gallery Image" key="tab3">
            <div className="max-h-[300px] overflow-y-auto p-2 md:max-h-full">
              {galleryImg?.map((img) => (
                <img
                  // src={`data:${img.contentType};base64,${img.content}`}
                  src={`https://explorevacations.max-idigital.ch/src/assets/gallery/${img}`}
                  alt=""
                />
              ))}
              {/* <img
                src={`data:${tour.refGallery.contentType};base64,${tour.refGallery.content}`}
                alt=""
              /> */}
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

          <TabPanel header="Travel Excludes" key="tab6">
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
          <TabPanel header="Downloads" key="tab8">
            <div className="max-h-[300px] flex flex-col w-[100%] gap-3 justify-center overflow-y-auto p-2 md:max-h-full">
              <p className="text-xl text-[#065784] ">
                {" "}
                Download the Tour Package Here......!
              </p>
              <button
                onClick={() => {
                  handleInvoiceDownload();
                }}
                className="text-3xl text-[#065784] cursor-pointer"
              >
                <FaDownload />
              </button>
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
        <h6 className="pt-[1.5rem]">Personal Details</h6>

        <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="username"
                className="w-[100%]"
                value={formData.refUserName}
                required
                onChange={(e) => {
                  setFromDate({ ...formData, refUserName: e.target.value });
                }}
              />
              <label htmlFor="username">Your First Name</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="lastname"
                className="w-[100%]"
                value={formData.refUserLname}
                required
                onChange={(e) => {
                  setFromDate({ ...formData, refUserLname: e.target.value });
                }}
              />
              <label htmlFor="lastname">Your Last Name</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="email"
                className="w-[100%]"
                value={formData.refUserMail}
                required
                onChange={(e) => {
                  setFromDate({ ...formData, refUserMail: e.target.value });
                }}
              />
              <label htmlFor="email">Your Email</label>
            </FloatLabel>
          </div>
        </div>

        <div className="pt-[2rem] flex flex-col lg:flex-row gap-[1rem]">
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="mobileNumber"
                className="w-[100%]"
                required
                value={formData.refUserMobile}
                onChange={(e) => {
                  setFromDate({ ...formData, refUserMobile: e.target.value });
                }}
              />
              <label htmlFor="mobileNumber">Your Mobile Number</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <Calendar
                id="calendar-12h"
                value={formData.refPickupDate || new Date()} // Default to current date and time
                className="flex-1 w-[100%]"
                onChange={(e) => {
                  setFromDate({ ...formData, refPickupDate: e.target.value });
                }}
                showTime
                required
                placeholder="Pickup Date & Time"
                hourFormat="12"
                minDate={new Date()} // Restrict selection to today and onwards
              />

              <label htmlFor="calendar-12h">Pick Up Date & Time</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <Calendar
                id="calendar-12h"
                value={formData.refArrivalDate || new Date()} // Default to current date and time
                className="flex-1 w-[100%]"
                onChange={(e) => {
                  setFromDate({ ...formData, refArrivalDate: e.target.value });
                }}
                showTime
                required
                placeholder="Arrival Date & Time"
                hourFormat="12"
                minDate={new Date()} // Restrict selection to today and onwards
              />

              <label htmlFor="calendar-12h">Arrival Up Date & Time</label>
            </FloatLabel>
          </div>
        </div>

        <h6 className="pt-[1.5rem]">Number of passengers traveling</h6>

        <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="adults"
                className="w-[100%]"
                // useGrouping={false}
                value={formData.refAdultCount}
                required
                onChange={(e) => {
                  setFromDate({ ...formData, refAdultCount: e.target.value });
                }}
              />
              <label htmlFor="adults">Adults</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="children"
                className="w-[100%]"
                // useGrouping={false}
                value={formData.refChildrenCount}
                required
                onChange={(e) => {
                  setFromDate({
                    ...formData,
                    refChildrenCount: e.target.value,
                  });
                }}
              />
              <label htmlFor="children">Children</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                id="infants"
                className="w-[100%]"
                // useGrouping={false}
                value={formData.refInfants}
                required
                onChange={(e) => {
                  setFromDate({ ...formData, refInfants: e.target.value });
                }}
              />
              <label htmlFor="infants">Infants</label>
            </FloatLabel>
          </div>
        </div>

        <h6 className="pt-[1.5rem] text-[#ba0707]">Enter the person count to calculate the amount *</h6>
        <div className="flex flex-row gap-4">
          <Button
            label="Check Price"
            className="px-4 mt-5"
            onClick={() => {
              console.log("Explore clicked");
              Tourprice();
            }}
          />
          <div className="mt-6"> Total Amount : {discountedAmount}</div>
        </div>

        <h6 className="pt-[1.5rem]">Number of Rooms</h6>

        <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                className="w-[100%]"
                value={formData.refSingleRoom}
                required
                onChange={(e) => {
                  setFromDate({ ...formData, refSingleRoom: e.value });
                }}
              />
              <label htmlFor="refSingleRoom">Single Room</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                className="w-[100%]"
                value={formData.refTwinRoom}
                required
                onChange={(e) => {
                  setFromDate({ ...formData, refTwinRoom: e.value });
                }}
              />
              <label htmlFor="refTwinRoom">Twin Room</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                className="w-[100%]"
                value={formData.refTripleRoom}
                required
                onChange={(e) => {
                  setFromDate({ ...formData, refTripleRoom: e.target.value });
                  console.log("refTripleRoom", e.target.value);
                }}
              />
              <label htmlFor="refTripleRoom">Triple Room</label>
            </FloatLabel>
          </div>
        </div>

        <div className="pt-[2.5rem] flex flex-col lg:flex-row gap-[1rem]">
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputTextarea
                className="w-[100%]"
                value={formData.refOtherRequirements}
                required
                onChange={(e) => {
                  setFromDate({
                    ...formData,
                    refOtherRequirements: e.target.value,
                  });
                }}
                rows={5}
                cols={30}
              />

              <label htmlFor="otherRequirements">Your other requirements</label>
            </FloatLabel>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-2 italic">
          Your uploaded document will be stored securely and kept confidential.*
        </p>
        <div className="w-[100%]">
          <h2 className="">Upload Agreement</h2>
          <FileUpload
            name="logo"
            customUpload
            className="mt-3"
            uploadHandler={AgreementUploader}
            accept="application/pdf"
            maxFileSize={10000000}
            emptyTemplate={
              <p className="m-0">Drag and drop your pdf here to upload.</p>
            }
            multiple
          />
        </div>

        <div className="w-[100%]">
          <h2 className="">Upload PassPort</h2>
          <FileUpload
            name="logo"
            customUpload
            className="mt-3"
            uploadHandler={passportUploader}
            accept="application/pdf"
            maxFileSize={10000000}
            emptyTemplate={
              <p className="m-0">Drag and drop your pdf here to upload.</p>
            }
            multiple
          />
        </div>
        <div className="w-[100%]">
          <h2 className="">Upload Vaccination Certificate</h2>
          <FileUpload
            name="logo"
            customUpload
            className="mt-3"
            uploadHandler={customUploader}
            accept="application/pdf"
            maxFileSize={10000000}
            emptyTemplate={
              <p className="m-0">Drag and drop your pdf here to upload.</p>
            }
            multiple
          />
        </div>

        <div className="flex lg:flex-row md:flex-row flex-col items-center mt-5 gap-3">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={tourcode}
            onChange={(e) => setTourCode(e.target.value)}
            className="border rounded px-4 py-2 w-60"
          />
          <button
            className="bg-[#1e811f] text-white lg:px-4 lg:py-2 p-1 rounded"
            onClick={Tourcode}
          >
            Apply Coupon
          </button>
        </div>

        <div className="pt-[1rem] bg-red flex justify-center">
          <Button
            severity="danger"
            className="w-[20%]"
            label="Pay"
            onClick={(e) => {
              localStorage.setItem(
                "formData",
                JSON.stringify({
                  api: import.meta.env.VITE_API_URL + "/userRoutes/tourBooking",
                  payload: {
                    refPackageId: tour.refPackageId,
                    refUserName: formData.refUserName + "",
                    refUserLname: formData.refUserLname + "",
                    refUserMail: formData.refUserMail + "",
                    refUserMobile: formData.refUserMobile + "",
                    refArrivalDate: formData.refArrivalDate + "",
                    refPickupDate: formData.refArrivalDate + "",
                    refSingleRoom: formData.refSingleRoom + "",
                    refTwinRoom: formData.refTwinRoom + "",
                    refTripleRoom: formData.refTripleRoom + "",
                    refAdultCount: formData.refAdultCount + "",
                    refInfants: formData.refInfants + "",
                    refChildrenCount: formData.refChildrenCount + "",
                    // refVaccinationType: formData.refVaccinationType + "",
                    refAgreementPath: agreementImage[0],
                    refVaccinationCertificate: formDataImages[0],
                    refPassPort: passportImage[0],
                    refOtherRequirements: formData.refOtherRequirements + "",
                    refApplyOffers: isCouponVerified,
                    refCouponCode: tourcode,
                  },
                })
              );
              e.preventDefault();
              // handleSubmit();
              checkingApi();
            }}
          />
          {/* <PayrexxModal/> */}
          {/* <a
            className="payrexx-modal-window"
            href="#"
            data-href="https://example.payrexx.com/?payment=GATEWAY-HASH"
          >
            Open modal window
          </a> */}
        </div>
      </Dialog>

      {/* <Dialog
        header={tour.name}
        visible={modelOpen}
        className="w-[90%] lg:w-[85%] h-[80vh] overflow-auto"
        onHide={() => {
          if (!modelOpen) return;
          setModelOpen(false);
        }}
      >
        <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                className="w-[100%]"
                value={formData.refUserName}
                required
                onChange={(e) => {
                  setFromDate({ ...formData, refUserName: e.target.value });
                }}
              />
              <label htmlFor="refUserName">Your Name</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                className="w-[100%]"
                value={formData.refUserMail}
                required
                onChange={(e) => {
                  setFromDate({ ...formData, refUserMail: e.target.value });
                }}
              />
              <label htmlFor="refUserMail">Your Email</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputNumber
                className="w-[100%]"
                useGrouping={false}
                required
                value={formData.refUserMobile}
                onChange={(e) => {
                  setFromDate({ ...formData, refUserMobile: e.value });
                }}
              />
              <label htmlFor="refUserMobile">Your Mobile Number</label>
            </FloatLabel>
          </div>
        </div>

        <div className="pt-[2rem] flex flex-col lg:flex-row gap-[1rem]">
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <Calendar
                className="flex-1 w-[100%]"
                value={formData.refArrivalDate}
                required
                onChange={(e) => {
                  setFromDate({ ...formData, refArrivalDate: e.value });
                }}
                showTime
                placeholder="Pickup Date"
                hourFormat="12"
              />
              <label htmlFor="refArrivalDate">Pickup Date</label>
            </FloatLabel>
          </div>
        </div>
        <h6 className="pt-[1.5rem]">Number of Rooms</h6>

        <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputNumber
                className="w-[100%]"
                value={formData.refSingleRoom}
                required
                onChange={(e) => {
                  setFromDate({ ...formData, refSingleRoom: e.value });
                }}
              />
              <label htmlFor="refSingleRoom">Single Room</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputNumber
                className="w-[100%]"
                value={formData.refTwinRoom}
                required
                onChange={(e) => {
                  setFromDate({ ...formData, refTwinRoom: e.value });
                }}
              />
              <label htmlFor="refTwinRoom">Twin Room</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputText
                className="w-[100%]"
                value={formData.refTripleRoom}
                required
                onChange={(e) => {
                  setFromDate({ ...formData, refTripleRoom: e.target.value });
                  console.log("refTripleRoom", e.target.value);
                }}
              />
              <label htmlFor="refTripleRoom">Triple Room</label>
            </FloatLabel>
          </div>
        </div>

        <h6 className="pt-[1.5rem]">Number of passengers traveling</h6>

        <div className="pt-[1.5rem] flex flex-col lg:flex-row gap-[1rem]">
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputNumber
                className="w-[100%]"
                value={formData.refAdultCount}
                required
                onChange={(e) => {
                  setFromDate({ ...formData, refAdultCount: e.value });
                  // console.log("Evalue--------->",e.value)
                  console.log("Etargetvalue--------->", e.value);
                }}
              />
              <label htmlFor="refAdultCount">Adults</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputNumber
                className="w-[100%]"
                value={formData.refChildrenCount}
                required
                onChange={(e) => {
                  setFromDate({
                    ...formData,
                    refChildrenCount: e.value,
                  });
                  console.log("refChildrenCount", e.value);
                }}
              />
              <label htmlFor="refChildrenCount">Children</label>
            </FloatLabel>
          </div>
        </div>

        <div className="pt-[2.5rem] flex flex-col lg:flex-row gap-[1rem]">
          <div className="w-[100%]">
            <FloatLabel className="w-[100%]">
              <InputTextarea
                className="w-[100%]"
                value={formData.refOtherRequirements}
                required
                onChange={(e) => {
                  setFromDate({
                    ...formData,
                    refOtherRequirements: e.target.value,
                  });
                }}
                rows={5}
                cols={30}
              />
              <label htmlFor="otherRequirements">Your other requirements</label>
            </FloatLabel>
          </div>
        </div>
        <h6 className="pt-[1.5rem]">
          Vaccination & Passport Details (Optional)
        </h6>

        <div className="pt-[1.5rem] flex flex-col lg:flex-col gap-[1rem]">
          <div className="w-[100%] ">
            <FloatLabel className="w-[100%]">
              <InputText
                className="w-[100%] lg:w-[50%] "
                value={formData.refVaccinationType}
                placeholder="Yes/No"
                onChange={(e) => {
                  setFromDate({
                    ...formData,
                    refVaccinationType: e.target.value,
                  });
                }}
              />
              <label htmlFor="refVaccinationType">Vaccination Type</label>
            </FloatLabel>
          </div>
          <div className="w-[100%]">
            <h2 className="">Upload Certificate</h2>
            <FileUpload
              name="logo"
              customUpload
              className="mt-3"
              uploadHandler={customUploader}
              accept="application/pdf"
              maxFileSize={10000000}
              emptyTemplate={
                <p className="m-0">Drag and drop your pdf here to upload.</p>
              }
              multiple
            />
          </div>
          <div className="w-[100%]">
            <h2 className="">Upload Passport</h2>
            <FileUpload
              name="passport"
              customUpload
              className="mt-3"
              uploadHandler={passportUploader}
              accept="application/pdf"
              maxFileSize={10000000}
              emptyTemplate={
                <p className="m-0">Drag and drop your Image here to upload.</p>
              }
              multiple
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={tourcode}
              onChange={(e) => setTourCode(e.target.value)}
              className="border rounded px-4 py-2 w-60"
            />
            <button
              className="bg-[#1e811f] text-white px-4 py-2 rounded"
              onClick={Tourcode}
            >
              Apply Coupon
            </button>
          </div>
        </div>

        <div className="pt-[1rem] flex justify-center">
          <Button
            severity="success"
            className="w-[20%]"
            label="Pay"
            onClick={(e) => {
              localStorage.setItem(
                "formData",
                JSON.stringify({
                  api:
                    import.meta.env.VITE_API_URL +
                    "/userRoutes/customizeBooking",
                  payload: {
                    refPackageId: tour.refPackageId,
                    refUserName: formData.refUserName + "",
                    refUserMail: formData.refUserMail + "",
                    refUserMobile: formData.refUserMobile + "",
                    refArrivalDate: formData.refArrivalDate + "",
                    refSingleRoom: formData.refSingleRoom + "",
                    refTwinRoom: formData.refTwinRoom + "",
                    refTripleRoom: formData.refTripleRoom + "",
                    refAdultCount: formData.refAdultCount + "",
                    refChildrenCount: formData.refChildrenCount + "",
                    refVaccinationType: formData.refVaccinationType + "",
                    refVaccinationCertificate: formDataImages[0],
                    refPassPort: passportImage[0],
                    refOtherRequirements: formData.refOtherRequirements + "",
                    refApplyOffers: isCouponVerified,
                    refCouponCode: tourcode,
                  },
                })
              );
              e.preventDefault();
              // CutomizeSubmit();
              checkingApi();
            }}
          />
        </div>
      </Dialog> */}
    </div>
  );
}
