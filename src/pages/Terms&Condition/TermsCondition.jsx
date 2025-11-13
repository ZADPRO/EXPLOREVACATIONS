import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";
export default function TermsCondition() {
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
        <h1 className="text-3xl font-bold mb-4">{t("terms.rent")}</h1>

        <div className="space-y-4 text-justify">
          <h2 className="text-xl font-semibold mt-6">{t("terms.Parties")}</h2>
          <li className="list-disc pl-6 space-y-2">{t("terms.l1")} </li>
          <h2 className="text-[15px] font-semibold mt-6">{t("terms.h1")} </h2>
          <ul className="list-disc pl-6 space-y-2 ">
            <li>{t("terms.l2")} </li>
            <li>{t("terms.l2.1")} </li>
            <li>{t("terms.l2.2")} </li>
            <li>{t("terms.l2.3")} </li>

            <li>{t("terms.l2.4")} </li>
            <li>{t("terms.l2.5")} </li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">{t("terms.h3")}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong> {t("terms.stg")} :</strong>
              <ul className="list-disc pl-6">
                <li>{t("terms.l3")}</li>
                <li>
                  {t("terms.l3.1")} email to: <br />
                  ZüriCar GmbH,Europa-Strasse 19 ,8152 Glattbrugg (ZH),
                  Zürich, Schweiz
                  <br />
                  Call: +41 76 495 90 10
                  <br />
                  {t("terms.l3.2")}:{" "}
                  <a
                    href="mailto:info@zuricar.ch"
                    className="text-[#0062c4] underline"
                  >
                    info@zuricar.ch
                  </a>
                </li>
                <li> {t("terms.l3.3")}.</li>
              </ul>
            </li>

            <li>
              <strong> {t("terms.stg4")}:</strong>
              <ul className="list-disc pl-6">
                <li>{t("terms.l4")}</li>
                <li>{t("terms.l4.1")} </li>
                <li>{t("terms.l4.2")}</li>
                <li>
                  {t("terms.l4.3")}{" "}
                  <ul className="list-disc pl-6">
                    <li>{t("terms.l4.4")}</li>
                    <li>{t("terms.l4.5")}</li>
                    <li>{t("terms.l4.6")}</li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              {t("terms.l4.7")}{" "}
              <a
                href="https://zuericar.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                https://zuericar.com/
              </a>
              {t("terms.a5")}
              <ul className="list-disc pl-6">
                <li>{t("terms.l5")} </li>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:info@zuricar.ch"
                    className="text-blue-600 underline"
                  >
                    info@zuricar.ch
                  </a>
                </li>
              </ul>
            </li>

            <li>{t("terms.l5.5")} </li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">{t("terms.h6")}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("terms.l6.1")} </li>
            <li>{t("terms.l6.2")} </li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">{t("terms.h7")} </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("terms.l7.1")} </li>
            <li>{t("terms.l7.2")} </li>
            <li>
              {t("terms.l7.3")}
              <ul className="list-disc pl-6">
                <li>{t("terms.l7.4")} </li>
                <li>{t("terms.l7.5")} </li>
              </ul>
            </li>
            <li>{t("terms.l7.6")}</li>
            <li>{t("terms.l7.7")} </li>
            <li>{t("terms.l7.8")} </li>
            <li>{t("terms.l7.9")} </li>
          </ul>
          <h2 className="text-xl font-semibold mt-6"> {t("terms.h8")}</h2>
          <li>{t("terms.l8.1")}</li>
          <li>
            {t("terms.l8.2")}
            <ul className="list-disc pl-6 space-y-1">
              <li> {t("terms.l8.3")}</li>
              <li> {t("terms.l8.4")}</li>
              <li> {t("terms.l8.5")}</li>
              <li> {t("terms.l8.6")}</li>
            </ul>
          </li>
          <li>{t("terms.l8.7")}</li>
          <li>{t("terms.l8.8")}</li>
          <li>{t("terms.l8.9")}</li>
          <h2 className="text-xl font-semibold mt-6"> {t("terms.h9")}</h2>
          <br />
          {t("terms.h9.1")}
          <a
            href="https://zuericar.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://zuericar.com/
          </a>{" "}
          {t("terms.h9.2")}
          <li>{t("terms.l9")}</li>
          <li>{t("terms.l9.1")}</li>
          <h2 className="text-xl font-semibold mt-6"> {t("terms.h10")}</h2>
          <br />
          <li> {t("terms.l10.1")}</li>
          <li>
            {t("terms.l10.2")}{" "}
            <a
              href="https://zuericar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              https://zuericar.com/
            </a>{" "}
            {t("terms.l10.3")}
          </li>
          <li>{t("terms.l10.4")} </li>
          <h2 className="text-xl font-semibold mt-6">{t("terms.l10.5")}</h2>
          <li>
            <strong> {t("terms.l10.6")} </strong>
            <br />
            {t("terms.l10.7")}
          </li>
          <li>
            <strong> {t("terms.l10.8")} </strong>
            <br />
            {t("terms.l10.9")}
          </li>
          <li>
            <strong>{t("terms.l11")} </strong>
            <br />
            {t("terms.l11.1")}
          </li>
          <li>{t("terms.l11.2")}</li>
          <li>
            <strong>{t("terms.l12")} </strong>
            <br />
            {t("terms.l12.1")}{" "}
          </li>
          <li>{t("terms.l12.2")}</li>
          <li>{t("terms.l12.3")}</li>
          <h2 className="text-xl font-semibold mt-6">{t("terms.h13")} </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("terms.l13")} </li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">{t("terms.h14")}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("terms.l14")}</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6"> {t("terms.h15")}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("terms.l15.1")}</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">{t("terms.h16")}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("terms.l16")}</li>
            <li>{t("terms.l16.1")}</li>
            <li>{t("terms.l16.2")}</li>
            <li>{t("terms.l16.3")} </li>
            <li>{t("terms.l16.4")}</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">{t("terms.h17")}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("terms.l17.1")}</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">{t("terms.h18")} </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("terms.l18")}</li>
            <li>{t("terms.l18.1")}</li>
            <li>{t("terms.l18.2")}</li>
            <li>{t("terms.l18.3")}</li>
            <li>{t("terms.l18.4")}</li>
            <li>{t("terms.l18.5")} </li>
            <li>{t("terms.l18.6")}</li>
            <li>{t("terms.l18.7")} </li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">{t("terms.h19")}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("terms.l19.1")}</li>
            <li>{t("terms.l19.2")}</li>
            <li>{t("terms.l19.3")}</li>
            <li>{t("terms.l19.4")}</li>
            <li>{t("terms.l19.5")}</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">{t("terms.h20")}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("terms.l20.1")}</li>
            <li>{t("terms.l20.2")}</li>
            <li>{t("terms.l20.3")} </li>
            <li>{t("terms.l20.4")} </li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">{t("terms.h21")} </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong> {t("terms.l21.1")}</strong>
            </li>

            <li>
              <strong>{t("terms.stg22")}:</strong>
              {t("terms.stg22.1")}:
              <ul className="list-disc pl-6">
                <li>{t("terms.l22")}</li>
                <li>{t("terms.l22.1")} </li>
                <li>{t("terms.l22.2")}</li>
              </ul>
            </li>

            <li>
              <strong> {t("terms.stg23")}:</strong>

              <ul>
                <li>{t("terms.l23")}</li>
              </ul>
            </li>
            <li>
              <strong> {t("terms.l23.1")}</strong>

              <ul>
                <li>{t("terms.l23.2")} </li>
              </ul>
            </li>

            <li>
              <strong> {t("terms.stg24")}:</strong>{" "}
            </li>

            <li>
              <ul>
                <li>
                  {t("terms.l24")}
                  <li>{t("terms.l24.1")}</li>
                  <li>{t("terms.l24.2")} </li>
                </li>
              </ul>

              <li>{t("terms.l24.3")}</li>
              <li>{t("terms.l24.4")}</li>
              <li>
                <ul>
                  <li>{t("terms.l24.5")} </li>
                  <li>{t("terms.l24.6")}</li>
                  <li>{t("terms.l24.7")}</li>
                  <li>{t("terms.l24.8")}</li>
                  <li>{t("terms.l24.9")}</li>
                  <li>{t("terms.l24.10")}</li>
                </ul>

                <li>{t("terms.l24.11")} </li>
                <ul>
                  <li>{t("terms.l24.12")}</li>
                </ul>
              </li>
            </li>
          </ul>
          <h2 className="text-xl font-semibold mt-6"> {t("terms.h25")} </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("terms.l25.1")} </li>
            <li>{t("terms.l25.2")}</li>
            <li>{t("terms.l25.3")}</li>
            <li>{t("terms.l25.4")}</li>
            <li>{t("terms.l25.5")}</li>
            <li>{t("terms.l25.6")}</li>
            <li>{t("terms.l25.7")}</li>
            <li>{t("terms.l25.8")}</li>
            <li>{t("terms.l25.9")}</li>
            <li>{t("terms.l25.10")} </li>
            <li>{t("terms.l25.11")}</li>
            <li>{t("terms.l25.12")} </li>
          </ul>
          <h2 className="text-xl font-semibold mt-6"> {t("terms.h26")} </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("terms.l26")}</li>
            <li>{t("terms.l26.1")}</li>

            <li>{t("terms.l26.2")}</li>
            <li>{t("terms.l26.3")}</li>
            <li>{t("terms.l26.4")}</li>
            <li>{t("terms.l26.5")}</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6"> {t("terms.h27")} </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("terms.l27")} </li>

            <li>{t("terms.l27.1")} </li>

            <li>{t("terms.l27.2")} </li>

            <li>{t("terms.l27.3")}</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">{t("terms.h28")}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("terms.l28")}</li>
            <li>{t("terms.l28.1")} </li>
          </ul>
          <h2 className="text-xl font-semibold mt-6">{t("terms.l28.2")}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("terms.l28.3")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
