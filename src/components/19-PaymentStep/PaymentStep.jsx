import React, { useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { Link } from "react-router-dom";
const PaymentStep = ({ bookingData, onBack, totalPrice }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCardDetailsChange = (field, value) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateCardDetails = () => {
    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber.trim()) {
        showToast('Please enter card number', 'error');
        return false;
      }
      if (!cardDetails.cardName.trim()) {
        showToast('Please enter name on card', 'error');
        return false;
      }
      if (!cardDetails.expiryDate.trim()) {
        showToast('Please enter expiry date', 'error');
        return false;
      }
      if (!cardDetails.cvv.trim()) {
        showToast('Please enter CVV', 'error');
        return false;
      }
    }
    return true;
  };

  const handleCompleteBooking = () => {
    if (!validateCardDetails()) {
      return;
    }

    showToast(`Booking completed successfully! Total: EUR ${totalPrice}`, 'success');
    setTimeout(() => {
      // navigate("/transfer"); 
      window.location.href = '/transfer';
    }, 1500);
  };

  return (
    <div className="content-card" style={{ position: 'relative' }}>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            background: toast.type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            padding: '16px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            minWidth: '300px',
            maxWidth: '500px',
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          {toast.type === 'success' ? (
            <CheckCircle size={24} />
          ) : (
            <XCircle size={24} />
          )}
          <span style={{ flex: 1, fontSize: '14px' }}>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>
      )}

      

      <h2>Payment</h2>
      
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontWeight: '500', marginBottom: '16px' }}>Select payment method</h3>
        
        <div className="payment-methods">
          <label className="payment-method">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="payment-icon">💳</span>
            <span className="payment-name">Credit / Debit Card</span>
            <div className="payment-badges">
              <span className="payment-badge">VISA</span>
              <span className="payment-badge">MC</span>
              <span className="payment-badge">AMEX</span>
            </div>
          </label>

          <label className="payment-method">
            <input
              type="radio"
              name="payment"
              value="apple"
              checked={paymentMethod === 'apple'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="payment-icon"></span>
            <span className="payment-name">Apple Pay</span>
          </label>

          <label className="payment-method">
            <input
              type="radio"
              name="payment"
              value="google"
              checked={paymentMethod === 'google'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="payment-icon">G</span>
            <span className="payment-name">Google Pay</span>
          </label>
        </div>
      </div>

      {paymentMethod === 'card' && (
        <div style={{ marginBottom: '24px' }}>
          <div className="form-group">
            <label className="form-label">Card number *</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="form-input"
              value={cardDetails.cardNumber}
              onChange={(e) => handleCardDetailsChange('cardNumber', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Name on card *</label>
            <input
              type="text"
              placeholder="John Doe"
              className="form-input"
              value={cardDetails.cardName}
              onChange={(e) => handleCardDetailsChange('cardName', e.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Expiry date *</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="form-input"
                value={cardDetails.expiryDate}
                onChange={(e) => handleCardDetailsChange('expiryDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">CVV *</label>
              <input
                type="text"
                placeholder="123"
                maxLength={3}
                className="form-input"
                value={cardDetails.cvv}
                onChange={(e) => handleCardDetailsChange('cvv', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

<div
  style={{
    marginBottom: "24px",
    padding: "16px",
    background: "#f9fafb",
    borderRadius: "8px",
  }}
>
  <label className="form-checkbox" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <input
      type="checkbox"
      checked={agreedToTerms}
      onChange={(e) => setAgreedToTerms(e.target.checked)}
    />
    <span style={{ fontSize: "14px", color: "#6b7280" }}>
      I agree to the{" "}
      <Link
        to="/terms-transfer"
        style={{
          color: "#2563eb",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Terms and Conditions
      </Link>{" "}
      {/* and{" "}
      <Link
        to="/privacy"
        style={{
          color: "#2563eb",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Privacy Policy
      </Link> */}
    </span>
  </label>
</div>

      <div className="button-group">
        <button onClick={onBack} className="btn btn-back">
          ← Back
        </button>
        <button 
          onClick={handleCompleteBooking} 
          className="btn btn-primary"
        >
          Complete Booking
        </button>
      </div>
    </div>
  );
};

export default PaymentStep;