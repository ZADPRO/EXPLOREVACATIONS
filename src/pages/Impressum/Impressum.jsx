import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Impressum() {
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
      {/* <h2 className="text-xl font-semibold mb-5 flex justify-center">
        {t("imprint.title")}
      </h2> */}

      <p className="mt-3">
        <strong>ZüriCar GO GmbH</strong>
      </p>
      <p>{t("imprint.address1")}</p>
      <p>{t("imprint.address2")}</p>
      <p>{t("imprint.address3")}</p>

      <h3 className="text-lg font-semibold mt-6">{t("imprint.contactTitle")}</h3>
      <ul className="list-disc pl-6 space-y-2 mt-2">
        <li>{t("imprint.phone")}</li>
        <li>{t("imprint.email")}</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">{t("imprint.registerTitle")}</h3>
      <ul className="list-disc pl-6 space-y-2 mt-2">
        <li>{t("imprint.registeredName")}</li>
        <li>{t("imprint.companyId")}</li>
        <li>{t("imprint.vat")}</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">
        {t("imprint.authorizedTitle")}
      </h3>
      <ul className="list-disc pl-6 space-y-2 mt-2">
        <li>{t("imprint.authorized1")}</li>
        <li>{t("imprint.authorized2")}</li>
      </ul>

      <hr className="my-6 border-gray-300" />

      <h3 className="text-lg font-semibold mt-4">{t("imprint.disclaimerTitle")}</h3>
      <p className="mt-3">{t("imprint.disclaimerText1")}</p>
      <p className="mt-3">{t("imprint.disclaimerText2")}</p>
      <p className="mt-3">{t("imprint.disclaimerText3")}</p>

      <hr className="my-6 border-gray-300" />

      <h3 className="text-lg font-semibold mt-4">{t("imprint.linksTitle")}</h3>
      <p className="mt-3">{t("imprint.linksText")}</p>

      <hr className="my-6 border-gray-300" />

      <h3 className="text-lg font-semibold mt-4">{t("imprint.copyrightTitle")}</h3>
      <p className="mt-3">{t("imprint.copyrightText1")}</p>
      <p className="mt-3">{t("imprint.copyrightText2")}</p>
    </div>
  </div>
);
}
