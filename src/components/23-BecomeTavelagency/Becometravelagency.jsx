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
    const to = "info@zuercar.ch";
    const subject = encodeURIComponent("New Travel Partner Registration");
    const body = encodeURIComponent(
      `=== TRAVEL PARTNER REGISTRATION APPLICATION ===\n\n` +
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Become a Travel Partner with <span className="text-red-500">Züri</span>Car GO
          </h1>
          <p className="text-xl md:text-2xl mb-4">Join ZüriCar GO Travel Partner Network</p>
          <p className="text-lg md:text-xl opacity-90">
            Expanding global travel partner network across Switzerland and Sri Lanka
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Information Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Become a Travel Partner with <span className="text-red-500">Züri</span>Car GO
          </h2>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            <span className="font-semibold text-red-500">Züri</span><span className="font-semibold">Car GO</span> is expanding its <span className="font-semibold">global travel partner network</span> with a special focus on <span className="font-semibold">inbound and outbound travel agencies in Switzerland and Sri Lanka</span>.
          </p>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            We invite travel agencies, tour operators, and independent travel consultants to collaborate with us to offer <span className="font-semibold">airport transfers, car rentals, and complete travel solutions</span> for customers traveling to and from <span className="font-semibold">Switzerland and Sri Lanka</span>.
          </p>

          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            You can work <span className="font-semibold">under your own company name</span> or use the <span className="font-semibold text-red-500">Züri</span><span className="font-semibold">Car GO brand</span>, depending on our partnership agreement.
          </p>

          {/* Who Can Join and We Offer in Two Columns */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Who Can Join */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Who can join:</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-700 text-base">Inbound or outbound travel agencies in Switzerland and Sri Lanka</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-700 text-base">International travel partners looking to cooperate with our network</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-700 text-base">Tour operators and independent consultants</span>
                </li>
              </ul>
            </div>

            {/* We Offer */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">We offer:</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-700 text-base">Reliable airport and city transfers in both countries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-700 text-base">Competitive commission structure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-700 text-base">Partnership flexibility (B2B or referral)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 text-xl font-bold">•</span>
                  <span className="text-gray-700 text-base">Multilingual customer support (English, German, Tamil, Sinhala)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
            <p className="text-gray-900 text-lg font-semibold mb-2">
              Join the <span className="text-red-500">Züri</span><span className="font-semibold">Car GO Travel Partner Network</span> today!
            </p>
            <p className="text-gray-700">
              Send your details to <a href="mailto:info@zuercar.ch" className="text-blue-600 font-semibold hover:underline">info@zuercar.ch</a> or complete the registration form below.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white border-t-4 border-blue-600 shadow-xl rounded-lg p-8 md:p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Become a Partner
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
                placeholder="Tell us about your travel agency..."
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
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  padding: "12px 32px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}   
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1e40af")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>

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