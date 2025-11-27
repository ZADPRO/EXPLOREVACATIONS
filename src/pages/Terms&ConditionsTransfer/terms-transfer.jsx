import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";

export default function TermsTransfer() {

  const navigate = useNavigate();

  const { t } = useTranslation("global");



  return (
    <div className="p-6 bg-gray-100  md:mt-10 min-h-screen">
      {/* <div className="max-w-5xl mx-auto mt-5 bg-white p-6 rounded shadow-md"> */}
      <h1 className="text-3xl font-bold mb-4 text-center">
        {t("termsTransfer.title")}
      </h1>
      <button
        onClick={() => navigate("/BookingFlow", { state: { goToStep: 4 } })}
        className="btn btn-back flex items-center gap-2 mb-6 text-blue-600 font-semibold"
      >
        ← {t("extras.back")}
      </button>
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
    // </div>
  );
}
