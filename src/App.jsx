import MainRoutes from "./components/00-MainRoutes/MainRoutes";
import "./App.css";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      mirror: true,
      anchorPlacement: "top-bottom",
    });
  }, []);
  return (
    <>
      <MainRoutes />
    </>
  );
}

export default App;
