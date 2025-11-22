import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Cookies() {
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
      {/* <div className="max-w-5xl mx-auto mt-5 bg-white p-6 rounded shadow-md"> */}
        <h2 className="text-xl font-semibold mb-5 mt-5 md:mt-0 flex justify-center">
          {t("cookies.title")}
        </h2>

        <p className="mt-3">{t("cookies.intro")}</p>

        <h3 className="text-lg font-semibold mt-6">{t("cookies.whatTitle")}</h3>
        <p className="mt-3">{t("cookies.whatDesc")}</p>

        <h3 className="text-lg font-semibold mt-6">{t("cookies.whyTitle")}</h3>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>{t("cookies.why1")}</li>
          <li>{t("cookies.why2")}</li>
          <li>{t("cookies.why3")}</li>
          <li>{t("cookies.why4")}</li>
          <li>{t("cookies.why5")}</li>
        </ul>

        <h3 className="text-lg font-semibold mt-6">{t("cookies.typesTitle")}</h3>
        <ol className="list-decimal pl-6 space-y-2 mt-2">
          <li>
            <strong>{t("cookies.essentialTitle")} </strong> {t("cookies.essentialDesc")}
          </li>
          <li>
            <strong>{t("cookies.performanceTitle")} </strong> {t("cookies.performanceDesc")}
          </li>
          <li>
            <strong>{t("cookies.functionalTitle")} </strong> {t("cookies.functionalDesc")}
          </li>
          <li>
            <strong>{t("cookies.advertisingTitle")} </strong> {t("cookies.advertisingDesc")}
          </li>
        </ol>

        <h3 className="text-lg font-semibold mt-6">{t("cookies.manageTitle")}</h3>
        <p className="mt-3">{t("cookies.manageDesc1")}</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>{t("cookies.manage1")}</li>
          <li>{t("cookies.manage2")}</li>
          <li>{t("cookies.manage3")}</li>
        </ul>
        <p className="mt-3">{t("cookies.manageNote")}</p>

        <h3 className="text-lg font-semibold mt-6">{t("cookies.updateTitle")}</h3>
        <p className="mt-3">{t("cookies.updateDesc")}</p>

        <h3 className="text-lg font-semibold mt-6">{t("cookies.contactTitle")}</h3>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>📍 ZüriCar GmbH, Europa-Strasse 19 ,8152 Glattbrugg (ZH),Switzerland</li>
          <li>📧 info@zuricar.ch</li>
          <li>🌐 https://zuericar.com/</li>
        </ul>
      {/* </div> */}
    </div>
  );
}
