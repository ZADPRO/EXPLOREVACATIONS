import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";

export default function GeneralTandC() {
  const location = useLocation();
  const toast = useRef(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("global");

  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto mt-5 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-800">
          {t("general.h1")}
        </h1>

        <div className="space-y-6 text-gray-800 leading-relaxed text-justify">
          <p>
            <strong className="flex gap-4">{t("general.stg")}</strong>
            {t("general.p1.1")}
          </p>
          <p>{t("general.p1.2")} </p>
          <p>{t("general.p1.3")} </p>
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            {t("general.h2")}
          </h2>
          <p>
            <strong>(1)</strong> {t("general.p2.1")}.
          </p>
          <p>
            <strong>(2)</strong> {t("general.p2.2")}.
          </p>
          <p>{t("general.p2.3")}.</p>
          <p>{t("general.p2.4")}.</p>
          <p>{t("general.p2.5")}.</p>
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            {t("general.h3")}
          </h2>
          <p>
            <strong>(1)</strong> {t("general.p3.1")}:
          </p>
          <p>
            <strong>(a)</strong> {t("general.p3.2")}
          </p>
          <p>
            <strong>(b)</strong> {t("general.p3.3")}
          </p>
          <p>
            <strong>(c)</strong> {t("general.p3.4")}
          </p>
          <p>
            <strong>(d)</strong>
            {t("general.p3.5")}
          </p>
          <p>
            <strong>(2)</strong> {t("general.p3.6")}
          </p>
          <p>
            <strong>(3)</strong> {t("general.p3.7")}
          </p>
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            {t("general.h4")}
          </h2>
          <p>
            <strong>(1)</strong> {t("general.p4")}{" "}
          </p>
          <p>
            <strong>(2)</strong> {t("general.p4.1")}
          </p>
          <ul className="list-disc list-inside ml-6 space-y-1 text-gray-700">
            <li>{t("general.l4.1")} </li>
            <li>{t("general.l4.2")} </li>
            <li>{t("general.l4.3")}</li>
            <li> {t("general.l4.3")} </li>
          </ul>
          <p>{t("general.p5")}</p>
          <p>
            <strong>(3)</strong> {t("general.p5.1")}
          </p>
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            {t("general.h6")}{" "}
          </h2>
          <p>
            <strong>1</strong> {t("general.p6")}
            <a
              href="https://www.payrexx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              https://www.payrexx.com
            </a>
            . {t("general.p6.1")}
          </p>
          <p>
            <strong>2</strong>
            {t("general.p6.2")}
          </p>
          <ul className="list-disc list-inside ml-6 space-y-1 text-gray-700">
            <li>{t("general.l6")}</li>
            <li>{t("general.l6.1")}</li>
            <li>{t("general.l6.2")}</li>
          </ul>
          <p>
            <li>{t("general.p7")}</li>
          </p>
          <p>
            <strong>3</strong> <li>{t("general.p7.1")}</li>
          </p>
          <p>
            <strong>4</strong> {t("general.p7.2")}
          </p>
          <p>
            <strong>5</strong> {t("general.p7.3")}
          </p>
          <p>
            <strong>6</strong> {t("general.p7.5")}
          </p>
          <p>
            <strong>7</strong> {t("general.p7.4")}
          </p>
          <p>
            <strong>8</strong> {t("general.p7.8")}
          </p>
          <p>
            <strong>9</strong> {t("general.p7.9")}
          </p>
          <p>
            <strong>10</strong> {t("general.p7.10")}
          </p>
          <p>
            <strong>11</strong> {t("general.p7.11")}
          </p>
          <h3 className="text-2xl font-semibold mt-10 mb-4">
            {t("general.h8")}
          </h3>
          <p>
            <strong>12</strong> {t("general.p8")}
          </p>
          <p>
            <strong>13</strong> {t("general.p8.1")}
          </p>
          <p>
            <strong>14</strong> {t("general.p8.2")}
          </p>
          <p>
            <strong>15</strong> {t("general.p8.3")}
          </p>
          <p>
            <strong>16</strong> {t("general.p8.4")}
          </p>

          <h3 className="text-2xl font-semibold mt-10 mb-4">
            {t("general.h9")}
          </h3>
          <p>
            <strong>17</strong> {t("general.p9")}{" "}
          </p>
          <p>
            <strong>18</strong> {t("general.p9.1")}
          </p>
          <p>
            <strong>19</strong>
            {t("general.p9.2")}
          </p>
          <p>
            <strong>20</strong>
            {t("general.p9.3")}
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            {t("general.h10")}
          </h2>
          <p>
            <ul className="list-disc pl-6">
              <li>(1) {t("general.l10")}</li>
              <li>(2) {t("general.l10.1")}</li>
              <li>(3) {t("general.l10.2")}</li>
              <li>(4) {t("general.l10.3")}</li>
              <li>(5) {t("general.l10.4")}</li>
            </ul>{" "}
          </p>
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            {t("general.h11")}
          </h2>
          <p>
            <ul className="list-disc pl-6">
              <li>{t("general.l11.1")}</li>
              <li>{t("general.l11.2")}</li>
            </ul>{" "}
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            {t("general.h12")}
          </h2>
          <p>
            <ul className="list-disc pl-6">
              <li>
                {t("general.l12")}
              </li>
              <li>
                {" "}
             {t("general.l12.1")}
              </li>
              <li>
                {" "}
                {t("general.l12.2")}
              </li>
              <li>
                {" "}
               {t("general.l12.3")}
              </li>
            </ul>
          </p>
          <h2 className="text-2xl font-semibold mt-10 mb-4">   {t("general.h13")}</h2>

          <p>
            <ul className="list-disc pl-6">
              <li>
                (1)   {t("general.l13.1")}
              </li>
              <li>
                (2)  {t("general.l13.2")}
              </li>
            </ul>
            <h3> {t("general.h14")} </h3>
            <p>P.O. Box 1818024 ZurichPhone: +41 44 211 30 90 </p>
          </p>
          <h2 className="text-2xl font-semibold mt-10 mb-4">
          {t("general.h15")}
          </h2>
          <p>
            <ul className="list-disc pl-6">
              <li>
                (1) {t("general.l15.1")}
              </li>
              <li>
                (2) {t("general.l15.2")}
              </li>
              <li>
                (3) {t("general.l15.3")}
              </li>
            </ul>
          </p>
          <h2 className="text-2xl font-semibold mt-10 mb-4">
          {t("general.h16")}
          </h2>
          <p>
           {t("general.p16")}
          </p>
          <p>
            {t("general.p16.1")}  </p>
          <p>
           {t("general.p16.2")}
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            {t("general.h17")}
          </h2>
          <p>
            {t("general.p17.1")}
          </p>
          <p>
             {t("general.p17.2")}
          </p>
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            {t("general.h18")}
          </h2>
          <p>
            (1)   {t("general.p18.1")}
          </p>
          <p>
          {t("general.p18.2")}
          </p>
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            {t("general.h19")}
          </h2>
          <p>
            (1)  {t("general.p19")}
          </p>
          <p>
            (2)  {t("general.p19.1")}
          </p>

          <h2>
             {t("general.p19.2")}
          </h2>
        </div>
      </div>

      <Toast ref={toast} />
    </div>
  );
}
