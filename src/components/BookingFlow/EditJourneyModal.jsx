import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';

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
      distance: '1328 km / 825 Miles'
    };
    onAddReturn(fullReturnData);
  };
  const adjustPassengers = (delta) => {
    const newCount = Math.max(1, Math.min(10, returnData.passengers + delta));
    setReturnData({ ...returnData, passengers: newCount });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-tabs">
            <button
              className={`modal-tab ${!showReturnForm ? 'active' : ''}`}
              onClick={() => setShowReturnForm(false)}
            >
              Transfer
            </button>
            <button
              className={`modal-tab ${showReturnForm ? 'active' : ''}`}
              onClick={() => setShowReturnForm(true)}
            >
              🕐 Hourly chauffeur
            </button>
          </div>
          <button onClick={onClose} className="modal-close">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {!showReturnForm ? (
            <>
              <div style={{ marginBottom: '24px' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Pickup date</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      <Calendar size={18} />
                      <span style={{ fontSize: '14px' }}>{bookingData.outbound.date}</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pickup time</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                      <Clock size={18} />
                      <span style={{ fontSize: '14px' }}>{bookingData.outbound.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={() => setShowReturnForm(true)} className="add-return-button">
                <span>ADD RETURN</span>
              </button>
            </>
          ) : (
            <>
              <div style={{ marginBottom: '24px' }}>
                <div className="form-group">
                  <label className="form-label">From</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
                    <MapPin size={20} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500' }}>{returnData.from}</div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>{returnData.fromCity}</div>
                    </div>
                    <button style={{ padding: '4px', background: 'none', border: 'none', borderRadius: '50%', cursor: 'pointer' }}>
                      ✕
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">To</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
                    <MapPin size={20} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500' }}>{returnData.to}</div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>{returnData.toCity}</div>
                    </div>
                    <button style={{ padding: '4px', background: 'none', border: 'none', borderRadius: '50%', cursor: 'pointer' }}>
                      ✕
                    </button>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Pickup date</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
                      <Calendar size={18} />
                      <input
                        type="text"
                        value={returnData.date}
                        onChange={(e) => setReturnData({ ...returnData, date: e.target.value })}
                        style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pickup time</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px' }}>
                      <Clock size={18} />
                      <input
                        type="text"
                        value={returnData.time}
                        onChange={(e) => setReturnData({ ...returnData, time: e.target.value })}
                        style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Users size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                    Passengers
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ flex: 1, fontSize: '24px', fontWeight: '500' }}>{returnData.passengers}</span>
                    <button
                      onClick={() => adjustPassengers(-1)}
                      style={{ width: '40px', height: '40px', background: '#1f2937', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer', fontSize: '20px' }}
                    >
                      −
                    </button>
                    <button
                      onClick={() => adjustPassengers(1)}
                      style={{ width: '40px', height: '40px', background: '#1f2937', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer', fontSize: '20px' }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddReturn}
                style={{ width: '100%', padding: '14px', background: '#000', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '15px', fontWeight: '500' }}
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
export default EditJourneyModal; 