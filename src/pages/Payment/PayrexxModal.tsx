import React, { useEffect } from "react";

const PayrexxModal = () => {
  useEffect(() => {
    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(`Failed to load script: ${src}`);
        document.body.appendChild(script);
      });

    const loadPayrexx = async () => {
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
        );
        await loadScript("https://media.payrexx.com/modal/v1/gateway.min.js");

        if ((window as any).jQuery) {
          (window as any).jQuery(".payrexx-modal-window").payrexxModal();
        }
      } catch (err) {
        console.error("Payrexx modal load error:", err);
      }
    };

    loadPayrexx();
  }, []);

  return (
    <a
      className="payrexx-modal-window"
      href="#"
      data-href="https://explorevacationsag.payrexx.com/en/?tid=bf8c0a33"
    >
      {" "}
      Pay Now
    </a>
  );
};

export default PayrexxModal;
