import React, { useState } from "react";
import { MapPin, Calendar, Clock, Users } from "lucide-react";

const EditJourneyModal = ({ bookingData, onClose, onAddReturn }) => {
  const outbound = bookingData.outbound;

  const [showReturnForm, setShowReturnForm] = useState(!!bookingData.return);

  const [returnData, setReturnData] = useState(
    bookingData.return || {
      from: {
        name: outbound.to.name,
        postalCode: outbound.to.postalCode,
      },
      to: {
        name: outbound.from.name,
        postalCode: outbound.from.postalCode,
      },
      date: "16 Oct 2025",
      time: "01:45 PM",
      passengers: outbound.passengers,
    }
  );

  const handleAddReturn = () => {
    onAddReturn({
      ...returnData,
      estimatedArrival: "08:32 pm (6h 47m)",
      distance: "1328 km / 825 Miles",
    });
  };

  const adjustPassengers = (delta) => {
    const newCount = Math.max(1, Math.min(10, returnData.passengers + delta));
    setReturnData({ ...returnData, passengers: newCount });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-tabs">
            <button
              className={`modal-tab ${!showReturnForm ? "active" : ""}`}
              onClick={() => setShowReturnForm(false)}
            >
              Transfer
            </button>

            <button
              className={`modal-tab ${showReturnForm ? "active" : ""}`}
              onClick={() => setShowReturnForm(true)}
            >
              🕐 Hourly chauffeur
            </button>
          </div>

          <button onClick={onClose} className="modal-close">
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="modal-body">
          {/* TRANSFER SCREEN */}
          {!showReturnForm ? (
            <>
              <div style={{ marginBottom: "24px" }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Pickup date</label>
                    <div className="form-static-box">
                      <Calendar size={18} />
                      <span>{outbound.date}</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Pickup time</label>
                    <div className="form-static-box">
                      <Clock size={18} />
                      <span>{outbound.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowReturnForm(true)}
                className="add-return-button"
              >
                ADD RETURN
              </button>
            </>
          ) : (
            <>
              {/* RETURN FORM */}
              <div style={{ marginBottom: "24px" }}>
                {/* From */}
                <div className="form-group">
                  <label className="form-label">From</label>
                  <div className="form-box">
                    <MapPin size={20} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500 }}>
                        {returnData.from?.name}
                      </div>
                      <div className="form-box-subtext">
                        {returnData.from?.postalCode}
                      </div>
                    </div>
                    <button className="small-icon-btn">✕</button>
                  </div>
                </div>

                {/* To */}
                <div className="form-group">
                  <label className="form-label">To</label>
                  <div className="form-box">
                    <MapPin size={20} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500 }}>
                        {returnData.to?.name}
                      </div>
                      <div className="form-box-subtext">
                        {returnData.to?.postalCode}
                      </div>
                    </div>
                    <button className="small-icon-btn">✕</button>
                  </div>
                </div>

                {/* Date + Time */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Pickup date</label>
                    <div className="form-input-box">
                      <Calendar size={18} />
                      <input
                        type="text"
                        value={returnData.date}
                        onChange={(e) =>
                          setReturnData({ ...returnData, date: e.target.value })
                        }
                        className="input-clean"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Pickup time</label>
                    <div className="form-input-box">
                      <Clock size={18} />
                      <input
                        type="text"
                        value={returnData.time}
                        onChange={(e) =>
                          setReturnData({ ...returnData, time: e.target.value })
                        }
                        className="input-clean"
                      />
                    </div>
                  </div>
                </div>

                {/* Passengers */}
                <div className="form-group">
                  <label className="form-label">
                    <Users size={18} style={{ marginRight: 6 }} />
                    Passengers
                  </label>

                  <div className="passenger-row">
                    <span className="passenger-count">
                      {returnData.passengers}
                    </span>

                    <button
                      onClick={() => adjustPassengers(-1)}
                      className="circle-btn"
                    >
                      −
                    </button>
                    <button
                      onClick={() => adjustPassengers(1)}
                      className="circle-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button className="submit-btn" onClick={handleAddReturn}>
                🔍 See prices
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditJourneyModal;
