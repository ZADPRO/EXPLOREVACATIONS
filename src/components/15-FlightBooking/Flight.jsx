import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/saga-blue/theme.css"; // or your theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { useTranslation } from "react-i18next";
import Popup from "../../pages/Popup/Popup";
import Axios from "axios";
import decrypt from "../../helper";

import { Toast } from "primereact/toast";
import { useRef } from "react";

export default function Flight() {
  const getFlag = () => {
    switch (language) {
      case "en":
        return flagEN;
      case "de":
        return flagDE;
      default:
        return flagEN;
    }
  };

  const { t, i18n } = useTranslation("global");

  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  const [pickup, setPickup] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [mobile, setMobile] = useState("");
  const [destination, setDestination] = useState("");
  const [requirements, setRequirements] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const toast = useRef(null);

  const handleSubmit = async () => {
    try {
      const response = await Axios.post(
        import.meta.env.VITE_API_URL + "/flightRoutes/flightBooking",
        {
          refUserName: fname,
          refMoblile: mobile,
          refEmail: email,
          refPickup: pickup,
          refDestination: destination,
          refRequirements: requirements,
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
      console.log("data list tour data ======= ?", data);
      if (data.success) {
        localStorage.setItem("token", "Bearer " + data.token);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Submitted Successfully ",
          life: 3000,
        });
        setFname("");
        setMobile("");
        setEmail("");
        setPickup("");
        setDestination("");
        setRequirements("");
        showSuccess();
      } else {
        toast.current.show({
          severity: "error",
          summary: "error",
          detail: " Already exists",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div>
      <Popup />
      <Toast ref={toast} />
      <div className="flightPage001">
        <div className="h-[80vh]"></div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-6 bg-gray-100">
        {/* Left Side: Contact Info */}
        <div className="flex-1 p-8 bg-white rounded-lg" data-aos="fade-right">
          <h2 className="text-3xl font-bold text-[#326fd1] mb-4">
            {t("flight.Details")}
          </h2>
          <p className="text-[##626264]">{t("flight.quotes")} </p>
          <div className="mt-6 space-y-3">
            <p className="text-lg">
              📧 <span className="font-semibold">{t("contact.Email")}:</span>{" "}
              info@explorevacations.com
            </p>
            <p className="text-lg">
              📞 <span className="font-semibold">{t("contact.Phone")}:</span> (+
              41) 44 442 30 35
            </p>
            <p className="text-lg">
              📍 <span className="font-semibold">{t("contact.Address")}:</span>{" "}
              Oberfeldstrasse 10, 8302 Kloten, Switzerland
            </p>
          </div>
        </div>

        <div className="fixed text-5xl bottom-6 right-6 z-50">
          <Button
            icon="pi pi-whatsapp"
            className="p-button-rounded p-button-success p-button-lg"
            onClick={() => window.open("https://wa.me/+41764959010", "_blank")}
            style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
          />
        </div>
        <div className="fixed text-5xl bottom-20  right-6 z-50">
          <Button
            icon="pi pi-phone"
            className="p-button-rounded p-button-warning p-button-lg text-white"
            onClick={() => window.open("tel:+41 44 442 30 35")}
            style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
          />
        </div>

        {/* Right Side: Contact Form */}
        <div
          className="flex-1 md:p-1 lg:p-5 p-2 bg-white rounded-lg ml-0 md:ml-10 mt-6 md:mt-0"
          data-aos="fade-right"
        >
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            {t("flight.Fill")}
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="space-y-6">
              {/* Name */}
              <div className="p-float-label">
                <InputText
                  id="fname"
                  name="fname"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  className="w-full p-3 border rounded"
                  required
                />
                <label htmlFor="name">{t("contact.Your Name")}</label>
              </div>
              {/* Mobile */}
              <div className="p-float-label">
                <InputText
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full p-3 border rounded"
                  required
                />
                <label htmlFor="mobile">{t("contact.Mobile Number")}</label>
              </div>

              {/* Email */}
              <div className="p-float-label">
                <InputText
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border rounded"
                  required
                />
                <label htmlFor="email">{t("flight.Email")}</label>
              </div>

              {/* Pickup Address */}
              <div className="p-float-label">
                <InputTextarea
                  id="pickup"
                  name="pickup"
                  rows={4}
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full p-3 border rounded"
                  required
                />
                <label htmlFor="message">{t("flight.Pickup")}</label>
              </div>
              {/* Destination */}
              <div className="p-float-label">
                <InputTextarea
                  id="destination"
                  name="destination"
                  rows={2}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-3 border rounded"
                  required
                />
                <label htmlFor="message">{t("flight.Destination")}</label>
              </div>

              {/* User Message */}
              <div className="p-float-label">
                <InputTextarea
                  id="requirements"
                  name="requirements"
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="w-full p-3 border rounded"
                  required
                />
                <label htmlFor="message">{t("flight.Requirements")}</label>
              </div>

              {/* Submit Button */}
              <Button
                label={t("contact.Submit")}
                className="w-full p-3 font-bold rounded"
                type="submit"
              />
            </div>
          </form>
        </div>

        {/* Success Dialog */}
        <Dialog
          visible={dialogVisible}
          onHide={() => setDialogVisible(false)}
          header="Success"
          className="p-dialog-custom"
        >
          <p className="text-lg text-green-600 font-semibold">
            {t("contact.Form submitted successfully!")}
          </p>
        </Dialog>
      </div>
    </div>
  );
}
