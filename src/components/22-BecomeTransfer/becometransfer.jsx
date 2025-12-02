import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useTranslation } from "react-i18next";
export default function BecomeTransfer() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    companyName: "",
    companyCity: "",
    companyAddress: "",
    website: "",
    message: "",
    hasVehicle: false,
    licenseType: "",
    experience: ""
  });
  const { t } = useTranslation("global");
  const [dialogVisible, setDialogVisible] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
   const handleSubmit = () => {
    const to = "info@zuricar.ch";
    const subject = encodeURIComponent("New Partner Driver Registration");
    const body = encodeURIComponent(
      `=== DRIVER REGISTRATION APPLICATION ===\n\n` +
      `PERSONAL INFORMATION:\n` +
      `Name: ${formData.name}\n` +
      `Surname: ${formData.surname}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n\n` +
      `COMPANY INFORMATION:\n` +
      `Company Name: ${formData.companyName || "N/A"}\n` +
      `Company City: ${formData.companyCity || "N/A"}\n` +
      `Company Address: ${formData.companyAddress || "N/A"}\n` +
      `Website: ${formData.website || "N/A"}\n\n` +
      `DRIVER DETAILS:\n` +
      `Has Own Vehicle: ${formData.hasVehicle ? "Yes" : "No"}\n` +
      `License Type: ${formData.licenseType}\n` +
      `Years of Experience: ${formData.experience}\n\n` +
      `MESSAGE:\n${formData.message}\n\n` +
      `Best regards,\n${formData.name} ${formData.surname}`
    );

    const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    setDialogVisible(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative mt-20 h-[70vh] bg-gradient-to-r from-blue-900 to-indigo-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">License Partner Model</h1>
          <p className="text-xl md:text-2xl mb-4">Join ZüriCar GO Driver Partner</p>
          <p className="text-lg md:text-xl opacity-90">
            {t("transfer.ideal candidates for becoming ZüriCar GO License Partners.")}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Information Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-5">
            {t("transfer.Join Our Transfer Driver Network")}
          </h2>

          <p className="text-lg text-gray-700 mb-3 leading-relaxed">
            {t("transfer.Are you a professional driver looking for transfer opportunities across Switzerland?")}
            <span className="font-semibold text-blue-600"> ZüriCar GO</span> {t("transfer.is expanding its nationwide driver network for airport and city transfers.")}
          </p>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {t("transfer.Whether you are an independent driver or operate your own small team, you can now work ")}
            {t("transfer.with")} <span className="font-semibold text-blue-600">ZüriCar GO</span> {t("transfer.and receive regular transfer bookings from all over Switzerland.")}
          </p>

          {/* Requirements and Offers in Two Columns */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Requirements */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("transfer.Requirements:")}</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-700 text-base">{t("transfer.Valid Swiss driving license (Category B / B121 or higher)")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-700 text-base">{t("transfer.Clean driving record")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-700 text-base">{t("transfer.Excellent knowledge of Swiss roads and customer service attitude")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-700 text-base">{t("transfer.Own vehicle (optional – we also provide fleet options)")}</span>
                </li>
              </ul>
            </div>

            {/* We Offer */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("travelag.We offer:")}</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-700 text-base">{t("transfer.Regular transfer bookings through our system")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-700 text-base">{t("transfer.Competitive earnings")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-700 text-base">{t("transfer.Flexible working hours")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-700 text-base">{t("transfer.Cooperation possibilities in all Swiss regions")}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
            <p className="text-gray-900 text-lg font-semibold mb-2">
              {t("transfer.Register now and become part of the")} <span className="text-blue-600">ZüriCar GO</span> {t("transfer.Transfer Driver Network!")}
            </p>
            <p className="text-gray-700">
              {t("transfer.Send your application to")} <a href="mailto:info@zuricar.ch" className="text-blue-600 font-semibold hover:underline">info@zuricar.ch</a> {t("transfer.or fill out the registration form below.")}
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white border-t-4 border-blue-600 shadow-xl rounded-lg p-8 md:p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            {t("travelag.Become a Partner")}
          </h2>

          <div className="space-y-6">
            {/* Row 1: Name and Company Name */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("travelag.Name")}
                </label>
                <InputText
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("travelag.Company name")}
                </label>
                <InputText
                  id="companyName"
                  name="companyName"
                  placeholder="Company name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Row 2: Surname and Company City */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="surname" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("travelag.Surname")}
                </label>
                <InputText
                  id="surname"
                  name="surname"
                  placeholder="Your Surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="companyCity" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("travelag.Company City")}
                </label>
                <InputText
                  id="companyCity"
                  name="companyCity"
                  placeholder="City"
                  value={formData.companyCity}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Row 3: Email and Company Address */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("travelag.E-mail address")}
                </label>
                <InputText
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="companyAddress" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("travelag.Company Address")}
                </label>
                <InputText
                  id="companyAddress"
                  name="companyAddress"
                  placeholder="Address"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Row 4: Phone Number and Website */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("travelag.Phone Number")}
                </label>
                <InputText
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+41"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("travelag.Web site")}
                </label>
                <InputText
                  id="website"
                  name="website"
                  placeholder="Web site"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                {t("travelag.Your message")}
              </label>
              <InputTextarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us about your experience..."
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                label="Get Started"
                icon="pi pi-send"
                style={{
                  backgroundColor: "#2563eb", // blue
                  color: "#fff",              // white text
                  padding: "12px 32px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1e40af")} // darker blue on hover
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}  // revert on mouse out
                onClick={handleSubmit} />
            </div>

          </div>
        </div>
      </div>
      <Dialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        header="Application Submitted"
        className="p-dialog-custom"
        style={{ width: '450px' }}
      >
        <div className="text-center p-6">
          <i className="pi pi-check-circle text-green-500 text-6xl mb-4"></i>
          <p className="text-xl text-gray-900 font-semibold mb-3">
            {t("travelag.Thank you for your interest!")}
          </p>
          <p className="text-gray-600">
            {t("travelag.Your application has been sent to ZüriCar GO. We will contact you soon.")}
          </p>
        </div>
      </Dialog>
    </div>
  );
}