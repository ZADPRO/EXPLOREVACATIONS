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
export default function Contact() {
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [messageType, setMessageType] = useState("tour");

  const suggestionOptions = ["tour", "car", "parking", "travel"];

  const handleClick = (e) => {
    e.preventDefault();
    const to = "info@züricar.ch";
    const subject = encodeURIComponent("Tour Booking Feedback");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nSelected Type: ${messageType}\nMessage:\n${description}\n\nBest regards,\n${name}`
    );

    const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const [dialogVisible, setDialogVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDialogVisible(true);
  };

  return (
    <div>
      <Popup />
      <div className="contactPage001">
        <div className="h-[80vh]"></div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-6 bg-gray-100">
        {/* Left Side: Contact Info */}
        <div className="flex-1 p-8 bg-white rounded-lg" data-aos="fade-right">
          <h2 className="testingFont text-3xl text-[#016093] mb-4">
            {t("contact.quotes")}
          </h2>
          <h2 className="text-3xl font-bold text-[#016093] mb-4">
            {t("contact.Get In Touch")}
          </h2>
          <p className="text-gray-600">
            {t("contact.We’d love to hear from you! Contact us today.")}{" "}
          </p>
          <div className="mt-6 space-y-3">
            <p className="text-lg">
              📧 <span className="font-semibold">{t("contact.Email")}:</span>{" "}
               info@zuricar.ch
            </p>
            <p className="text-lg">
              📞 <span className="font-semibold">{t("contact.Phone")}:</span> +41 79 766 99 60
            </p>
            <p className="text-lg">
              📍 <span className="font-semibold">{t("contact.Address")}:</span>{" "}
              Oberfeldstrasse 6
              CH-8306 Kloten
              Switzerland
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
            onClick={() => window.open("tel:+41 79 766 99 60")}
            style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
          />
        </div>

        {/* Right Side: Contact Form */}
        <div
          className="flex-1 md:p-1 lg:p-5 p-2 bg-white rounded-lg ml-0 md:ml-10 mt-6 md:mt-0"
          data-aos="fade-right"
        >
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            {t("contact.Send a Message")}
          </h2>

          <div className="space-y-6">
            {/* Name */}
            <div className="p-float-label">
              <InputText
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded"
                required
              />
              <label htmlFor="name">{t("contact.Your Name")}</label>
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
              <label htmlFor="email">{t("contact.Email Address")}</label>
            </div>

            {/* Mobile */}
            <div className="p-float-label">
              <InputText
                id="mobile"
                name="mobile"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border rounded"
                required
              />
              <label htmlFor="mobile">{t("contact.Mobile Number")}</label>
            </div>

            {/* Message */}
            {/* <div className="p-float-label">
              <InputTextarea
                id="message"
                name="message"
                rows={4}
                phone
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border rounded"
                required
              />
              <label htmlFor="message">Your Message</label>
            </div> */}
            {/* Message Type Selection */}
            <div className="p-float-label mb-4">
              <select
                id="messageType"
                name="messageType"
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                className="w-full p-3 border rounded text-gray-700"
              >
                <option value="tour">{t("contact.Tour")}</option>
                <option value="car">{t("contact.Car")}</option>
                <option value="parking">{t("contact.Parking")}</option>
                <option value="travel">{t("contact.Travel")}</option>
              </select>

              <p className="p-2 text-[#204887] italic font-semibold">
                {t("contact.Selected Category")}: <strong>{messageType}</strong>
              </p>
            </div>

            {/* User Message */}
            <div className="p-float-label">
              <InputTextarea
                id="message"
                name="message"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border rounded"
                required
              />
              <label htmlFor="message">{t("contact.Your Message")}</label>
            </div>

            {/* Submit Button */}
            <Button
              label={t("contact.Submit")}
              onClick={handleClick}
              className="w-full p-3 font-bold rounded"
              type="submit"
            />
          </div>
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
