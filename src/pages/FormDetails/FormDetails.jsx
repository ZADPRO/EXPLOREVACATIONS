import React, { use, useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";

import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";

import axios from "axios";

import decrypt from "../../helper";

import { FileUpload } from "primereact/fileupload";

export default function formdetails() {
  const [UserDetails, setUserDetails] = useState([]);
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const [inputs, setInputs] = useState({
    refUserName: "",
    refUserMail: "",
    refUserMobile: "",
    refAddress: "",
    refDoorNumber: "",
    refStreet: "",
    refArea: "",
    refcountry: "",
    refPassport: "",
    refLicense: "",
  });
  const toast = useRef(null);
  const [licence, setLicence] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const handleSubmit = async () => {
    console.log("Form submitted");

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/newCarsRoutes/userOfflineCarBooking",
        {
          refUserName: inputs.refUserName,
          refUserMail: inputs.refUserMail,
          refUserMobile: inputs.refUserMobile,
          refAddress: inputs.refAddress,
          refDoorNumber: inputs.refDoorNumber,
          refStreet: inputs.refStreet,
          refArea: inputs.refArea,
          refcountry: inputs.refcountry,
          refPassport: profileImage,
          refLicense: licence,
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
        // localStorage.setItem("token", "Bearer " + data.token);
        fetchUserDetails();
        console.log(data);
      }
    } catch (error) {
      //   toast.current.show({
      //     severity: "error",
      //     summary: "Submission Failed",
      //     detail: "Something went wrong. Please try again.",
      //     life: 3000,
      //   });
      console.error("API Error:", error);
    }
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  // upload licence

  const LicenseUploader = async (event) => {
    console.table("event", event);

    for (let i = 0; i < event.files.length; i++) {
      const formData = new FormData();
      const file = event.files[i];
      formData.append("images", file);

      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "/newCarsRoutes/uploadLicense",

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
          console.log("data", data);
          localStorage.setItem("token", "Bearer " + data.token);
          handleAgreementUploadSuccess(data);
        } else {
          handleAgreemtUploadFailure(data);
        }
      } catch (error) {
        handleAgreemtUploadFailure(error);
      }
    }
  };
  const handleAgreementUploadSuccess = (response) => {
    let temp = [...licence]; // Create a new array to avoid mutation
    temp.push(response.filePath); // Add the new file path
    console.log("Upload Successful:", response);
    setLicence(temp); // Update the state with the new array
  };

  const handleAgreemtUploadFailure = (error) => {
    console.error("Upload Failed:", error);
    // Add your failure handling logic here
  };

  // upload licence

  const PassportUploader = async (event) => {
    console.table("event", event);

    for (let i = 0; i < event.files.length; i++) {
      const formData = new FormData();
      const file = event.files[i];
      formData.append("images", file);

      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "/newCarsRoutes/uploadPassport",

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
          handleAgreementUploadSuccess1(data);
        } else {
          handleAgreemtUploadFailure1(data);
        }
      } catch (error) {
        handleAgreemtUploadFailure1(error);
      }
    }
  };
  const handleAgreementUploadSuccess1 = (response) => {
    let temp = [...passport]; // Create a new array to avoid mutation
    temp.push(response.filePath); // Add the new file path
    console.log("Upload Successful:", response);
    setPassport(temp); // Update the state with the new array
  };

  const handleAgreemtUploadFailure1 = (error) => {
    console.error("Upload Failed:", error);
  };

  const profile = async (event) => {
    console.table("event", event);
    const file = event.files[0]; // Assuming single file upload
    const formData = new FormData();
    formData.append("images", file);
    console.log("formData", formData);

    for (let pair of formData.entries()) {
      console.log("-------->______________", pair[0] + ":", pair[1]);
    }

    console.log("formData------------>", formData);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/newCarsRoutes/uploadPassport",

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
        console.log("data+", data);
        handleUploadSuccessMap(data);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Successfully Added",
          life: 3000,
        });
      } else {
        console.log("data-", data);
        handleUploadFailure(data);
        toast.current?.show({
          severity: "error",
          summary: data.error,
          detail: "Error While Profile",
          life: 3000,
        });
      }
    } catch (error) {
      handleUploadFailure(error);
    }
  };
  const handleUploadSuccessMap = (response) => {
    console.log("Upload Successful:", response);
    setProfileImage(response.filePath);
  };

  const handleUploadFailure = (error) => {
    console.error("Upload Failed:", error);

    // Add your failure handling logic here
  };

  const handleNumberInput = (name, value) => {
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/newCarsRoutes/listOfflineCarBooking",
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
      console.log("data-------------->fetchUserDetails", data);
      if (data.success) {
        localStorage.setItem("token", "Bearer " + data.token);

        setUserDetails(data.result);
      }
    } catch (e) {
      console.log("Error fetching customise:", e);
    }
  };
  return (
    <div className="mt-20 px-4 md:px-10 md:p-5">
      <Toast ref={toast} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Submitting..."); // check if this prints
          handleSubmit(); // check if this runs
        }}
      >
        {/* First Row */}
        <div className="pt-3 flex flex-col md:flex-col lg:flex-row gap-4">
          <div className="w-full">
            <FloatLabel className="w-full">
              <InputText
                id="refUserName"
                className="w-full"
                value={inputs.refUserName}
                required
                onChange={handleInput}
              />
              <label htmlFor="refUserName">User Name</label>
            </FloatLabel>
          </div>
          <div className="w-full">
            <FloatLabel className="w-full">
              <InputText
                id="refUserMail"
                className="w-full"
                required
                value={inputs.refUserMail}
                onChange={handleInput}
              />
              <label htmlFor="refUserMail">Your Email</label>
            </FloatLabel>
          </div>
          <div className="w-full">
            <FloatLabel className="w-full">
              <InputNumber
                id="refUserMobile"
                className="w-full"
                useGrouping={false}
                required
                value={inputs.refUserMobile}
                onChange={(e) => handleNumberInput("refUserMobile", e.value)}
              />

              <label htmlFor="refUserMobile">Your Mobile Number</label>
            </FloatLabel>
          </div>
        </div>

        {/* Second Row */}
        <div className="pt-4 flex flex-col md:flex-col lg:flex-row gap-4">
          <div className="w-full">
            <FloatLabel className="w-full">
              <InputText
                id="refAddress"
                className="w-full"
                required
                value={inputs.refAddress}
                onChange={handleInput}
              />
              <label htmlFor="refAddress">Your Address</label>
            </FloatLabel>
          </div>
          <div className="w-full">
            <FloatLabel className="w-full">
              <InputText
                id="refDoorNumber"
                className="w-full"
                required
                value={inputs.refDoorNumber}
                onChange={handleInput}
              />
              <label htmlFor="refDoorNumber">Door Number</label>
            </FloatLabel>
          </div>
          <div className="w-full">
            <FloatLabel className="w-full">
              <InputText
                id="refStreet"
                className="w-full"
                required
                value={inputs.refStreet}
                onChange={handleInput}
              />
              <label htmlFor="refStreet">Street</label>
            </FloatLabel>
          </div>
        </div>
        <div className="pt-4 flex flex-col md:flex-col lg:flex-row gap-4">
          <div className="w-full">
            <FloatLabel className="w-full">
              <InputText
                id="refArea"
                className="w-full"
                required
                value={inputs.refArea}
                onChange={handleInput}
              />
              <label htmlFor="refArea">Your Area</label>
            </FloatLabel>
          </div>
          <div className="w-full">
            <FloatLabel className="w-full">
              <InputText
                id="refcountry"
                className="w-full"
                required
                value={inputs.refcountry}
                onChange={handleInput}
              />
              <label htmlFor="refcountry">Country</label>
            </FloatLabel>
          </div>
        </div>
        <div className="w-[100%] md:p-4 pt-2">
          <h2 className="">Upload License</h2>
          <FileUpload
            name="logo"
            customUpload
            className="mt-3"
            uploadHandler={LicenseUploader}
            accept="application/pdf"
            maxFileSize={10000000}
            emptyTemplate={
              <p className="m-0">Drag and drop your Pdf here to upload.</p>
            }
            multiple
          />
        </div>
        <div className="w-[100%] md:p-4 pt-2">
          <h2 className="">Upload Passport</h2>
          <FileUpload
            name="logo"
            customUpload
            className="mt-3"
            uploadHandler={profile}
            accept="image/*"
            maxFileSize={10000000}
            emptyTemplate={
              <p className="m-0">Drag and drop your image here to upload.</p>
            }
            multiple
          />
        </div>
        {/* Submit Button */}
        <div className="pt-6 flex justify-center">
          <Button
            severity="success"
            className="w-[100%] sm:w-1/2 lg:w-1/5"
            label="Submit"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
