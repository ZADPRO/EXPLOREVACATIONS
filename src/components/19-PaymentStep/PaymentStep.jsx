 import React, { useState } from 'react';
import { CreditCard, Apple, X, MapPin, Calendar, Clock, Users, Plus, Minus } from 'lucide-react';

// Payment Step Component
export const PaymentStep = ({ bookingData, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = () => {
    // Handle payment submission
    alert('Payment submitted! (This is a demo)');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Payment</h2>
      
      {/* Payment Methods */}
      <div className="mb-6">
        <h3 className="font-medium mb-4">Select payment method</h3>
        
        <div className="space-y-3">
          {/* Credit/Debit Card */}
          <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-black transition-colors">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4"
            />
            <CreditCard size={24} />
            <span className="font-medium">Credit / Debit Card</span>
            <div className="ml-auto flex gap-2">
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">VISA</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">MC</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">AMEX</span>
            </div>
          </label>

          {/* Apple Pay */}
          <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-black transition-colors">
            <input
              type="radio"
              name="payment"
              value="apple"
              checked={paymentMethod === 'apple'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4"
            />
            <Apple size={24} />
            <span className="font-medium">Apple Pay</span>
          </label>

          {/* Google Pay */}
          <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-black transition-colors">
            <input
              type="radio"
              name="payment"
              value="google"
              checked={paymentMethod === 'google'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4"
            />
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-red-500 rounded"></div>
            <span className="font-medium">Google Pay</span>
          </label>
        </div>
      </div>

      {/* Card Details Form */}
      {paymentMethod === 'card' && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Card number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Name on card</label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                maxLength={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" className="mt-1" />
          <span className="text-sm text-gray-600">
            I agree to the terms and conditions and privacy policy
          </span>
        </label>
      </div>

      {/* Booking Summary */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Total amount</span>
          <span className="text-2xl font-bold">
            EUR {bookingData.selectedVehicle.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Instant confirmation • Free cancellation
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Complete Booking
        </button>
      </div>
    </div>
  );
};

// Edit Journey Modal Component
export const EditJourneyModal = ({ bookingData, onClose, onAddReturn }) => {
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [returnData, setReturnData] = useState({
    from: bookingData.outbound.to,
    fromCity: bookingData.outbound.toCity,
    to: bookingData.outbound.from,
    toCity: bookingData.outbound.fromCity,
    date: '16 Oct 2025',
    time: '01:45 PM',
    passengers: bookingData.outbound.passengers
  });

  const handleAddReturn = () => {
    if (showReturnForm) {
      // Calculate estimated arrival and distance
      const fullReturnData = {
        ...returnData,
        estimatedArrival: '08:32 pm (6h 47m)',
        distance: '652 km / 405 Miles'
      };
      onAddReturn(fullReturnData);
    } else {
      setShowReturnForm(true);
    }
  };

  const adjustPassengers = (delta) => {
    const newCount = Math.max(1, Math.min(10, returnData.passengers + delta));
    setReturnData({ ...returnData, passengers: newCount });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <div className="flex gap-4">
            <button 
              className={`pb-2 ${!showReturnForm ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
              onClick={() => setShowReturnForm(false)}
            >
              Transfer
            </button>
            <button 
              className={`pb-2 flex items-center gap-1 ${showReturnForm ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
              onClick={() => setShowReturnForm(true)}
            >
              <Clock size={16} />
              Hourly chauffeur
            </button>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {!showReturnForm ? (
            <>
              {/* Current Journey Info */}
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

              {/* Add Return Button */}
              <button
                onClick={() => setShowReturnForm(true)}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">ADD RETURN</span>
              </button>
            </>
          ) : (
            <>
              {/* Return Journey Form */}
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
                      <X size={16} />
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
                      <X size={16} />
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

                {/* Passengers */}
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
                      <Minus size={20} />
                    </button>
                    <button
                      onClick={() => adjustPassengers(1)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-700"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* See Prices Button */}
              <button
                onClick={handleAddReturn}
                className="w-full mt-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2"
              >
                <span>See prices</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};