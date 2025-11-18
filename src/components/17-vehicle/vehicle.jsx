import React, { useState, useEffect } from 'react';
import { MapPin, Users, Check, ChevronUp, ChevronDown, Briefcase, Fuel, RefreshCw, Calendar, Clock } from 'lucide-react';
import '../BookingFlow/BookingFlow.css';
import img1 from '../../assets/Home1/2.png';
import img2 from '../../assets/Home1/3.png';
import img3 from '../../assets/Home1/4.png';
import img4 from '../../assets/Home1/p1.jpeg';
import { useTranslation } from "react-i18next";
const VehicleStep = ({ bookingData, updateBookingData, onContinue }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(bookingData.selectedVehicle);
  const [vehicles, setVehicles] = useState([]);
  const [showReturnSection, setShowReturnSection] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [returnDate, setReturnDate] = useState(new Date());
  const [returnTime, setReturnTime] = useState({ hour: '01', minute: '45', period: 'PM' });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const hours12 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const minutes = ['00', '15', '30', '45'];

  // Re-fetch vehicles when passengers count changes
  useEffect(() => {
    fetchVehicles();
  }, [bookingData.outbound?.passengers]);

  useEffect(() => {
    if (bookingData.return) {
      setShowReturnSection(false);
      setShowCalendar(false);
      setShowTimePicker(false);
    }
  }, [bookingData.return]);

  useEffect(() => {
    if (bookingData.outbound?.date) {
      try {
        const dateStr = bookingData.outbound.date;
        const dateParts = dateStr.split(' ');
        const day = parseInt(dateParts[0]);
        const monthStr = dateParts[1];
        const year = parseInt(dateParts[2]);
        
        const monthMap = {
          'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
          'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };
        
        const pickupDate = new Date(year, monthMap[monthStr], day);
        const nextDay = new Date(pickupDate);
        nextDay.setDate(nextDay.getDate() + 1);
        
        setReturnDate(nextDay);
        setCurrentMonth(nextDay);
      } catch (error) {
        console.error('Error parsing date:', error);
      }
    }
  }, [bookingData.outbound?.date]);
  
  const fetchVehicles = async () => {
    const allVehicles = [
      {
        id: 1,
        type: 'Economy',
        badge: 'BEST VALUE',
        badgeClass: 'badge-best-value',
        capacity: { passengers: 3, bags: 3 },
        description: 'Skoda Octavia, Toyota Prius or similar',
        price: 177.92,
        mileage: '6km/l',
        image: img1
      },
      {
        id: 2,
        type: 'Standard',
        badge: 'MOST POPULAR',
        badgeClass: 'badge-most-popular',
        capacity: { passengers: 3, bags: 3 },
        description: 'Mercedes E Class, Skoda Superb, Cadillac XTS or similar',
        price: 224.16,
        originalPrice: 249.99,
        mileage: '5km/l',
        image: img2
      },
      {
        id: 3,
        type: 'First Class',
        badge: 'TOP CLASS',
        badgeClass: 'badge-top-class',
        capacity: { passengers: 3, bags: 3 },
        description: 'Mercedes S Class, BMW 7, Audi A8, Cadillac Escalade or similar',
        price: 381.25,
        mileage: '4km/l',
        image: img3
      },
      {
        id: 4,
        type: 'Standard Van',
        capacity: { passengers: 7, bags: 7 },
        description: 'Mercedes Vito, Ford Custom, Chevrolet Suburban or similar',
        price: 303.36,
        originalPrice: 324.40,
        mileage: '3km/l',
        image: img4
      }
    ];

    // Filter vehicles based on passenger count
    const passengerCount = bookingData.outbound?.passengers || 1;
    const filteredVehicles = allVehicles.filter(
      vehicle => vehicle.capacity.passengers >= passengerCount
    );
    
    setVehicles(filteredVehicles);
    
    // Auto-select first available vehicle if current selection is not valid
    if (filteredVehicles.length > 0) {
      const isCurrentVehicleValid = filteredVehicles.find(
        v => v.type === selectedVehicle?.type
      );
      
      if (!isCurrentVehicleValid) {
        handleSelectVehicle(filteredVehicles[0]);
      }
    } else {
      setSelectedVehicle(null);
    }
  };

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    updateBookingData('selectedVehicle', {
      type: vehicle.type,
      capacity: `${vehicle.capacity.passengers} passengers, ${vehicle.capacity.bags} bags`,
      price: vehicle.price,
      image: vehicle.image,
      passengers: vehicle.capacity.passengers,
      luggage: vehicle.capacity.bags,
      mileage: vehicle.mileage
    });
  };

  const handleAddReturn = () => {
    const formattedDate = `${returnDate.getDate()} ${returnDate.toLocaleString('en-US', { month: 'short' })} ${returnDate.getFullYear()}`;
    const formattedTime = `${returnTime.hour}:${returnTime.minute} ${returnTime.period}`;
    
    updateBookingData('return', {
      from: bookingData.outbound.to,
      fromCity: bookingData.outbound.toCity,
      to: bookingData.outbound.from,
      toCity: bookingData.outbound.fromCity,
      date: formattedDate,
      time: formattedTime,
      estimatedArrival: '08:32 pm (6h 47m)',
      distance: '1328 km / 825 Miles',
      passengers: bookingData.outbound.passengers
    });
    
    setShowReturnSection(false);
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
      days.push(<div key={`empty-${i}`} style={{ padding: '8px' }}></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = date.toDateString() === returnDate.toDateString();
      const isPast = date < today && !isToday;
      
      days.push(
        <div
          key={day}
          onClick={() => !isPast && setReturnDate(date)}
          style={{
            padding: '8px',
            textAlign: 'center',
            cursor: isPast ? 'not-allowed' : 'pointer',
            borderRadius: '8px',
            backgroundColor: isSelected ? '#fbbf24' : 'transparent',
            color: isPast ? '#d1d5db' : isSelected ? '#000' : '#000',
            fontWeight: isSelected ? '600' : '400',
            border: isToday ? '2px solid #fbbf24' : 'none'
          }}
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

  const incrementValue = (type) => {
    if (type === 'hour') {
      const idx = hours12.indexOf(returnTime.hour);
      setReturnTime({ ...returnTime, hour: hours12[idx < hours12.length - 1 ? idx + 1 : 0] });
    } else if (type === 'minute') {
      const idx = minutes.indexOf(returnTime.minute);
      setReturnTime({ ...returnTime, minute: minutes[idx < minutes.length - 1 ? idx + 1 : 0] });
    }
  };

  const decrementValue = (type) => {
    if (type === 'hour') {
      const idx = hours12.indexOf(returnTime.hour);
      setReturnTime({ ...returnTime, hour: hours12[idx > 0 ? idx - 1 : hours12.length - 1] });
    } else if (type === 'minute') {
      const idx = minutes.indexOf(returnTime.minute);
      setReturnTime({ ...returnTime, minute: minutes[idx > 0 ? idx - 1 : minutes.length - 1] });
    }
  };

  const togglePeriod = () => {
    setReturnTime(prev => ({ ...prev, period: prev.period === 'AM' ? 'PM' : 'AM' }));
  };

  const getFreeCancellationDate = (dateString) => {
    if (!dateString) return '';
    const pickupDate = new Date(dateString);
    pickupDate.setDate(pickupDate.getDate() - 1);
    const day = pickupDate.getDate();
    const month = pickupDate.toLocaleString('en-US', { month: 'short' });
    const year = pickupDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

    const { t} = useTranslation("global");
  return (
    <div className="step-card">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '600', marginBottom: '12px', color: '#000' }}>
          {t("vehicle.choose_vehicle")}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', color: '#6b7280', marginBottom: '16px' }}>
          <MapPin size={18} />
          <span>{bookingData.outbound.from} → {bookingData.outbound.to}</span>
        </div>
        
        <div style={{ width: '100%', height: '160px', backgroundColor: '#f3f4f6', borderRadius: '8px', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <MapPin size={48} color="#9ca3af" />
              <div style={{ fontSize: '15px', color: '#6b7280', marginTop: '8px' }}>{t("vehicle.route_map_visualization")}</div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', backgroundColor: '#ffffff', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Check size={14} color="#10b981" />
            <span>{t("vehicle.all_prices_include")}</span>
          </div>
        </div>
      </div>

      {!bookingData.return && !showReturnSection && (
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={() => setShowReturnSection(true)}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#fff',
              border: '2px dashed #d1d5db',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '500',
              color: '#000',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            <RefreshCw size={18} />
            <span>{t("vehicle.choose_vehicle")}</span>
          </button>
        </div>
      )}

      {!bookingData.return && showReturnSection && (
        <div style={{ 
          marginBottom: '24px',
          padding: '20px',
          backgroundColor: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px'
        }}>
          {/* Return trip form - keeping the existing code */}
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Add Return Trip</h3>
          
          {/* ... rest of return section code ... */}
          
          <button
            onClick={handleAddReturn}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#fbbf24',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {t("vehicle.add_return")}
          </button>
        </div>
      )}

      {/* Passenger Filter Information */}
      <div style={{ 
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: '#eff6ff',
        borderRadius: '8px',
        border: '1px solid #bfdbfe'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Users size={18} color="#1e40af" />
          <span style={{ fontSize: '15px', fontWeight: '600', color: '#1e40af' }}>
            {t("vehicle.selected_passengers")}: {bookingData.outbound?.passengers || 0}
          </span>
        </div>
        <p style={{ fontSize: '13px', color: '#1e3a8a', margin: 0 }}>
          {t("vehicle.showing")} {vehicles.length} {t("vehicle.vehicle")}{vehicles.length !== 1 ? 's' : ''} {t("vehicle.accommodate")} {bookingData.outbound?.passengers || 0} {t("vehicle.or_more_passengers")}
        </p>
      </div>

      {/* No Vehicles Available Message */}
      {vehicles.length === 0 && (
        <div style={{
          padding: '24px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <Users size={48} color="#dc2626" style={{ margin: '0 auto 12px' }} />
          <p style={{ fontSize: '16px', color: '#991b1b', fontWeight: '600', marginBottom: '8px' }}>
            {t("vehicle.no_vehicles_available")}
          </p>
          <p style={{ fontSize: '14px', color: '#7f1d1d', margin: 0 }}>
            {t("vehicle.en2")} {bookingData.outbound?.passengers} {t("Transfer.passengers")}. 
            {t("vehicle.en3")}.
          </p>
        </div>
      )}

      {/* Vehicle List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => handleSelectVehicle(vehicle)}
            style={{ 
              border: selectedVehicle?.type === vehicle.type ? '2px solid #000' : '2px solid #e5e7eb',
              backgroundColor: selectedVehicle?.type === vehicle.type ? '#f9fafb' : '#ffffff',
              cursor: 'pointer',
              borderRadius: '12px',
              padding: '16px'
            }}
          >
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div>
                <img
                  src={vehicle.image}
                  alt={vehicle.type}
                  style={{ width: '100px', height: '75px', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>

              <div style={{ flex: '1' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <h3 style={{ fontWeight: '600', fontSize: '18px', color: '#000', margin: '0' }}>{vehicle.type}</h3>
                  {vehicle.badge && (
                    <span className={vehicle.badgeClass} style={{ 
                      fontSize: '11px', 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontWeight: '600',
                      color: vehicle.badgeClass === 'badge-best-value' ? '#fff' : (vehicle.badgeClass === 'badge-most-popular' ? '#fff' : '#000')
                    }}>
                      {vehicle.badge}
                    </span>
                  )}
                </div>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "8px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Users size={16} />
                    <span>Up to {vehicle.capacity.passengers}</span>
                  </div>
                  <div style={{ width: "1px", height: "16px", backgroundColor: "#d1d5db" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Briefcase size={16} />
                    <span>{vehicle.capacity.bags}</span>
                  </div>
                  <div style={{ width: "1px", height: "16px", backgroundColor: "#d1d5db" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Fuel size={16} />
                    <span>{vehicle.mileage}</span>
                  </div>
                </div>

                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 12px 0' }}>{vehicle.description}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#6b7280' }}>✓ Free waiting time</span>
                  <span style={{ color: '#6b7280' }}>✓ Door to door</span>
                  <span style={{ color: '#6b7280' }}>✓ Meet & Greet</span>
                  <span style={{ color: '#6b7280' }}>✓ Private transfer</span>
                  <span style={{ color: '#6b7280' }}>✓ Flight tracking</span>
                </div>
              </div>

              <div>
                {vehicle.originalPrice && (
                  <div style={{ fontSize: '14px', color: '#c52017ff', textDecoration: 'line-through' }}>
                    EUR {vehicle.originalPrice.toFixed(2)}
                  </div>
                )}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#000' }}>
                    EUR {vehicle.price.toFixed(2)}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Total price</div>
                </div>
              </div>
            </div>

            {selectedVehicle?.type === vehicle.type && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500', color: '#10b981' }}>
                  <Check size={18} />
                  <span>{t("vehicle.selected")}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '16px', 
        padding: '12px', 
        background: '#d1fae5', 
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Check size={16} style={{ color: '#10b981', flexShrink: 0 }} />
        <div style={{ fontSize: '13px', color: '#065f46' }}>
          <strong>{t("vehicle.free_cancellation")}</strong>
          <div style={{ fontSize: '15px', marginTop: '2px' }}>
            {t("vehicle.en")}{' '}
            <strong>{getFreeCancellationDate(bookingData.outbound.date)}</strong> {t("vehicle.en1")}.
          </div>
        </div>
      </div>

      <div className="button-group" style={{ marginTop: '24px' }}>
        <div style={{ fontSize: '17px', color: '#6b7280' }}>
          <div style={{ fontWeight: '530', marginLeft: '12px', color: '#000' }}>
            {t("vehicle.your_choice")}:&nbsp;
            <span style={{ fontWeight: '800', color: '#000' }}>
              {selectedVehicle?.type || 'None selected'}
            </span>
          </div>
        </div>
        <button 
          onClick={onContinue} 
          className="btn btn-primary"
          disabled={!selectedVehicle || vehicles.length === 0}
        >
         {t("vehicle.continue")}
        </button>
      </div>
    </div>
  );
};

export default VehicleStep;