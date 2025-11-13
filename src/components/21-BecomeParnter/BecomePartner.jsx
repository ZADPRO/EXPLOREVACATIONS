import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function BecomePartner() {
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

  const [dialogVisible, setDialogVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckbox = (e) => {
    setFormData({ ...formData, hasVehicle: e.checked });
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
        <div className="absolute  inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 opacity-20 "
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">License Partner Model</h1>
          <p className="text-xl md:text-2xl mb-4">Join ZüriCar GO Driver Network</p>
          <p className="text-lg md:text-xl opacity-90">
            Professional drivers wanted across Switzerland
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">


          {/* Your Benefits Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Your Benefits</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                <span className="text-gray-700 text-base">Collaboration with an established Swiss brand</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                <span className="text-gray-700 text-base">Dedicated partner page on our platform</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                <span className="text-gray-700 text-base">Access to central booking and payment systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                <span className="text-gray-700 text-base">Joint marketing campaigns</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                <span className="text-gray-700 text-base">Training, support, and continuous assistance from our team</span>
              </li>
            </ul>
          </div>

          {/* License Partner Model Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">ZüriCar GO License Partner Model</h3>
            <p className="text-gray-700 text-base mb-3 leading-relaxed">
              You use our booking platform, marketing tools, and network while continuing to operate under your own company name.
            </p>
            <p className="text-gray-700 text-base mb-3 leading-relaxed">
              Depending on the <span className="font-semibold">contractual agreement</span>, you can use <span className="font-semibold">your own brand name</span>, the <span className="font-semibold text-blue-600">ZüriCar GO brand</span>, or both together.
            </p>
            <p className="text-gray-700 text-base mb-3 leading-relaxed">
              We provide you with systems, know-how, and professional guidance to ensure sustainable success.
            </p>
          </div>

          {/* How It Works Section */}
          <div className="mb-5">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">How It Works</h3>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 text-lg font-bold">1.</span>
                <span className="text-gray-700 text-base">Fill out the partnership request form</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 text-lg font-bold">2.</span>
                <span className="text-gray-700 text-base">We review your profile and potential</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 text-lg font-bold">3.</span>
                <span className="text-gray-700 text-base">If suitable, we schedule a personal meeting</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 text-lg font-bold">4.</span>
                <span className="text-gray-700 text-base">Sign the agreement and start as an official partner</span>
              </li>
            </ol>
          </div>

          {/* Apply Now Section */}
          {/* Call to Action */}
         <div
  style={{
    backgroundColor: "#EFF6FF", // light blue background
    borderLeft: "4px solid #2563EB", // blue accent line
    padding: "24px",
    borderRadius: "10px",
    marginBottom: "30px",
  }}
>
  <p
    style={{
      color: "#374151", // gray-700
      marginBottom: "12px",
      lineHeight: "1.6",
    }}
  >
    Apply Now{" "}
    <a
      href="mailto:info@zuricar.ch"
      style={{
        color: "#2563EB",
        fontWeight: "600",
        textDecoration: "none",
      }}
      onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
      onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
    >
      <br />
      Interested?
    </a>
  </p>

  <p
    style={{
      color: "#111827", // dark gray
      fontSize: "18px",
      margin: 0,
      lineHeight: "1.6",
    }}
  >
    Apply now to become a licensed partner and join the growing{" "}
    <span
      style={{
        color: "#2563EB",
        fontSize: "20px",
        fontWeight: "bold",
      }}
    >
      ZüriCar GO
    </span>{" "}
    network across Switzerland.
  </p>
</div>


        {/* Form Section */}
        <div className="bg-white border-t-4 border-blue-600 shadow-xl rounded-lg p-8 md:p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
           License Partner Model
          </h2>

          <div className="space-y-6">
            {/* Row 1: Name and Company Name */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
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
                  Company name
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
                  Surname
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
                  Company City
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
                  E-mail address
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
                  Company Address
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
                  Phone Number
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
                  Web site
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
                Your message
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
    onClick={handleSubmit}/>
</div>

            </div>
          </div>
        </div>


      {/* Floating Action Buttons */}
      {/* <div className="fixed bottom-6 right-6 z-50 space-y-3">
        <Button
          icon="pi pi-whatsapp"
          className="p-button-rounded p-button-success p-button-lg block shadow-lg"
          onClick={() => window.open("https://wa.me/+41764959010", "_blank")}
          tooltip="WhatsApp"
          tooltipOptions={{ position: 'left' }}
        />
        <Button
          icon="pi pi-phone"
          className="p-button-rounded p-button-warning p-button-lg text-white block shadow-lg"
          onClick={() => window.open("tel:+41797669960")}
          tooltip="Call Us"
          tooltipOptions={{ position: 'left' }}
        />
      </div> */}

      {/* Success Dialog */}
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
            Thank you for your interest!
          </p>
          <p className="text-gray-600">
            Your application has been sent to ZüriCar GO. We will contact you soon.
          </p>
        </div>
      </Dialog>
    </div>
  );
}