import React, { useState } from 'react';
import { Pencil, MapPin, Calendar, Clock, Users, Car, Check } from 'lucide-react';

// Main App Component
const BookingFlowApp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    outbound: {
      from: 'Frankfurt am Main Airport (FRA)',
      fromCity: 'Frankfurt, Germany',
      to: 'Milan Malpensa Airport (MXP)',
      toCity: 'Milano, Italy',
      date: '16 Oct 2025',
      time: '01:45 pm',
      estimatedArrival: '08:32 pm (6h 47m)',
      distance: '650 km / 404 Miles',
      passengers: 2,
    },
    return: null,
    selectedVehicle: {
      type: 'Economy',
      capacity: '3 passengers, 3 bags',
      price: 1920.24,
      image: '🚗'
    },
    extras: {
      flightNumber: '',
      childSeat: false,
      driverNotesOutward: '',
      driverNotesReturn: ''
    },
    passenger: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '+44 7400 123456',
      emailNotifications: true,
      smsNotifications: false
    }
  });

  const steps = [
    { id: 1, name: 'Vehicle', completed: currentStep > 1 },
    { id: 2, name: 'Extras', completed: currentStep > 2 },
    { id: 3, name: 'Passenger', completed: currentStep > 3 },
    { id: 4, name: 'Payment', completed: currentStep > 4 }
  ];

  const getTotalPrice = () => {
    let total = bookingData.selectedVehicle.price;
    if (bookingData.return) {
      total += bookingData.selectedVehicle.price;
    }
    if (bookingData.passenger.smsNotifications) {
      total += 1.49;
    }
    return total.toFixed(2);
  };

  const addReturnTrip = (returnData) => {
    setBookingData(prev => ({
      ...prev,
      return: returnData
    }));
    setShowEditModal(false);
  };

  const updateBookingData = (section, data) => {
    setBookingData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Stepper */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-black text-white' : 
                        currentStep === step.id ? 'bg-black text-white' : 
                        'bg-gray-200 text-gray-400'
                      }`}>
                        {step.completed ? <Check size={20} /> : step.id}
                      </div>
                      <span className={`mt-2 text-sm ${
                        currentStep === step.id ? 'text-black font-medium' : 'text-gray-500'
                      }`}>
                        {step.name}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`h-0.5 flex-1 mx-2 ${
                        step.completed ? 'bg-black' : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Step Content */}
            {currentStep === 1 && (
              <VehicleStep 
                bookingData={bookingData}
                onContinue={() => setCurrentStep(2)}
              />
            )}
            {currentStep === 2 && (
              <ExtrasStep 
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                onBack={() => setCurrentStep(1)}
                onContinue={() => setCurrentStep(3)}
              />
            )}
            {currentStep === 3 && (
              <PassengerStep 
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                onBack={() => setCurrentStep(2)}
                onContinue={() => setCurrentStep(4)}
              />
            )}
            {currentStep === 4 && (
              <PaymentStep 
                bookingData={bookingData}
                onBack={() => setCurrentStep(3)}
              />
            )}
          </div>

          {/* Right Side - Booking Summary */}
          <div className="lg:col-span-1">
            <BookingSummary 
              bookingData={bookingData}
              totalPrice={getTotalPrice()}
              onEditJourney={() => setShowEditModal(true)}
            />
          </div>
        </div>
      </div>

      {/* Edit Journey Modal */}
      {showEditModal && (
        <EditJourneyModal 
          bookingData={bookingData}
          onClose={() => setShowEditModal(false)}
          onAddReturn={addReturnTrip}
        />
      )}
    </div>
  );
};

// Booking Summary Component
const BookingSummary = ({ bookingData, totalPrice, onEditJourney }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-6">Your Booking</h2>
      
      {/* Outbound Journey */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600 text-sm">Outward journey</span>
          <button 
            onClick={onEditJourney}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Pencil size={16} />
          </button>
        </div>
        
        <JourneyDetails journey={bookingData.outbound} />
        
        <div className="mt-3 text-sm text-green-600 flex items-center gap-1">
          <Check size={16} />
          FREE CANCELLATION
        </div>
      </div>

      {/* Return Journey */}
      {bookingData.return && (
        <div className="mb-6 pt-6 border-t">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 text-sm">Return journey</span>
            <button 
              onClick={onEditJourney}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Pencil size={16} />
            </button>
          </div>
          
          <JourneyDetails journey={bookingData.return} />
          
          <div className="mt-3 text-sm text-green-600 flex items-center gap-1">
            <Check size={16} />
            FREE CANCELLATION
          </div>
        </div>
      )}

      {/* Vehicle Info */}
      <div className="pt-6 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{bookingData.selectedVehicle.image}</div>
            <div>
              <div className="font-medium">{bookingData.selectedVehicle.type}</div>
              <div className="text-sm text-gray-600">{bookingData.selectedVehicle.capacity}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-lg">EUR {totalPrice}</div>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="pt-6 border-t mt-6">
        <h3 className="font-medium mb-3">What's included</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-green-600" />
            Free waiting time
          </div>
        </div>
      </div>
    </div>
  );
};

