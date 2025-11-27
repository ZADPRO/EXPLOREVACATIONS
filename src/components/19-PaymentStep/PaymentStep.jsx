import React, { useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dialog } from "primereact/dialog";



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

  const [showTerms, setShowTerms] = useState(false);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };
  const { t } = useTranslation("global");
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



      <h2>{t("pay.payment")}</h2>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontWeight: '500', marginBottom: '16px' }}>{t("pay.select_payment_method")}</h3>

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
            <span className="payment-name">{t("pay.credit_debit_card")}</span>
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
            <span className="payment-name">{t("pay.apple_pay")}</span>
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
            <span className="payment-name">{t("pay.google_pay")}</span>
          </label>
        </div>
      </div>

      {paymentMethod === 'card' && (
        <div style={{ marginBottom: '24px' }}>
          <div className="form-group">
            <label className="form-label">{t("pay.card_number")} *</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="form-input"
              value={cardDetails.cardNumber}
              onChange={(e) => handleCardDetailsChange('cardNumber', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">{t("pay.name_on_card")} *</label>
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
              <label className="form-label">{t("pay.expiry_date")} *</label>
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
          <span
            style={{ color: "#2563eb", textDecoration: "underline", cursor: "pointer" }}
            onClick={() => setShowTerms(true)}
          >
            {t("pay.terms_conditions")}
          </span>

          {/* <span style={{ fontSize: "14px", color: "#6b7280" }}>
      {t("pay.agree_to")}{" "}
      <Link
        to="/terms-transfer"
        style={{
          color: "#2563eb",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
       {t("pay.terms_conditions")}
      </Link>{" "}
     
    </span> */}
        </label>
      </div>

      <div className="button-group">
        <button onClick={onBack} className="btn btn-back">
          ← {t("extras.back")}
        </button>
        <button
          onClick={handleCompleteBooking}
          className="btn btn-primary"
        >
          {t("pay.book")}
        </button>
      </div>
   <Dialog
        header={t("termsTransfer.title")}
        visible={showTerms}
        style={{ width: "80vw", maxHeight: "90vh" }}
        modal
        onHide={() => setShowTerms(false)}
      >
        <div className="p-6 bg-gray-100  md:mt-[-60px] min-h-screen">
          {/* <h1 className="text-3xl font-bold mb-4 text-center">
        {t("termsTransfer.title")}
      </h1> */}

          <div className="space-y-4 text-justify">
            {/* 1 */}
            <h2 className="text-xl font-semibold mt-6">
              {t("termsTransfer.h1")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsTransfer.l1")}</li>
            </ul>

            {/* 2 */}
            <h2 className="text-xl font-semibold mt-6">
              {t("termsTransfer.h2")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsTransfer.l2")}</li>
              <li>{t("termsTransfer.l2.1")}</li>
              <li>{t("termsTransfer.l2.2")}</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">
              {t("termsTransfer.h3")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsTransfer.l3")}</li>
              <li>{t("termsTransfer.l3.1")}</li>
              <li>{t("termsTransfer.l3.2")}</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6">
              {t("termsTransfer.h4")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsTransfer.l4")}</li>
              <li>{t("termsTransfer.l4.1")}</li>
              <li>{t("termsTransfer.l4.2")}</li>
              <li>{t("termsTransfer.l4.3")}</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6">
              {t("termsTransfer.h5")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsTransfer.l5")}</li>
              <li>{t("termsTransfer.l5.1")}</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6">
              {t("termsTransfer.h6")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsTransfer.l6")}</li>
              <li>{t("termsTransfer.l6.1")}</li>
              <li>{t("termsTransfer.l6.2")}</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6">
              {t("termsTransfer.h7")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsTransfer.l7")}</li>
              <li>{t("termsTransfer.l7.1")}</li>
              <li>{t("termsTransfer.l7.2")}</li>
            </ul>

            {/* 8 */}
            <h2 className="text-xl font-semibold mt-6">
              {t("termsTransfer.h8")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsTransfer.l8")}</li>
              <li>{t("termsTransfer.l8.1")}</li>
              <li>{t("termsTransfer.l8.2")}</li>
              <li>{t("termsTransfer.l8.3")}</li>
            </ul>

            {/* 9 */}
            <h2 className="text-xl font-semibold mt-6">
              {t("termsTransfer.h9")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsTransfer.l9")}</li>
              <li>{t("termsTransfer.l9.1")}</li>
            </ul>

            {/* 10 */}
            <h2 className="text-xl font-semibold mt-6">
              {t("termsTransfer.h10")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsTransfer.l10")}</li>
              <li>{t("termsTransfer.l10.1")}</li>
              <li>{t("termsTransfer.l10.2")}</li>
            </ul>

            {/* 11 */}
            <h2 className="text-xl font-semibold mt-6">
              {t("termsTransfer.h11")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsTransfer.l11")}</li>
              <li>{t("termsTransfer.l11.1")}</li>
            </ul>

            {/* 12 */}
            <h2 className="text-xl font-semibold mt-6">
              {t("termsTransfer.h12")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsTransfer.l12")}</li>
              <li>{t("termsTransfer.l12.1")}</li>
              <li>{t("termsTransfer.l12.2")}</li>
              <li>{t("termsTransfer.l12.3")}</li>
            </ul>

            {/* 13 */}
            <h2 className="text-xl font-semibold mt-6">
              {t("termsTransfer.h13")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsTransfer.l13")}</li>
              <li>{t("termsTransfer.l13.1")}</li>
            </ul>

            {/* 14 */}
            <h2 className="text-xl font-semibold mt-6">
              {t("termsTransfer.h14")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsTransfer.l14")}</li>
              <li>{t("termsTransfer.l14.1")}</li>
            </ul>

            {/* 15 */}
            <h2 className="text-xl font-semibold mt-6">
              {t("termsTransfer.h15")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsTransfer.l15")}</li>
              <li>{t("termsTransfer.l15.1")}</li>
            </ul>

            {/* 16 */}
            <h2 className="text-xl font-semibold mt-6">
              {t("termsTransfer.h16")}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("termsTransfer.l16")}</li>
              <li>{t("termsTransfer.l16.1")}</li>
            </ul>

            <p className="text-center text-gray-600 mt-10">
              © 2025 ZüriCar GO – All rights reserved.
            </p>
          </div>
        </div>
      </Dialog>

    </div>
  );
};

export default PaymentStep;