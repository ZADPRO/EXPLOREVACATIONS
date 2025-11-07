import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Pencil, MapPin, Calendar, Clock, Users, Check } from 'lucide-react';
import './BookingFlow.css';

// Import step components
import VehicleStep from '../17-vehicle/vehicle';
import ExtrasStep from '../18-ExtrasStep/ExtrasStep';
import PassengerStep from '../20-PassengerStep/PassengerStep';
import PaymentStep from '../19-PaymentStep/PaymentStep';
import BookingSummary from '../BookingFlow/BookingSummary';
import EditJourneyModal from '../BookingFlow/EditJourneyModal';

const BookingFlow = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Scroll to top whenever step changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentStep]);

  // Initialize booking data from navigation state or use defaults
  const initialBookingData = location.state?.bookingFormData || {
    outbound: {
      from: 'London Heathrow Airport (LHR)',
      fromCity: 'London, United Kingdom',
      to: 'Milan Malpensa Airport (MXP)',
      toCity: 'Milano, Italy',
      date: '16 Oct 2025',
      time: '01:45 pm',
      estimatedArrival: '08:32 pm (6h 47m)',
      distance: '1328 km / 825 Miles',
      passengers: 2,
    },
    return: null
  };

  const [bookingData, setBookingData] = useState({
    ...initialBookingData,
    selectedVehicle: {
      type: 'Economy',
      image: 'your-image-path',
      passengers: 3,
      luggage: 3,
      price: 177.92
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
      mobile: '7400 123456',
      emailNotifications: true,
      smsNotifications: false
    }
  });

  const updateBookingData = (key, value) => {
    setBookingData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEditJourney = () => {
    setShowEditModal(true);
  };

  const handleRemoveReturn = () => {
    setBookingData(prev => ({
      ...prev,
      return: null
    }));
    setShowEditModal(false);
  };

  const totalPrice = bookingData.return 
    ? (bookingData.selectedVehicle.price * 2).toFixed(2)
    : bookingData.selectedVehicle.price.toFixed(2);

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

  return (
    <div className="booking-flow-container">
      <div className="booking-flow-wrapper">
        <div className="booking-flow-grid">
          {/* Left Side - Main Content */}
          <div>
            {/* Progress Stepper */}
            <div className="progress-stepper">
              <div className="stepper-container">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="step-item">
                      <div className={`step-circle ${
                        step.completed ? 'completed' : 
                        currentStep === step.id ? 'active' : 
                        'pending'
                      }`}>
                        {step.completed ? <Check size={20} /> : step.id}
                      </div>
                      <span className={`step-label ${
                        currentStep === step.id ? 'active' : ''
                      }`}>
                        {step.name}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`step-connector ${
                        step.completed ? 'completed' : ''
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
                updateBookingData={updateBookingData}
                onContinue={handleContinue}
              />
            )}
            {currentStep === 2 && (
              <ExtrasStep 
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                onBack={handleBack}
                onContinue={handleContinue}
              />
            )}
            {currentStep === 3 && (
              <PassengerStep 
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                onBack={handleBack}
                onContinue={handleContinue}
              />
            )}
            {currentStep === 4 && (
              <PaymentStep 
                bookingData={bookingData}
                onBack={handleBack}
                totalPrice={getTotalPrice()}
              />
            )}
          </div>

          {/* Right Side - Booking Summary */}
          <div>
            <BookingSummary
              bookingData={bookingData}
              totalPrice={totalPrice}
              onEditJourney={handleEditJourney}
              updateBookingData={updateBookingData}
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

export default BookingFlow;