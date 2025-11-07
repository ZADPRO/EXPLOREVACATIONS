import React, { useState } from "react";
import { Plane } from "lucide-react";

const extrasStepStyles = `
.content-card {
  background: white;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  max-width: 720px;
  margin: 0 auto;
}

h2 {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 24px;
  color: #000;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 15px;
  color: #374151;
  margin-bottom: 8px;
}

.form-label span {
  margin-left: 6px;
  font-size: 13px;
  color: #9ca3af;
}

.form-input-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  font-size: 18px;
}

.form-input {
  width: 100%;
  padding: 12px 14px 12px 38px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  transition: all 0.2s;
}

.form-input:focus {
  border-color: #000;
}

.form-hint {
  font-size: 13px;
  color: #9ca3af;
  margin-top: 6px;
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  cursor: pointer;
}

.form-checkbox input {
  width: 18px;
  height: 18px;
  accent-color: #000;
}

.form-textarea {
  width: 100%;
  min-height: 90px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 15px;
  resize: none;
  outline: none;
  transition: all 0.2s;
}

.form-textarea:focus {
  border-color: #000;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
}

.btn {
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  font-size: 15px;
}

.btn-back {
  background: #f3f4f6;
  color: #000;
}

.btn-back:hover {
  background: #e5e7eb;
}

.btn-primary {
  background: #000;
  color: white;
}

.btn-primary:hover {
  background: #111827;
}
`;

const ExtrasStep = ({ bookingData, updateBookingData, onBack, onContinue }) => {
  const [flightNumber, setFlightNumber] = useState(
    bookingData.extras?.flightNumber || ""
  );
  const [childSeat, setChildSeat] = useState(
    bookingData.extras?.childSeat || false
  );
  const [driverNotesOutward, setDriverNotesOutward] = useState(
    bookingData.extras?.driverNotesOutward || ""
  );
  const [driverNotesReturn, setDriverNotesReturn] = useState(
    bookingData.extras?.driverNotesReturn || ""
  );

  const handleContinue = () => {
    updateBookingData("extras", {
      flightNumber,
      childSeat,
      driverNotesOutward,
      driverNotesReturn,
    });
    onContinue();
  };

  return (
    <>
      <style>{extrasStepStyles}</style>
      <div className="content-card">
        <h2>Extras & notes</h2>

        {/* Flight Number */}
        <div className="form-group">
          <label className="form-label">
            Flight/train number <span>ⓘ</span>
          </label>
          <div className="form-input-icon">
            <Plane className="input-icon" size={18} />
            <input
              type="text"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              placeholder="e.g. LH1868"
              className="form-input"
            />
          </div>
          <p className="form-hint">
            Please provide your flight number (driver will track your flight)
          </p>
        </div>

        {/* Child Seat */}
        <div className="form-group">
          <label className="form-checkbox">
            <input
              type="checkbox"
              checked={childSeat}
              onChange={(e) => setChildSeat(e.target.checked)}
            />
            Need a child or booster seat?
          </label>
        </div>

        {/* Outward Notes */}
        <div className="form-group">
          <label className="form-label">
            Driver notes (Outward) <span>ⓘ</span>
          </label>
          <textarea
            value={driverNotesOutward}
            onChange={(e) => setDriverNotesOutward(e.target.value)}
            placeholder="Luggage info, special requests... No sensitive data—add phone in next step."
            className="form-textarea"
          />
        </div>

        {/* Return Notes (only show if return exists) */}
        {bookingData.return && (
          <div className="form-group">
            <label className="form-label">
              Driver notes (Return) <span>ⓘ</span>
            </label>
            <textarea
              value={driverNotesReturn}
              onChange={(e) => setDriverNotesReturn(e.target.value)}
              placeholder="Luggage info, special requests... No sensitive data—add phone in next step."
              className="form-textarea"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="button-group">
          <button onClick={onBack} className="btn btn-back">
            ← Back
          </button>
          <button onClick={handleContinue} className="btn btn-primary">
            Continue 
          </button>
        </div>
      </div>
    </>
  );
};

export default ExtrasStep;
