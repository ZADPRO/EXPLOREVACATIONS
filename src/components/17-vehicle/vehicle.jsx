// src/components/VehicleStep.js
import React, { useState } from 'react';
import { MapPin, Users, Check } from 'lucide-react';

const VehicleStep = ({ bookingData, updateBookingData, onContinue }) => {
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
    updateBookingData('selectedVehicle', {
      type: vehicle.type,
      capacity: `${vehicle.capacity.passengers} passengers, ${vehicle.capacity.bags} bags`,
      price: vehicle.price,
      image: vehicle.image
    });
  };

  return (
    <div className="step-card">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px', color: '#000' }}>
          Choose your vehicle
        </h2>
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
          <button style={{ fontSize: '14px', fontWeight: '500', color: '#000', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}>
            + Add return
          </button>
        </div>
      </div>

      {/* Vehicle List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => handleSelectVehicle(vehicle)}
            className="vehicle-card"
            style={{ 
              border: selectedVehicle.type === vehicle.type ? '2px solid #000' : '2px solid #e5e7eb',
              backgroundColor: selectedVehicle.type === vehicle.type ? '#f9fafb' : '#ffffff',
            }}
          >
            <div className="vehicle-content">
              {/* Vehicle Image */}
              <div className="vehicle-image">
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
                </div>

                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 12px 0' }}>{vehicle.description}</p>

                {/* Features */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '12px' }}>
                  <span style={{ color: '#6b7280' }}>✓ Free waiting time</span>
                  <span style={{ color: '#6b7280' }}>✓ Door to door</span>
                  <span style={{ color: '#6b7280' }}>✓ Meet & Greet</span>
                  <span style={{ color: '#6b7280' }}>✓ Private transfer</span>
                  <span style={{ color: '#6b7280' }}>✓ Flight tracking</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="vehicle-price">
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
        <button className="btn-primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default VehicleStep;