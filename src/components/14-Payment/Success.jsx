import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Axios from "axios";

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const transactionId = searchParams.get("transaction_id");

  useEffect(() => {
    (async () => {
      if (!transactionId) {
        console.log("transactionId failure. Transaction ID:", transactionId);
        return navigate("/Failure");
      }
      const formDataString = localStorage.getItem("formData");

      if (!formDataString) {
        console.log("formDataString failure. Transaction ID:", formDataString);
        return navigate("/failure");
      }
      const paymentData = JSON.parse(formDataString);
      if (!paymentData || !paymentData.api || !paymentData.payload) {
        console.log("Payload failure");
        return navigate("/failure");
      }

      try {
        await Axios.post(
          paymentData.api,
          { ...paymentData.payload, transactionId },

          {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );

        localStorage.removeItem("formData");
      } catch (error) {
        console.error("API Error:", error);
      }

      const timer = setTimeout(() => navigate("/"), 5000);
      return () => clearTimeout(timer);
    })();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎉 Payment Successful!</h1>
      <p style={styles.message}>Transaction ID: {transactionId}</p>
      <p style={styles.message}>
        Thank you for your payment. You will be redirected shortly.
      </p>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#e6ffe6",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    marginTop: "100px",
    width: "80%",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 0 15px rgba(0, 200, 0, 0.2)",
  },
  title: {
    color: "#2e7d32",
    fontSize: "28px",
    fontWeight: "bold",
  },
  message: {
    color: "#388e3c",
    fontSize: "18px",
    marginTop: "10px",
  },
};

export default Success;
