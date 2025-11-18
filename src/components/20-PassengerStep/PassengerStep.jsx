import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import './PassengerStep.css';

// Sample countries list
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
  const [mobile, setMobile] = useState(bookingData.passenger.mobile || '');
  const [emailNotifications, setEmailNotifications] = useState(bookingData.passenger.emailNotifications !== false);
  const [smsNotifications, setSmsNotifications] = useState(bookingData.passenger.smsNotifications || false);
  const [meetGreet, setMeetGreet] = useState(bookingData.passenger.meetGreet || '');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
        {/* Toast Notification */}
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

        <h2>Lead passenger</h2>
        
        <div className="form-row">
          <div className="form-group">
            <h3>First name</h3>
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
                This field is required
              </span>
            )}
          </div>
          <div className="form-group">
            <h3>Last name</h3>
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
                This field is required
              </span>
            )}
          </div>
        </div>

        <div className="form-group">
          <h3>Email address</h3>
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
              Please enter a valid email address
            </span>
          )}
          <p className="form-hint">
            <span className="form-hint-icon">i</span>
            We'll send your booking voucher here.
          </p>
        </div>

        <div className="form-group">
          <h3>Mobile number</h3>
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
              Please enter a valid mobile number
            </span>
          )}
          <p className="form-hint">
            <span className="form-hint-icon">i</span>
            Please provide a contact number so our driver can reach the passenger if needed
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
                  Email & App notifications
                </span>
                <span className="notification-badge free">✓ Free</span>
              </div>
              <p className="notification-text">
                Driver details sent 6 hours before pickup via email and App push notification. 
                <span className="info-icon" style={{ display: 'inline-flex', marginLeft: '4px', width: '14px', height: '14px', fontSize: '10px' }}>i</span>
              </p>
            </div>
          </div>
        </div>

        {/* <div className="notification-card yellow">
          <div className="notification-content">
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={(e) => setSmsNotifications(e.target.checked)}
              className="notification-checkbox yellow"
            />
            <div className="notification-details">
              <div className="notification-header">
                <span className="notification-title">
                  <svg className="notification-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  SMS/Whatsapp notifications
                </span>
                <span className="notification-badge paid">€ 1.49</span>
              </div>
              <p className="notification-text">
                Get driver's details 6 hours before pickup via text message on your mobile phone and whatsapp. Price each way
              </p>
            </div>
          </div>
        </div> */}

        <div className="info-banner">
          <span className="banner-icon">⚠</span>
          <div className="banner-text">
            Please note that <strong>Meet & Greet service is not guaranteed at this location</strong> and may be unavailable due to logistical reasons or force majeure. If unavailable, pickup will take place curbside outside the terminal. <strong>The local provider will send clear instructions to ensure a smooth experience.</strong>
          </div>
        </div>

        <div className="meetgreet-section">
          <h3>Meet & Greet</h3>
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
              Meet & Greet with a sign–enter the name to display.
            </p>
          </div>
        </div>

        <div className="button-group">
          <button onClick={onBack} className="btn-back">
            ← Back
          </button>
          <button onClick={handleContinue} className="btn btn-primary">
            Continue
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