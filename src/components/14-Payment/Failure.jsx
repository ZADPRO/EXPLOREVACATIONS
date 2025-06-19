import React,{ useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const transactionId = new URLSearchParams(location.search).get(
    "transactionId"
  );

  useEffect(() => {
    console.warn("Payment failed. Transaction ID:", transactionId);

    const timer = setTimeout(() => navigate("/"), 5000);
    return () => clearTimeout(timer);
  }, [navigate, transactionId]);
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>❌ Payment Failed</h1>
      <p style={styles.message}>Transaction ID: {transactionId}</p>
      <p style={styles.message}>
        Something went wrong. You will be redirected shortly.
      </p>
      <p style={styles.message}>
        There was a microphone issue, so the audio was not audible at that time.
      </p>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#ffe6e6",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    marginTop: "100px",
    width: "80%",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 0 15px rgba(255, 0, 0, 0.2)",
  },
  title: {
    color: "#c62828",
    fontSize: "28px",
    fontWeight: "bold",
  },
  message: {
    color: "#d32f2f",
    fontSize: "18px",
    marginTop: "10px",
  },
};
export default Failure;