// Journey Details Component
const JourneyDetails = ({ journey }) => {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="w-6 flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-black"></div>
          <div className="w-0.5 h-8 bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <div className="font-medium">{journey.from}</div>
            <div className="text-sm text-gray-500">{journey.fromCity}</div>
          </div>
          <div>
            <div className="font-medium">{journey.to}</div>
            <div className="text-sm text-gray-500">{journey.toCity}</div>
          </div>
        </div>
      </div>
      
      <div className="ml-8 space-y-1 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          {journey.date} {journey.time}
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} />
          Estimated arrival {journey.estimatedArrival}
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          Distance {journey.distance}
        </div>
        <div className="flex items-center gap-2">
          <Users size={14} />
          {journey.passengers} Passengers
        </div>
      </div>
    </div>
  );
};

// Vehicle Step Component
const VehicleStep = ({ bookingData, onContinue }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(bookingData.selectedVehicle);

  const vehicles = [
    {
      id: 1,
      type: 'Economy',
      badge: 'BEST VALUE',
      badgeColor: '#10b981',
      capacity: { passengers: 3, bags: 3 },
      description: 'Skoda Octavia, Toyota Prius or similar',
      price: 1920.24,
      image: '🚗'
    },
    {
      id: 2,
      type: 'Standard',
      badge: 'MOST POPULAR',
      badgeColor: '#ef4444',
      capacity: { passengers: 3, bags: 3 },
      description: 'Mercedes E Class, Skoda Superb, Cadillac XTS or similar',
      price: 3174.91,
      originalPrice: 3499.90,
      image: '🚙'
    },
    {
      id: 3,
      type: 'First Class',
      badge: 'TOP CLASS',
      badgeColor: '#9333ea',
      capacity: { passengers: 3, bags: 3 },
      description: 'Mercedes S Class, BMW 7, Audi A8, Cadillac Escalade or similar',
      price: 4603.62,
      image: '🚗'
    },
    {
      id: 4,
      type: 'Standard Van',
      capacity: { passengers: 7, bags: 7 },
      description: 'Mercedes Vito, Ford Custom, Chevrolet Suburban or similar',
      price: 3882.45,
      originalPrice: 4324.40,
      image: '🚐'
    },
    {
      id: 5,
      type: 'First Class Van',
      badge: 'TOP CLASS',
      badgeColor: '#9333ea',
      capacity: { passengers: 6, bags: 6 },
      description: 'Mercedes V Class, Cadillac Escalade or similar',
      price: 5099.79,
      image: '🚐'
    },
    {
      id: 6,
      type: 'Minibus',
      subtype: 'for two vans',
      capacity: { passengers: 10, bags: 10 },
      description: 'Mercedes Sprinter or similar',
      price: 8541.38,
      image: '🚌'
    }
  ];

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleContinue = () => {
    onContinue();
  };

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px', color: '#000' }}>Choose your vehicle</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
          <MapPin size={16} />
          <span>London Heathrow Airport (LHR) → Milan Malpensa Airport (MXP)</span>
        </div>
        
        {/* Map placeholder */}
        <div style={{ width: '100%', height: '160px', backgroundColor: '#f3f4f6', borderRadius: '8px', marginBottom: '16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🗺️</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Route map visualization</div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', backgroundColor: '#ffffff', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            ✓ All prices include VAT and tolls
          </div>
        </div>
      </div>

      {/* Round trip suggestion */}
      <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <span style={{ fontSize: '24px' }}>✈️</span>
        <div style={{ flex: '1' }}>
          <div style={{ fontWeight: '500', marginBottom: '4px', color: '#000' }}>Round trip? Travel smarter.</div>
          <div style={{ fontSize: '14px', color: '#4b5563', marginBottom: '8px' }}>
            Add a return ride now to save time and money.
          </div>
          <button style={{ fontSize: '14px', fontWeight: '500', color: '#000', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}>+ Add return</button>
        </div>
      </div>

      {/* Vehicle List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => handleSelectVehicle(vehicle)}
            style={{ 
              border: selectedVehicle.type === vehicle.type ? '2px solid #000' : '2px solid #e5e7eb',
              borderRadius: '8px', 
              padding: '16px', 
              cursor: 'pointer',
              backgroundColor: selectedVehicle.type === vehicle.type ? '#f9fafb' : '#ffffff',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', flexDirection: window.innerWidth < 768 ? 'column' : 'row', gap: '16px' }}>
              {/* Vehicle Image */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: window.innerWidth < 768 ? '100%' : '96px' }}>
                <div style={{ fontSize: '60px' }}>{vehicle.image}</div>
              </div>

              {/* Vehicle Details */}
              <div style={{ flex: '1' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <h3 style={{ fontWeight: '600', fontSize: '18px', color: '#000', margin: '0' }}>{vehicle.type}</h3>
                  {vehicle.badge && (
                    <span style={{ 
                      backgroundColor: vehicle.badgeColor, 
                      color: '#ffffff', 
                      fontSize: '11px', 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontWeight: '500' 
                    }}>
                      {vehicle.badge}
                    </span>
                  )}
                  {vehicle.subtype && (
                    <span style={{ fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>({vehicle.subtype})</span>
                  )}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={16} />
                    <span>Up to {vehicle.capacity.passengers}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>💼</span>
                    <span>{vehicle.capacity.bags}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>ⓘ</span>
                  </div>
                </div>

                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', margin: '0 0 12px 0' }}>{vehicle.description}</p>

                {/* Features */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280' }}>
                    <span>✓</span> Free waiting time
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280' }}>
                    <span>✓</span> Door to door service
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280' }}>
                    <span>✓</span> Meet & Greet
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280' }}>
                    <span>✓</span> Private transfer
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280' }}>
                    <span>✓</span> Flight tracking
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div style={{ 
                display: 'flex', 
                flexDirection: window.innerWidth < 768 ? 'row' : 'column',
                alignItems: window.innerWidth < 768 ? 'center' : 'flex-end',
                justifyContent: 'space-between',
                gap: '8px',
                minWidth: window.innerWidth < 768 ? '100%' : '120px'
              }}>
                {vehicle.originalPrice && (
                  <div style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'line-through' }}>
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

            {/* Selected indicator */}
            {selectedVehicle.type === vehicle.type && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500', color: '#10b981' }}>
                  <Check size={18} />
                  <span>Selected</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom info */}
      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#dbeafe', border: '1px solid #60a5fa', borderRadius: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: '#1f2937' }}>
          <span>ⓘ</span>
          <div>
            <strong>Instant confirmation</strong> • Free cancellation up to 24 hours before pickup
          </div>
        </div>
      </div>

      {/* Navigation Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginTop: '24px' }}>
        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          <div style={{ fontWeight: '500', color: '#000' }}>Your choice: {selectedVehicle.type}</div>
        </div>
        <button
          onClick={handleContinue}
          style={{ 
            padding: '12px 24px', 
            backgroundColor: '#000', 
            color: '#fff', 
            borderRadius: '8px', 
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1f2937'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#000'}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// ExtrasStep Component
const ExtrasStep = ({ bookingData, updateBookingData, onBack, onContinue }) => {
  const [flightNumber, setFlightNumber] = useState(bookingData.extras.flightNumber);
  const [childSeat, setChildSeat] = useState(bookingData.extras.childSeat);
  const [driverNotesOutward, setDriverNotesOutward] = useState(bookingData.extras.driverNotesOutward);
  const [driverNotesReturn, setDriverNotesReturn] = useState(bookingData.extras.driverNotesReturn);

  const handleContinue = () => {
    updateBookingData('extras', {
      flightNumber,
      childSeat,
      driverNotesOutward,
      driverNotesReturn
    });
    onContinue();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Extras & notes</h2>
      
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-medium mb-2">
          Flight/train number
          <span className="text-gray-400">ⓘ</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">✈️</span>
          <input
            type="text"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            placeholder="e.g. LH1868"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Please provide your flight number (driver will track your flight)
        </p>
      </div>

      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={childSeat}
            onChange={(e) => setChildSeat(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300"
          />
          <span className="text-sm">Need a child or booster seat?</span>
        </label>
      </div>

      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-medium mb-2">
          Driver notes (Outward)
          <span className="text-gray-400">ⓘ</span>
        </label>
        <textarea
          value={driverNotesOutward}
          onChange={(e) => setDriverNotesOutward(e.target.value)}
          placeholder="Luggage info, special requests... No sensitive data—add phone in next step."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />
      </div>

      {bookingData.return && (
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            Driver notes (Return)
            <span className="text-gray-400">ⓘ</span>
          </label>
          <textarea
            value={driverNotesReturn}
            onChange={(e) => setDriverNotesReturn(e.target.value)}
            placeholder="Luggage info, special requests... No sensitive data—add phone in next step."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>
      )}

      <div className="flex justify-between gap-3 mt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          ← Back
        </button>
        <button
          onClick={handleContinue}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// PassengerStep Component
const PassengerStep = ({ bookingData, updateBookingData, onBack, onContinue }) => {
  const [firstName, setFirstName] = useState(bookingData.passenger.firstName);
  const [lastName, setLastName] = useState(bookingData.passenger.lastName);
  const [email, setEmail] = useState(bookingData.passenger.email);
  const [mobile, setMobile] = useState(bookingData.passenger.mobile);
  const [emailNotifications, setEmailNotifications] = useState(bookingData.passenger.emailNotifications);
  const [smsNotifications, setSmsNotifications] = useState(bookingData.passenger.smsNotifications);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = true;
    if (!lastName.trim()) newErrors.lastName = true;
    if (!email.trim() || !email.includes('@')) newErrors.email = true;
    if (!mobile.trim()) newErrors.mobile = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      updateBookingData('passenger', {
        firstName,
        lastName,
        email,
        mobile,
        emailNotifications,
        smsNotifications
      });
      onContinue();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Lead passenger</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="flex items-center gap-1 text-sm font-medium mb-2">
            First name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`w-full px-4 py-3 border ${errors.firstName ? 'border-pink-500 bg-pink-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
          />
        </div>
        <div>
          <label className="flex items-center gap-1 text-sm font-medium mb-2">
            Last name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`w-full px-4 py-3 border ${errors.lastName ? 'border-pink-500 bg-pink-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-1 text-sm font-medium mb-2">
          Email address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-4 py-3 border ${errors.email ? 'border-pink-500 bg-pink-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
        />
        <p className="text-sm text-gray-500 mt-1">
          ⓘ We'll send your booking voucher here.
        </p>
      </div>

      <div className="mb-6">
        <label className="flex items-center gap-1 text-sm font-medium mb-2">
          Mobile number <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <select className="px-3 py-3 border border-gray-300 rounded-lg">
            <option>🇬🇧 +44</option>
          </select>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="7400 123456"
            className={`flex-1 px-4 py-3 border ${errors.mobile ? 'border-pink-500 bg-pink-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          ⓘ Please provide a contact number so our driver can reach the passenger if needed
        </p>
      </div>

      <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">📧 Email & App notifications</span>
              <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">✓ Free</span>
            </div>
            <p className="text-sm text-gray-600">
              Driver details sent 6 hours before pickup via email and App push notification. ⓘ
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={smsNotifications}
            onChange={(e) => setSmsNotifications(e.target.checked)}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">💬 SMS/Whatsapp notifications</span>
              <span className="text-xs bg-yellow-600 text-white px-2 py-0.5 rounded">€ 1.49</span>
            </div>
            <p className="text-sm text-gray-600">
              Get driver's details 6 hours before pickup via text message on your mobile phone and whatsapp. Price each way
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Meet & Greet</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Included in your booking</p>
        </div>
      </div>

      <div className="flex justify-between gap-3 mt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          ← Back
        </button>
        <button
          onClick={handleContinue}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// PaymentStep Component
const PaymentStep = ({ bookingData, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Payment</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-4">Select payment method</h3>
        
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-black">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-2xl">💳</span>
            <span className="font-medium">Credit / Debit Card</span>
            <div className="ml-auto flex gap-2">
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">VISA</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">MC</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">AMEX</span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-black">
            <input
              type="radio"
              name="payment"
              value="apple"
              checked={paymentMethod === 'apple'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-2xl"></span>
            <span className="font-medium">Apple Pay</span>
          </label>

          <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-black">
            <input
              type="radio"
              name="payment"
              value="google"
              checked={paymentMethod === 'google'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-2xl">G</span>
            <span className="font-medium">Google Pay</span>
          </label>
        </div>
      </div>

      {paymentMethod === 'card' && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Card number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Name on card</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Expiry date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                maxLength={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" className="mt-1" />
          <span className="text-sm text-gray-600">
            I agree to the terms and conditions and privacy policy
          </span>
        </label>
      </div>

      <div className="flex justify-between gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          ← Back
        </button>
        <button
          onClick={() => alert('Booking completed!')}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Complete Booking
        </button>
      </div>
    </div>
  );
};

// EditJourneyModal Component
const EditJourneyModal = ({ bookingData, onClose, onAddReturn }) => {
  const [showReturnForm, setShowReturnForm] = useState(!!bookingData.return);
  const [returnData, setReturnData] = useState(
    bookingData.return || {
      from: bookingData.outbound.to,
      fromCity: bookingData.outbound.toCity,
      to: bookingData.outbound.from,
      toCity: bookingData.outbound.fromCity,
      date: '16 Oct 2025',
      time: '01:45 PM',
      passengers: bookingData.outbound.passengers
    }
  );

  const handleAddReturn = () => {
    const fullReturnData = {
      ...returnData,
      estimatedArrival: '08:32 pm (6h 47m)',
      distance: '652 km / 405 Miles'
    };
    onAddReturn(fullReturnData);
  };

  const adjustPassengers = (delta) => {
    const newCount = Math.max(1, Math.min(10, returnData.passengers + delta));
    setReturnData({ ...returnData, passengers: newCount });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <div className="flex gap-4">
            <button 
              className={`pb-2 ${!showReturnForm ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
              onClick={() => setShowReturnForm(false)}
            >
              Transfer
            </button>
            <button 
              className={`pb-2 ${showReturnForm ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
              onClick={() => setShowReturnForm(true)}
            >
              🕐 Hourly chauffeur
            </button>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {!showReturnForm ? (
            <>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">From</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin size={20} />
                    <div>
                      <div className="font-medium">{bookingData.outbound.from}</div>
                      <div className="text-sm text-gray-500">{bookingData.outbound.fromCity}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">To</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin size={20} />
                    <div>
                      <div className="font-medium">{bookingData.outbound.to}</div>
                      <div className="text-sm text-gray-500">{bookingData.outbound.toCity}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Pickup date</label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Calendar size={18} />
                      <span className="text-sm">{bookingData.outbound.date}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Pickup time</label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Clock size={18} />
                      <span className="text-sm">{bookingData.outbound.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowReturnForm(true)}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">ADD RETURN</span>
              </button>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">From</label>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <MapPin size={20} />
                    <div>
                      <div className="font-medium">{returnData.from}</div>
                      <div className="text-sm text-gray-500">{returnData.fromCity}</div>
                    </div>
                    <button className="ml-auto p-1 hover:bg-gray-100 rounded-full">
                      ✕
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">To</label>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <MapPin size={20} />
                    <div>
                      <div className="font-medium">{returnData.to}</div>
                      <div className="text-sm text-gray-500">{returnData.toCity}</div>
                    </div>
                    <button className="ml-auto p-1 hover:bg-gray-100 rounded-full">
                      ✕
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Pickup date</label>
                    <div className="flex items-center gap-2 p-3 border rounded-lg">
                      <Calendar size={18} />
                      <input
                        type="text"
                        value={returnData.date}
                        onChange={(e) => setReturnData({ ...returnData, date: e.target.value })}
                        className="flex-1 outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Pickup time</label>
                    <div className="flex items-center gap-2 p-3 border rounded-lg">
                      <Clock size={18} />
                      <input
                        type="text"
                        value={returnData.time}
                        onChange={(e) => setReturnData({ ...returnData, time: e.target.value })}
                        className="flex-1 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Users size={18} className="inline mr-1" />
                    Passengers
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="flex-1 text-2xl font-medium">{returnData.passengers}</span>
                    <button
                      onClick={() => adjustPassengers(-1)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-700"
                    >
                      −
                    </button>
                    <button
                      onClick={() => adjustPassengers(1)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddReturn}
                className="w-full mt-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2"
              >
                <span>🔍 See prices</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFlowApp;