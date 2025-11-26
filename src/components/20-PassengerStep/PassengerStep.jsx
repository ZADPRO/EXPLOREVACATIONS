import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import './PassengerStep.css';
import Axios from "axios";
import decrypt from "../../helper";

import { useTranslation } from "react-i18next";
const countries = [
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+374', name: 'Armenia', flag: '🇦🇲' },
  { code: '+297', name: 'Aruba', flag: '🇦🇼' },
  { code: '+247', name: 'Ascension Island', flag: '🇦🇨' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+43', name: 'Austria', flag: '🇦🇹' },
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' }
];
const PassengerStep = ({ bookingData, updateBookingData, onBack, onContinue }) => {
  const [firstName, setFirstName] = useState(bookingData.passenger.firstName || '');
  const [lastName, setLastName] = useState(bookingData.passenger.lastName || '');
  const [email, setEmail] = useState(bookingData.passenger.email || '');
  const [mobile, setMobile] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(bookingData.passenger.emailNotifications !== false);
  const [smsNotifications, setSmsNotifications] = useState(bookingData.passenger.smsNotifications || false);
  const [meetGreet, setMeetGreet] = useState(bookingData.passenger.meetGreet || '');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const dropdownRef = useRef(null);

  const { t } = useTranslation("global");
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await Axios.get(
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

        if (data.success && data.profileData && data.profileData.length > 0) {
          localStorage.setItem("token", "Bearer " + data.token);

          const profileInfo = data.profileData[0];

          setFirstName(profileInfo.refFName || "");
          setLastName(profileInfo.refLName || "");
          setEmail(profileInfo.refUserEmail || "");
          setMobile(profileInfo.refMoblile || "");
        }
      } catch (error) {
        console.error("Error fetching profile data in PassengerStep:", error);
      }
    };

    fetchProfileData();
  }, []);


  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const validateForm = () => {
    const newErrors = {};
    let errorMessage = '';

    if (!firstName.trim()) {
      newErrors.firstName = true;
      errorMessage = 'First name is required';
    } else if (!lastName.trim()) {
      newErrors.lastName = true;
      errorMessage = 'Last name is required';
    } else if (!email.trim()) {
      newErrors.email = true;
      errorMessage = 'Email address is required';
    } else if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = true;
      errorMessage = 'Please enter a valid email address (e.g., name@example.com)';
    } else if (!mobile.trim()) {
      newErrors.mobile = true;
      errorMessage = 'Mobile number is required';
    } else if (mobile.trim().length < 6) {
      newErrors.mobile = true;
      errorMessage = 'Please enter a valid mobile number';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showToast(errorMessage, 'error');
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (validateForm()) {
      updateBookingData('passenger', {
        firstName,
        lastName,
        email,
        mobile,
        emailNotifications,
        smsNotifications,
        meetGreet,
        countryCode: selectedCountry.code
      });
      showToast('Passenger details saved successfully!', 'success');
      setTimeout(() => {
        onContinue();
      }, 1500);
    }
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.includes(searchQuery)
  );

  return (
    <>
      <div className="passenger-step" style={{ position: 'relative' }}>

        {toast && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 1000,
              background: toast.type === 'success' ? '#10b981' : '#ef4444',
              color: 'white',
              padding: '16px 20px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              minWidth: '300px',
              maxWidth: '500px',
              animation: 'slideIn 0.3s ease-out'
            }}
          >
            {toast.type === 'success' ? (
              <CheckCircle size={24} />
            ) : (
              <XCircle size={24} />
            )}
            <span style={{ flex: 1, fontSize: '14px' }}>{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>
          </div>
        )}

        <h2>{t("passenger.lead_passenger")}</h2>

        <div className="form-row">
          <div className="form-group">
            <h3>{t("passenger.first_name")}</h3>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (errors.firstName) setErrors({ ...errors, firstName: false });
              }}
              className={`form-inpu ${errors.firstName ? 'error' : ''}`}
              style={errors.firstName ? {
                borderColor: '#ef4444',
                borderWidth: '2px',
                outline: 'none'
              } : {}}
            />
            {errors.firstName && (
              <span style={{
                color: '#ef4444',
                fontSize: '12px',
                marginTop: '4px',
                display: 'block'
              }}>
                {t("passenger.last_name_field_required")}
              </span>
            )}
          </div>
          <div className="form-group">
            <h3>{t("passenger.last_name")}</h3>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (errors.lastName) setErrors({ ...errors, lastName: false });
              }}
              className={`form-inpu ${errors.lastName ? 'error' : ''}`}
              style={errors.lastName ? {
                borderColor: '#ef4444',
                borderWidth: '2px',
                outline: 'none'
              } : {}}
            />
            {errors.lastName && (
              <span style={{
                color: '#ef4444',
                fontSize: '12px',
                marginTop: '4px',
                display: 'block'
              }}>
                {t("passenger.last_name_field_required")}
              </span>
            )}
          </div>
        </div>

        <div className="form-group">
          <h3>{t("passenger.email_address")}</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: false });
            }}
            className={`form-inpu ${errors.email ? 'error' : ''}`}
            placeholder="Enter email address"
            style={errors.email ? {
              borderColor: '#ef4444',
              borderWidth: '2px',
              outline: 'none'
            } : {}}
          />
          {errors.email && (
            <span style={{
              color: '#ef4444',
              fontSize: '12px',
              marginTop: '4px',
              display: 'block'
            }}>
              {t("passenger.email_valid_message")}
            </span>
          )}
          <p className="form-hint">
            <span className="form-hint-icon">i</span>
            {t("passenger.email_note")}
          </p>
        </div>

        <div className="form-group">
          <h3>{t("passenger.mobile_number")}</h3>
          <div className="phone-input-wrapper">
            <div className="phone-input-group">
              <div className="country-select-container" ref={dropdownRef}>
                <div
                  className={`country-select-display ${isDropdownOpen ? 'open' : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{selectedCountry.flag}</span>
                  <span>• {selectedCountry.code}</span>
                  <span className="country-select-arrow">▼</span>
                </div>

                {isDropdownOpen && (
                  <div className="country-dropdown">
                    <div className="country-search">
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    {filteredCountries.map((country, index) => (
                      <div
                        key={index}
                        className={`country-option ${selectedCountry.code === country.code ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedCountry(country);
                          setIsDropdownOpen(false);
                          setSearchQuery('');
                        }}
                      >
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                        <span style={{ marginLeft: 'auto', color: '#6b7280' }}>{country.code}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  if (errors.mobile) setErrors({ ...errors, mobile: false });
                }}
                placeholder=""
                className={`form-inpu ${errors.mobile ? 'error' : ''}`}
                style={errors.mobile ? {
                  flex: 1,
                  borderColor: '#ef4444',
                  borderWidth: '2px',
                  outline: 'none'
                } : { flex: 1 }}
              />
            </div>
          </div>
          {errors.mobile && (
            <span style={{
              color: '#ef4444',
              fontSize: '12px',
              marginTop: '4px',
              display: 'block'
            }}>
              {t("passenger.mobile_number_required")}
            </span>
          )}
          <p className="form-hint">
            <span className="form-hint-icon">i</span>
            {t("passenger.mobile_contact_note")}
          </p>
        </div>

        <div className="notification-card green">
          <div className="notification-content">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="notification-checkbox"
            />
            <div className="notification-details">
              <div className="notification-header">
                <span className="notification-title">
                  <svg className="notification-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {t("passenger.email")}
                </span>
                <span className="notification-badge free">✓ Free</span>
              </div>
              <p className="notification-text">
                {t("passenger.driver_details_message")}
              </p>
            </div>
          </div>
        </div>
        <div className="info-banner">
          <span className="banner-icon">⚠</span>
          <div className="banner-text">
            {t("passenger.please_note")} <strong>{t("passenger.meet_greet_not_guaranteed")}</strong> {t("passenger.meet_greet_unavailable_reason")} <strong>{t("passenger.local_provider_instructions")}</strong>
          </div>
        </div>

        <div className="meetgreet-section">
          <h3>{t("passenger.meet_greet")}</h3>
          <div className="meetgreet-content">
            <input
              type="text"
              value={meetGreet}
              onChange={(e) => setMeetGreet(e.target.value)}
              placeholder=""
              className="meetgreet-input"
            />
            <p className="meetgreet-hint">
              <span className="form-hint-icon">i</span>
              {t("passenger.meet_greet_with_sign")}.
            </p>
          </div>
        </div>

        <div className="button-group">
          <button onClick={onBack} className="btn-back">
            ← {t("extras.back")}
          </button>
          <button onClick={handleContinue} className="btn btn-primary">
            {t("car.continue")}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default PassengerStep;