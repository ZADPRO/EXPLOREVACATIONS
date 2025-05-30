import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Privacy() {
  const location = useLocation();
  const toast = useRef(null);
  const navigate = useNavigate();

  const getFlag = () => {
    switch (language) {
      case "en":
        return flagEN;
      case "de":
        return flagDE;
      case "fr":
        return flagFR;
      case "it":
        return flagIT;
      default:
        return flagEN;
    }
  };

  const { t, i18n } = useTranslation("global");

  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto mt-5 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mt-2 mb-5 flex justify-center">
          {t("privacy.privacy")}
        </h2>
        <p>{t("privacy.p1")}</p>

        <h2 className="text-xl font-semibold mt-6">{t("privacy.title1")}</h2>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>
            {t("privacy.sub1")}
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>{t("privacy.l1")}</li>
              <li> {t("privacy.l2")}</li>
              <li>{t("privacy.l3")}</li>
            </ul>
          </li>
        </ul>
        <p className="mt-3">{t("privacy.content1")}</p>
        <h2 className="text-xl font-semibold mt-6">{t("privacy.title2")}</h2>

        <p className="mt-3">{t("privacy.sub2.1")}</p>

        <p className="mt-3">{t("privacy.sub2.2")}</p>
        <p className="mt-3">{t("privacy.sub2.3")}</p>

        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>{t("privacy.l4")}</li>
        </ul>
        <p className="mt-3">
          {t("privacy.p4")}
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>{t("privacy.l5")}</li>
          </ul>
        </p>
        <p className="mt-3">
          {t("privacy.p5")}
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>{t("privacy.l6")}</li>
          </ul>
        </p>
        <p className="mt-3">
          {t("privacy.p6")}
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>{t("privacy.l7")}</li>
          </ul>
        </p>
        <p className="mt-3">
          {t("privacy.p7")}
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>{t("privacy.l8")}</li>
          </ul>
        </p>
        <p className="mt-3">
          {t("privacy.p8")}
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>{t("privacy.l9")}</li>
          </ul>
        </p>

        <p className="mt-3">
          {t("privacy.p9")}
          <li> {t("privacy.l10")} </li>
        </p>

        <p className="mt-3">
          {t("privacy.p10")}
          <li> {t("privacy.l11")} </li>
        </p>
        <p className="mt-3">
          {t("privacy.p11")}
          <li>{t("privacy.l12")}</li>
        </p>
        <p>{t("privacy.p12")}</p>

        <p className="mt-2">{t("privacy.p12.1")}</p>

        <p className="mt-2">{t("privacy.p12.2")} </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>{t("privacy.l13")}</li>
          <li>{t("privacy.l13.1")}</li>
          <li>{t("privacy.l13.2")}</li>
          <li>{t("privacy.l13.3")}</li>
          <li>{t("privacy.l13.4")}</li>
          <li>{t("privacy.l13.5")}</li>
          <li>{t("privacy.l13.6")}</li>
          <li>{t("privacy.l13.7")}</li>
          <li>{t("privacy.l13.8")}</li>
          <li>{t("privacy.l13.9")}</li>
          <li>{t("privacy.l13.10")}</li>
          <li>{t("privacy.l13.11")}</li>
        </ul>

        <p className="mt-4">{t("privacy.p14")} </p>

        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li> {t("privacy.l14")}</li>
          <li>{t("privacy.l14.1")}</li>
          <li> {t("privacy.l14.2")}</li>
          <li> {t("privacy.l14.3")}</li>
          <li>{t("privacy.l14.4")}</li>
          <li>{t("privacy.l14.5")}</li>
          <li>{t("privacy.l14.6")}</li>
        </ul>

        <h3 className="text-lg font-semibold mt-6">{t("privacy.h15")}</h3>
        <p className="mt-2">{t("privacy.p15")}</p>

        <h3 className="text-lg font-semibold mt-6"> {t("privacy.h16")}</h3>
        <p className="mt-2">{t("privacy.p16")}</p>

        <p className="mt-2"> {t("privacy.h16.1")}</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>{t("privacy.l16")}</li>
          <li>{t("privacy.l16.1")}</li>
          <li>{t("privacy.l16.2")}</li>
        </ul>

        <p className="mt-2">{t("privacy.p17")}</p>

        <h2 className="text-xl font-semibold mt-6">{t("privacy.h17")} </h2>
        <p className="mt-2">
          <strong> {t("privacy.p18")}</strong>
        </p>

        <h2 className="text-xl font-semibold mt-6">{t("privacy.h18")}</h2>
        <p className="mt-2">{t("privacy.p19")}</p>
        <p className="mt-2">{t("privacy.p19.1")}</p>

        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>{t("privacy.l20")}</li>
          <li>{t("privacy.l20.1")}</li>
          <li> {t("privacy.l20.2")}</li>
          <li>{t("privacy.l20.3")}</li>
          <li>{t("privacy.l20.4")}</li>
          <li>{t("privacy.l20.5")}</li>
          <li>{t("privacy.l20.6")}</li>
          <li>{t("privacy.l20.7")}</li>
          <li>{t("privacy.l20.8")}</li>
          <li>{t("privacy.l20.9")}</li>
          <li>{t("privacy.l20.10")}</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6">{t("privacy.h21")}</h2>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>
            {t("privacy.l21.1")}
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>{t("privacy.l21.2")}</li>
              <li>{t("privacy.l21.3")}</li>
              <li>{t("privacy.l21.4")}</li>
            </ul>
          </li>
          <li>
            {t("privacy.l21.5")}
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>{t("privacy.l21.51")}</li>
              <li>{t("privacy.l21.6")}</li>
              <li>{t("privacy.l21.7")}</li>
              <li>{t("privacy.l21.8")} </li>
            </ul>
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">{t("privacy.h23")}</h2>
        <p className="mt-3">{t("privacy.p23")} </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>{t("privacy.l23.1")} </li>
          <li>{t("privacy.l23.2")} </li>
          <li>{t("privacy.l23.3")} </li>
          <li>{t("privacy.l23.4")} </li>
          <li>{t("privacy.l23.5")} </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">{t("privacy.h24")}</h2>
        <p className="mt-3">{t("privacy.p24")} </p>
        <p className="mt-2">{t("privacy.p24.1")} </p>
        <p className="mt-2">{t("privacy.p24.2")} </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>{t("privacy.l24")} </li>
          <li>{t("privacy.l24.1")}</li>
        </ul>
        <p className="mt-2">{t("privacy.p24.3")} </p>

        <h2 className="text-xl font-semibold mt-6">{t("privacy.h25")}</h2>
        <p className="mt-3">{t("privacy.p25.1")}</p>

        <h2 className="text-xl font-semibold mt-6">{t("privacy.h26")}</h2>
        <p className="mt-3">{t("privacy.p26")}</p>

        <p className="mt-2">{t("privacy.p26.1")}</p>

        <h2 className="text-xl font-semibold mt-6">{t("privacy.h27")}</h2>
        <p className="mt-3">{t("privacy.h27.1")}</p>
        <p className="mt-2">{t("privacy.h27.2")}</p>

        <h2 className="text-xl font-semibold mt-6">----------</h2>
        <p className="mt-3">{t("privacy.h28")}</p>
        <p className="mt-2">{t("privacy.h28.1")}</p>

        <h3 className="text-lg font-semibold mt-4">– {t("privacy.h29")}</h3>
        <p className="mt-2">{t("privacy.p30")}</p>

        <h3 className="text-lg font-semibold mt-4">{t("privacy.h31")}</h3>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li> {t("privacy.l31.1")}</li>
          <li> {t("privacy.l31.2")}</li>
          <li> {t("privacy.l31.3")}</li>
          <li> {t("privacy.l31.4")}</li>
          <li> {t("privacy.l31.5")}</li>
        </ul>

        <h3 className="text-lg font-semibold mt-4">{t("privacy.h32")}</h3>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>{t("privacy.l32.1")}</li>
          <li>{t("privacy.l32.2")}</li>
          <li>{t("privacy.l32.3")}</li>
          <li>{t("privacy.l32.4")}</li>
          <li>{t("privacy.l32.5")}</li>
          <li>{t("privacy.l32.6")}</li>
          <li>{t("privacy.l32.7")}</li>
          <li> {t("privacy.l32.8")}</li>
          <li> {t("privacy.l32.9")}</li>
          <li>{t("privacy.l40")}</li>
          <li>{t("privacy.l40.1")}</li>
        </ul>

        <h3 className="text-lg font-semibold mt-4">– Contact Information</h3>
        <p className="mt-2">For privacy-related inquiries, contact us at:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Company Name: Explore Vacation AG</li>
          <li>Support Email: diestale@explorevacations.ch</li>
          <li>Phone Number: +41 763109960</li>
          <li>Developed By: https://explorevacations.max-idigital.ch/</li>
        </ul>
      </div>
    </div>
  );
}
