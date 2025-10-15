import React, { useState } from 'react';
import { Plane, Info } from 'lucide-react';

// Extras Step Component
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
      
      {/* Flight/Train Number */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-medium mb-2">
          Flight/train number
          <Info size={16} className="text-gray-400" />
        </label>
        <div className="relative">
          <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
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

      {/* Child Seat */}
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

      {/* Driver Notes Outward */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-medium mb-2">
          Driver notes (Outward)
          <Info size={16} className="text-gray-400" />
        </label>
        <textarea
          value={driverNotesOutward}
          onChange={(e) => setDriverNotesOutward(e.target.value)}
          placeholder="Luggage info, special requests... No sensitive data—add phone in next step."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />
      </div>

      {/* Driver Notes Return */}
      {bookingData.return && (
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            Driver notes (Return)
            <Info size={16} className="text-gray-400" />
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

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-3 mt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
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
export default ExtrasStep;
// Passenger Step Component
//  const PassengerStep = ({ bookingData, updateBookingData, onBack, onContinue }) => {
//   const [firstName, setFirstName] = useState(bookingData.passenger.firstName);
//   const [lastName, setLastName] = useState(bookingData.passenger.lastName);
//   const [email, setEmail] = useState(bookingData.passenger.email);
//   const [mobile, setMobile] = useState(bookingData.passenger.mobile);
//   const [emailNotifications, setEmailNotifications] = useState(bookingData.passenger.emailNotifications);
//   const [smsNotifications, setSmsNotifications] = useState(bookingData.passenger.smsNotifications);
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!firstName.trim()) newErrors.firstName = true;
//     if (!lastName.trim()) newErrors.lastName = true;
//     if (!email.trim() || !email.includes('@')) newErrors.email = true;
//     if (!mobile.trim()) newErrors.mobile = true;
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleContinue = () => {
//     if (validateForm()) {
//       updateBookingData('passenger', {
//         firstName,
//         lastName,
//         email,
//         mobile,
//         emailNotifications,
//         smsNotifications
//       });
//       onContinue();
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6">
//       <h2 className="text-2xl font-semibold mb-6">Lead passenger</h2>
      
//       {/* Name Fields */}
//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div>
//           <label className="flex items-center gap-1 text-sm font-medium mb-2">
//             First name <span className="text-red-500">*</span>
//             <Info size={16} className="text-gray-400" />
//           </label>
//           <input
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             className={`w-full px-4 py-3 border ${errors.firstName ? 'border-pink-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
//           />
//         </div>
//         <div>
//           <label className="flex items-center gap-1 text-sm font-medium mb-2">
//             Last name <span className="text-red-500">*</span>
//             <Info size={16} className="text-gray-400" />
//           </label>
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             className={`w-full px-4 py-3 border ${errors.lastName ? 'border-pink-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
//           />
//         </div>
//       </div>

//       {/* Email */}
//       <div className="mb-4">
//         <label className="flex items-center gap-1 text-sm font-medium mb-2">
//           Email address <span className="text-red-500">*</span>
//           <Info size={16} className="text-gray-400" />
//         </label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className={`w-full px-4 py-3 border ${errors.email ? 'border-pink-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
//         />
//         <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
//           <Info size={14} />
//           We'll send your booking voucher here.
//         </p>
//       </div>

//       {/* Mobile Number */}
//       <div className="mb-6">
//         <label className="flex items-center gap-1 text-sm font-medium mb-2">
//           Mobile number <span className="text-red-500">*</span>
//           <Info size={16} className="text-gray-400" />
//         </label>
//         <div className="flex gap-2">
//           <select className="px-3 py-3 border border-gray-300 rounded-lg">
//             <option>🇬🇧 +44</option>
//           </select>
//           <input
//             type="tel"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//             placeholder="7400 123456"
//             className={`flex-1 px-4 py-3 border ${errors.mobile ? 'border-pink-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
//           />
//         </div>
//         <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
//           <Info size={14} />
//           Please provide a contact number so our driver can reach the passenger if needed
//         </p>
//       </div>

//       {/* Email Notifications */}
//       <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
//         <div className="flex items-start gap-3">
//           <input
//             type="checkbox"
//             checked={emailNotifications}
//             onChange={(e) => setEmailNotifications(e.target.checked)}
//             className="mt-1"
//           />
//           <div className="flex-1">
//             <div className="flex items-center gap-2 mb-1">
//               <span className="font-medium">Email & App notifications</span>
//               <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">Free</span>
//             </div>
//             <p className="text-sm text-gray-600">
//               Driver details sent 6 hours before pickup via email and App push notification.
//               <Info size={14} className="inline ml-1" />
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* SMS Notifications */}
//       <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
//         <div className="flex items-start gap-3">
//           <input
//             type="checkbox"
//             checked={smsNotifications}
//             onChange={(e) => setSmsNotifications(e.target.checked)}
//             className="mt-1"
//           />
//           <div className="flex-1">
//             <div className="flex items-center gap-2 mb-1">
//               <span className="font-medium">SMS/Whatsapp notifications</span>
//               <span className="text-xs bg-yellow-600 text-white px-2 py-0.5 rounded">€ 1.49</span>
//             </div>
//             <p className="text-sm text-gray-600">
//               Get driver's details 6 hours before pickup via text message on your mobile phone and whatsapp. Price each way
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Meet & Greet */}
//       <div className="mb-6">
//         <h3 className="font-medium mb-2">Meet & Greet</h3>
//         <div className="p-4 bg-gray-50 rounded-lg">
//           <p className="text-sm text-gray-600">Included in your booking</p>
//         </div>
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-between gap-3 mt-6">
//         <button
//           onClick={onBack}
//           className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
//         >
//           Back
//         </button>
//         <button
//           onClick={handleContinue}
//           className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };
// export default PassengerStep; 