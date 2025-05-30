import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";

import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
// import "primereact/resources/themes/lara-light-indigo/theme.css";

// import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
// import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
// import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
// import "primereact/resources/themes/bootstrap4-dark-purple/theme.css";
// import "primereact/resources/themes/md-light-indigo/theme.css";
// import "primereact/resources/themes/md-light-deeppurple/theme.css";
// import "primereact/resources/themes/md-dark-indigo/theme.css";
// import "primereact/resources/themes/md-dark-deeppurple/theme.css";
// import "primereact/resources/themes/mdc-light-indigo/theme.css";
// import "primereact/resources/themes/mdc-light-deeppurple/theme.css";
// import "primereact/resources/themes/mdc-dark-indigo/theme.css";
// import "primereact/resources/themes/mdc-dark-deeppurple/theme.css";
// import "primereact/resources/themes/tailwind-light/theme.css";
// import "primereact/resources/themes/fluent-light/theme.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/themes/lara-light-purple/theme.css";
// import "primereact/resources/themes/lara-light-teal/theme.css";
// import "primereact/resources/themes/lara-dark-blue/theme.css";
// import "primereact/resources/themes/lara-dark-indigo/theme.css";
// import "primereact/resources/themes/lara-dark-purple/theme.css";
// import "primereact/resources/themes/lara-dark-teal/theme.css";
// import "primereact/resources/themes/soho-light/theme.css";
// import "primereact/resources/themes/soho-dark/theme.css";
// import "primereact/resources/themes/viva-light/theme.css";
// import "primereact/resources/themes/viva-dark/theme.css";
// import "primereact/resources/themes/mira/theme.css";
// import "primereact/resources/themes/nano/theme.css";
// import "primereact/resources/themes/saga-blue/theme.css";
// import "primereact/resources/themes/saga-green/theme.css";
// import "primereact/resources/themes/saga-orange/theme.css";
// import "primereact/resources/themes/saga-purple/theme.css";
// import "primereact/resources/themes/vela-blue/theme.css";
// import "primereact/resources/themes/vela-green/theme.css";
// import "primereact/resources/themes/vela-orange/theme.css";
// import "primereact/resources/themes/vela-purple/theme.css";
// import "primereact/resources/themes/arya-blue/theme.css";
// import "primereact/resources/themes/arya-green/theme.css";
// import "primereact/resources/themes/arya-orange/theme.css";
// import "primereact/resources/themes/arya-purple/theme.css";

import global_english from "./lang/en/global.json";
import global_german from "./lang/de/global.json";
import global_french from "./lang/fr/global.json";
import global_italian from "./lang/it/global.json";

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

i18next.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem("language") ? localStorage.getItem("language"): "en",
  resources: {
    de: {
      global: global_german,
    },
    en: {
      global: global_english,
    },
    fr: {
      global: global_french,
    },
    it: {
      global: global_italian,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrimeReactProvider>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </PrimeReactProvider>
  </StrictMode>
);
