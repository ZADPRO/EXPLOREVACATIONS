import React, { useRef, useState } from "react";
import {  useNavigate } from "react-router-dom";

import image from "../../assets/Signup/sign.jpg";
import "./Signup.css";
import Axios from "axios";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import decrypt from "../../helper";
import { useTranslation } from "react-i18next";

export default function Signup() {


      const getFlag = () => {
        switch (language) {
          case "en":
            return flagEN;
          case "de":
            return flagDE;
          default:
            return flagEN;
        }
      };
    
      const { t, i18n } = useTranslation("global");
    
      const handleChangeLang = (lang) => {
        i18n.changeLanguage(lang);
      };
  // const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState(null);
  //  const [showMessage, setShowMessage] = useState(false);

  const [_ismodelOpen, setIsModelOpen] = useState(false);
  const handleNavigation = (path) => {
    navigate(path);
  };
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Created Account Successfully ",
      life: 3000,
    });
  };

  // "temp_password": "Test@1234",
  // "refFName": "Alice",
  // "refLName": "Johnson",
  // "refDOB": "1995-06-15",
  // "refUserEmail": "indumathi123indumathi@gmail.com",
  // "refMoblile": "976553110"

  const handleSubmit = async () => {
    try {
      const response = await Axios.post(
        import.meta.env.VITE_API_URL + "/userRoutes/userSignUp",
        {
          refFName: fname,
          refLName: lname,
          refMoblile: mobile,
          refDOB: dob,
          refUserEmail: email,
          // temp_password: password,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log("data list tour data ======= ?", data);
      if (data.success) {
        navigate("/login");
        // localStorage.setItem("token", "Bearer " + data.token);
        setIsModelOpen(false);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Created Account Successfully ",
          life: 3000,
        });
       showSuccess();
       setTimeout(() => {
        navigate("/login");
      }, 10000);
      }else{
        toast.current.show({
          severity: "error",
          summary: "error",
          detail: " Already exists",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex w-full items-center justify-end p-10  "
      style={{
        backgroundImage: `url(${image})`,
        // backgroundSize: "contain",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
     
       <div className="absolute top-4 left-4 z-10 ">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-[#ffffff] w-[250px] testingFont font-semibold cursor-pointer text-3xl md:text-base lg:text-2xl hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a1 1 0 01-.707-1.707L14.586 11H3a1 1 0 110-2h11.586l-5.293-5.293a1 1 0 111.414-1.414l7 7a1 1 0 010 1.414l-7 7A1 1 0 0110 18z"
              clipRule="evenodd"
            />
          </svg>
          {t("login.Back to Home")}
        </button>
      </div>
      <Toast ref={toast} />
      <div className="flex flex-col sm:w-[90%] md:w-[70%] lg:w-[35%] xl:w-[30%] justify-end  p-0 lg:p-10 md:p-0  ">
        <p className="flex justify-center text-[#cdd69a] testingFont  text-3xl font-extrabold">
        {t("signin.Sign Up")}
        </p>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          action=""
        >
          <input
             placeholder={t("signin.First Name")}
            id="fname"
            name="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            type="text"
            className="input"
            required
          />
          <input
            placeholder={t("signin.Last Name")}
            id="lname"
            name="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            type="text"
            className="input"
            required
          />
          <input
           placeholder={t("signin.Mobile Number")}
            
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            type="number"
            className="input"
            required
          />
          <Calendar
            value={dob}
            onChange={(e) => setDob(e.value)}
            placeholder={t("signin.Date of Birth")}
            showIcon
            required
            className="custom-calendar w-full h-[55px] rounded-3xl py-3 px-4 mt-3 bg-[#fff4f4] text-black"
          />
          <input
             placeholder={t("signin.Email")}
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="input"
            required
          />

          {/* <input
           placeholder={t("signin.Password")}
             id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            className="input"
            required
          /> */}
          <span className="forgot-password ">
            {/* <a href="#">Forgot Password ?</a> */}
          </span>
          <input value="Sign Up" type="submit" className="login-button cursor-pointer" />
        </form>
        <p className="flex justify-center text-[#cdd69a] testingFont  text-3xl font-extrabold">
        {t("signin.Already have an account Just")}
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              showSuccess("Created Account Successfully");
              handleNavigation("/login");
            }}
            className="flex justify-center  underline  text-[#cdd69a] testingFont  text-3xl font-extrabold cursor-pointer"
          >
           {t("signin.Signin")}..!
          </button>
        </div>
      </div>
    </div>
  );
}
