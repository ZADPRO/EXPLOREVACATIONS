import React, { useState } from 'react';
import { ChevronDown, Clock, MapPin, Calendar, Users } from 'lucide-react';
import './BookingForm.css';

const BookingForm = () => {
  const [bookingType, setBookingType] = useState('transfer');
  const [showReturn, setShowReturn] = useState(false);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    pickupDate: '',
    pickupTime: '01:45 PM',
    returnDate: '',
    returnTime: '01:45 PM',
    passengers: 2,
    duration: '2'
  });
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeTimeField, setActiveTimeField] = useState(null);
  const [activeDateField, setActiveDateField] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectedHour, setSelectedHour] = useState('01');
  const [selectedMinute, setSelectedMinute] = useState('45');
  const [selectedPeriod, setSelectedPeriod] = useState('PM');
  const [timeFormat, setTimeFormat] = useState('12h');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const hours12 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const hours24 = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  const minutes = ['00', '15', '30', '45'];
  const durations = ['2', '4', '6', '8', '10', '12', '24'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const openTimePicker = (field) => {
    setActiveTimeField(field);
    const currentTime = formData[field];
    if (currentTime) {
      const parts = currentTime.split(' ');
      const [hour, minute] = parts[0].split(':');
      setSelectedHour(hour);
      setSelectedMinute(minute);
      setSelectedPeriod(parts[1] || 'PM');
    }
    setShowTimePicker(true);
  };

  const openCalendar = (field) => {
    setActiveDateField(field);
    setShowCalendar(true);
  };

  const saveTime = () => {
    const timeString = timeFormat === '12h' 
      ? `${selectedHour}:${selectedMinute} ${selectedPeriod}`
      : `${selectedHour}:${selectedMinute}`;
    handleInputChange(activeTimeField, timeString);
    setShowTimePicker(false);
  };

  const selectDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    handleInputChange(activeDateField, formattedDate);
    setShowCalendar(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (bookingType === 'transfer') {
      if (!formData.from) newErrors.from = 'Pickup location is required';
      if (!formData.to) newErrors.to = 'Drop-off location is required';
      if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
      if (showReturn && !formData.returnDate) newErrors.returnDate = 'Return date is required';
    } else {
      if (!formData.from) newErrors.from = 'Pickup location is required';
      if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSeePrices = () => {
    if (validateForm()) {
      alert('Form is valid! Proceeding to prices...');
    }
  };

  const incrementValue = (type) => {
    if (type === 'hour') {
      const hours = timeFormat === '12h' ? hours12 : hours24;
      const idx = hours.indexOf(selectedHour);
      setSelectedHour(hours[idx < hours.length - 1 ? idx + 1 : 0]);
    } else if (type === 'minute') {
      const idx = minutes.indexOf(selectedMinute);
      setSelectedMinute(minutes[idx < minutes.length - 1 ? idx + 1 : 0]);
    }
  };

  const decrementValue = (type) => {
    if (type === 'hour') {
      const hours = timeFormat === '12h' ? hours12 : hours24;
      const idx = hours.indexOf(selectedHour);
      setSelectedHour(hours[idx > 0 ? idx - 1 : hours.length - 1]);
    } else if (type === 'minute') {
      const idx = minutes.indexOf(selectedMinute);
      setSelectedMinute(minutes[idx > 0 ? idx - 1 : minutes.length - 1]);
    }
  };

  const togglePeriod = () => {
    setSelectedPeriod(prev => prev === 'AM' ? 'PM' : 'AM');
  };

  const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00'); // Add time to prevent timezone issues
  return date.toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
};

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day disabled"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = formData[activeDateField] === date.toISOString().split('T')[0];
      const isPast = date < today && !isToday;
      
      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${isPast ? 'disabled' : ''}`}
          onClick={() => !isPast && selectDate(date)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  return (
    <div className="booking-container">
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', textAlign: 'center', marginBottom: '32px' }}>
        Your Reliable Worldwide<br />Airport Transfers
      </h1>

      <div className="booking-grid">
        <div className="booking-form-wrapper">
          <div className="booking-tabs">
            <button
              className={`booking-tab ${bookingType === 'transfer' ? 'active' : ''}`}
              onClick={() => { setBookingType('transfer'); setShowReturn(false); }}
            >
              Transfer
            </button>
            <button
              className={`booking-tab ${bookingType === 'hourly' ? 'active' : ''}`}
              onClick={() => setBookingType('hourly')}
            >
              <Clock style={{ width: '18px', height: '18px' }} />
              By the Hour
            </button>
          </div>

          {bookingType === 'transfer' && (
            <div>
              <div className="form-group">
                <label className="form-label">From</label>
                <div className="input-wrapper">
                  <MapPin className="input-icon" />
                  <input
                    type="text"
                    placeholder="Address, airport, hotel, ..."
                    value={formData.from}
                    onChange={(e) => handleInputChange('from', e.target.value)}
                    className={`form-input ${errors.from ? 'error' : ''}`}
                  />
                </div>
                {errors.from && <p className="error-message">{errors.from}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">To</label>
                <div className="input-wrapper">
                  <MapPin className="input-icon" />
                  <input
                    type="text"
                    placeholder="Address, airport, hotel, ..."
                    value={formData.to}
                    onChange={(e) => handleInputChange('to', e.target.value)}
                    className={`form-input ${errors.to ? 'error' : ''}`}
                  />
                </div>
                {errors.to && <p className="error-message">{errors.to}</p>}
              </div>

              <div className="date-time-grid">
                <div className="form-group">
                  <label className="form-label">Pickup date</label>
                  <div className="input-wrapper">
                    <Calendar className="input-icon" />
                    <input
                      type="text"
                      value={formatDate(formData.pickupDate)}
                      onClick={() => openCalendar('pickupDate')}
                      readOnly
                      placeholder="Select date"
                      className={`form-input ${errors.pickupDate ? 'error' : ''}`}
                      style={{ cursor: 'pointer' }}
                    />
                    {showCalendar && activeDateField === 'pickupDate' && (
                      <div className="calendar-picker">
                        <div className="calendar-header">
                          <button className="calendar-nav-btn" onClick={() => navigateMonth(-1)}>
                            <ChevronDown style={{ transform: 'rotate(90deg)', width: '20px', height: '20px' }} />
                          </button>
                          <div className="calendar-month">
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </div>
                          <button className="calendar-nav-btn" onClick={() => navigateMonth(1)}>
                            <ChevronDown style={{ transform: 'rotate(-90deg)', width: '20px', height: '20px' }} />
                          </button>
                        </div>
                        <div className="calendar-grid">
                          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                            <div key={day} className="calendar-day-header">{day}</div>
                          ))}
                          {renderCalendar()}
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.pickupDate && <p className="error-message">{errors.pickupDate}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Pickup time</label>
                  <div className="input-wrapper">
                    <Clock className="input-icon" />
                    <input
                      type="text"
                      value={formData.pickupTime}
                      onClick={() => openTimePicker('pickupTime')}
                      readOnly
                      className="form-input"
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>

              {!showReturn && (
                <button 
                  className="add-return-btn"
                  onClick={() => setShowReturn(true)}
                >
                  ADD RETURN
                </button>
              )}

              {showReturn && (
                <div className="return-section">
                  <div className="return-header">
                    <h3 className="return-title">Return Trip</h3>
                    <button
                      className="remove-return-btn"
                      onClick={() => { 
                        setShowReturn(false); 
                        handleInputChange('returnDate', ''); 
                        handleInputChange('returnTime', '01:45 PM'); 
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="date-time-grid">
                    <div className="form-group">
                      <label className="form-label">Return date</label>
                      <div className="input-wrapper">
                        <Calendar className="input-icon" />
                        <input
                          type="text"
                          value={formatDate(formData.returnDate)}
                          onClick={() => openCalendar('returnDate')}
                          readOnly
                          placeholder="Select date"
                          className={`form-input ${errors.returnDate ? 'error' : ''}`}
                          style={{ cursor: 'pointer', background: 'white' }}
                        />
                        {showCalendar && activeDateField === 'returnDate' && (
                          <div className="calendar-picker">
                            <div className="calendar-header">
                              <button className="calendar-nav-btn" onClick={() => navigateMonth(-1)}>
                                <ChevronDown style={{ transform: 'rotate(90deg)', width: '20px', height: '20px' }} />
                              </button>
                              <div className="calendar-month">
                                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                              </div>
                              <button className="calendar-nav-btn" onClick={() => navigateMonth(1)}>
                                <ChevronDown style={{ transform: 'rotate(-90deg)', width: '20px', height: '20px' }} />
                              </button>
                            </div>
                            <div className="calendar-grid">
                              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                                <div key={day} className="calendar-day-header">{day}</div>
                              ))}
                              {renderCalendar()}
                            </div>
                          </div>
                        )}
                      </div>
                      {errors.returnDate && <p className="error-message">{errors.returnDate}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Return time</label>
                      <div className="input-wrapper">
                        <Clock className="input-icon" />
                        <input
                          type="text"
                          value={formData.returnTime}
                          onClick={() => openTimePicker('returnTime')}
                          readOnly
                          className="form-input"
                          style={{ cursor: 'pointer', background: 'white' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">
                  <Users style={{ width: '18px', height: '18px', display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
                  Passengers
                </label>
                <div className="passengers-control">
                  <span className="passengers-count">{formData.passengers}</span>
                  <div className="passengers-buttons">
                    <button
                      className="passenger-btn"
                      onClick={() => handleInputChange('passengers', Math.max(1, formData.passengers - 1))}
                    >
                      −
                    </button>
                    <button
                      className="passenger-btn"
                      onClick={() => handleInputChange('passengers', formData.passengers + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {bookingType === 'hourly' && (
            <div>
              <div className="form-group">
                <label className="form-label">From</label>
                <div className="input-wrapper">
                  <MapPin className="input-icon" />
                  <input
                    type="text"
                    placeholder="Address, airport, hotel, ..."
                    value={formData.from}
                    onChange={(e) => handleInputChange('from', e.target.value)}
                    className={`form-input ${errors.from ? 'error' : ''}`}
                  />
                </div>
                {errors.from && <p className="error-message">{errors.from}</p>}
              </div>

              <div className="date-time-grid">
                <div className="form-group">
                  <label className="form-label">Pickup date</label>
                  <div className="input-wrapper">
                    <Calendar className="input-icon" />
                    <input
                      type="text"
                      value={formatDate(formData.pickupDate)}
                      onClick={() => openCalendar('pickupDate')}
                      readOnly
                      placeholder="Select date"
                      className={`form-input ${errors.pickupDate ? 'error' : ''}`}
                      style={{ cursor: 'pointer' }}
                    />
                    {showCalendar && activeDateField === 'pickupDate' && (
                      <div className="calendar-picker">
                        <div className="calendar-header">
                          <button className="calendar-nav-btn" onClick={() => navigateMonth(-1)}>
                            <ChevronDown style={{ transform: 'rotate(90deg)', width: '20px', height: '20px' }} />
                          </button>
                          <div className="calendar-month">
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </div>
                          <button className="calendar-nav-btn" onClick={() => navigateMonth(1)}>
                            <ChevronDown style={{ transform: 'rotate(-90deg)', width: '20px', height: '20px' }} />
                          </button>
                        </div>
                        <div className="calendar-grid">
                          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                            <div key={day} className="calendar-day-header">{day}</div>
                          ))}
                          {renderCalendar()}
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.pickupDate && <p className="error-message">{errors.pickupDate}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Pickup time</label>
                  <div className="input-wrapper">
                    <Clock className="input-icon" />
                    <input
                      type="text"
                      value={formData.pickupTime}
                      onClick={() => openTimePicker('pickupTime')}
                      readOnly
                      className="form-input"
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Clock style={{ width: '18px', height: '18px', display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
                  Duration
                </label>
                <div className="select-wrapper">
                  <select
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="duration-select"
                  >
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration} Hours</option>
                    ))}
                  </select>
                  <ChevronDown className="select-icon" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Users style={{ width: '18px', height: '18px', display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
                  Passengers
                </label>
                <div className="passengers-control">
                  <span className="passengers-count">{formData.passengers}</span>
                  <div className="passengers-buttons">
                    <button
                      className="passenger-btn"
                      onClick={() => handleInputChange('passengers', Math.max(1, formData.passengers - 1))}
                    >
                      −
                    </button>
                    <button
                      className="passenger-btn"
                      onClick={() => handleInputChange('passengers', formData.passengers + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button className="see-prices-btn" onClick={handleSeePrices}>
            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            See prices
          </button>

          <div className="trustpilot-section">
            <span className="trustpilot-rating">EXCELLENT</span>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="star" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="trustpilot-logo">Trustpilot</span>
          </div>
        </div>

        <div className="booking-image">
          <img
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80"
            alt="Premium Transfer Service"
          />
        </div>
      </div>

      {showTimePicker && (
        <div className="time-picker-overlay" onClick={() => setShowTimePicker(false)}>
          <div className="time-picker-modal" onClick={(e) => e.stopPropagation()}>
            <div className="time-format-tabs">
              <button
                className={`time-format-tab ${timeFormat === '24h' ? 'active' : ''}`}
                onClick={() => setTimeFormat('24h')}
              >
                24h
              </button>
              <button
                className={`time-format-tab ${timeFormat === '12h' ? 'active' : ''}`}
                onClick={() => setTimeFormat('12h')}
              >
                12h
              </button>
            </div>

            <div className="time-selectors">
              <div className="time-column">
                <button className="time-arrow" onClick={() => decrementValue('hour')}>
                  <ChevronDown style={{ transform: 'rotate(180deg)', width: '20px', height: '20px' }} />
                </button>
                <div className="time-value">{selectedHour}</div>
                <button className="time-arrow" onClick={() => incrementValue('hour')}>
                  <ChevronDown style={{ width: '20px', height: '20px' }} />
                </button>
              </div>

              <span className="time-separator">:</span>

              <div className="time-column">
                <button className="time-arrow" onClick={() => decrementValue('minute')}>
                  <ChevronDown style={{ transform: 'rotate(180deg)', width: '20px', height: '20px' }} />
                </button>
                <div className="time-value">{selectedMinute}</div>
                <button className="time-arrow" onClick={() => incrementValue('minute')}>
                  <ChevronDown style={{ width: '20px', height: '20px' }} />
                </button>
              </div>

              {timeFormat === '12h' && (
                <div className="time-column">
                  <button className="time-arrow" onClick={togglePeriod}>
                    <ChevronDown style={{ transform: 'rotate(180deg)', width: '20px', height: '20px' }} />
                  </button>
                  <div className="time-value">{selectedPeriod}</div>
                  <button className="time-arrow" onClick={togglePeriod}>
                    <ChevronDown style={{ width: '20px', height: '20px' }} />
                  </button>
                </div>
              )}
            </div>

            <button className="save-time-btn" onClick={saveTime}>
              Save
            </button>
          </div>
        </div>
      )}

      {showCalendar && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'transparent',
            zIndex: 50
          }}
          onClick={() => setShowCalendar(false)}
        />
      )}
    </div>
  );
};

export default BookingForm;