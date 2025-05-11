import React, { useState, useEffect } from "react";
import bg from "../../assets/Popup/bg.png";
import { FaCircleArrowRight } from "react-icons/fa6";

export default function Popup() {
  const [showPopup, setShowPopup] = useState(false);


  const handleOkClick = () => {
    setShowPopup(false);
    window.location.href = "/login";
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const roleId = localStorage.getItem("roleId"); // Assuming roleId is stored in localStorage
  
  //   // If the user is logged in and roleId is 3, stop showing the popup
  //   if (token && roleId === "3") return; // Role ID 3 means no popup
  
  //   const timer = setTimeout(() => {
  //     setShowPopup(true);
  //   }, 5000); // 5 seconds delay
  
  //   return () => clearTimeout(timer);
  // }, []);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("roleId");
  
    if (token && roleId === "3") return;
  
    const popupCount = parseInt(localStorage.getItem("loginPopupCount")) || 0;
  
    if (popupCount < 3) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem("loginPopupCount", popupCount + 1);
      }, 5000);
  
      return () => clearTimeout(timer);
    }
  }, []);
  
  

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-[10px] bg-black/30 z-[9999]">
          <div
            className="
              w-[90%] 
              max-w-[500px] 
              bg-cover 
              bg-center 
              rounded-[12px] 
              h-[300px]
              text-center 
              font-sans 
              relative
            "
            style={{ backgroundImage: `url(${bg})` }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-4 cursor-pointer text-white hover:text-white text-2xl font-bold"
            >
              &times;
            </button>

            <div className="flex flex-col justify-end h-full ">
           

              {/* Login Button */}
              <div className="flex  justify-center items-end pb-3 h-full ">
                <button
                  onClick={handleOkClick}
                  className="bg-[#184759] h-[40px] hover:bg-[#4b7a8f] text-white font-bold w-[100px]  rounded-4xl text-base"
                >
                  Login 

                  {/* Login <div className="absolute lg:bottom-[22px] lg:left-67 md:bottom-[22px] md:left-67 bottom-[22px] left-45 text-3xl">
                  <FaCircleArrowRight />
                  </div> */}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
