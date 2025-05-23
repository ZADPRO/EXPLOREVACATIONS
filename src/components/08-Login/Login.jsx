import React, { useEffect, useRef, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import bgimg from "../../assets/Login/loginback.jpg";
import frontbg from "../../assets/Login/frontbg.jpg";
import Axios from "axios";
import { Toast } from "primereact/toast";
import decrypt from "../../helper";
import { useTranslation } from "react-i18next";

const Login = () => {
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
  const navigate = useNavigate();
  const toast = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [resetStage, setResetStage] = useState("email"); // email or password
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSubmit = async () => {
    try {
      const response = await Axios.post(
        import.meta.env.VITE_API_URL + "/adminRoutes/adminLogin",
        { login: email, password: password },
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
      console.log("data", data);

      if (data.success) {
        const roleIdno = data.roleId;
        console.log("roleIdno", roleIdno);

        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Successfully logged in!",
          life: 3000,
        });
        setWarning("");
        navigate("/");
        localStorage.setItem("token", "Bearer " + data.token);
        localStorage.setItem("roleId", data.roleId);
      } else {
        setWarning("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setWarning("Login failed. Please check your credentials.");
    }
  };

  const handleSendResetEmail = async () => {
    try {
      const response = await Axios.post(
        import.meta.env.VITE_API_URL + "/userRoutes/forgotPassword",
        { emailId: resetEmail },
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

      if (data.success) {
        localStorage.setItem("token", "Bearer " + data.token);
        toast.current?.show({
          severity: "success",
          summary: "Email Sent",
          detail: "Check your email for reset instructions",
          life: 3000,
        });
        setResetStage("password");
        navigate("/login");
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to send reset email",
        life: 3000,
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center "
      style={{
        backgroundImage: `url(${bgimg})`,
        // backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-4 left-4 z-10 ">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-white w-[250px] testingFont font-semibold text-2xl md:text-base lg:text-2xl hover:underline"
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
      <div className="flex flex-col lg:flex-row lg:mt-0 md:mt-0 mt-20 gap-6  md:flex-row w-full  items-center justify-center">
        <div className="flex font-sans lg:w-[full] md:w-[full] pt-5">
          {/* Left side: Form */}

          <div className=" w-3/2 lg:w-[40%] md:w-[100%]  bg-white flex flex-col justify-center items-center  lg:p-10 md:p-10 p-5 lg:m-0 md:m-0  m-4 rounded-2xl lg:rounded-l-4xl md:rounded-l-4xl ">
            <h1 className="text-4xl font-bold mb-2 text-center">
              {t("login.Start your perfect trip")}
            </h1>
            <p className="text-blue-950 font-semibold text-lg mb-6">
              {t("login.voyage")}
            </p>

            {!showForgot ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="w-full max-w-sm"
              >
                <input
                  type="email"
                  placeholder={t("signin.Email")}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mb-4 px-4 py-2 border rounded-4xl"
                 />
                <input
                  type="password"
                  placeholder={t("signin.Password")}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mb-4 px-4 py-2 border rounded-4xl"
                />
                <button
                  type="submit"
                  className="w-full bg-[#065784] text-white py-2 rounded-4xl cursor-pointer"
                >
                  {t("login.Start")}
                </button>
                {warning && (
                  <p className="text-center text-xl mt-3 text-[#f00]">
                    {warning}
                  </p>
                )}
                <p
                  className="text-sm text-center mt-3 text-[#003192] underline cursor-pointer"
                  onClick={() => setShowForgot(true)}
                >
                  {t("login.Forgot Password?")}
                </p>
                <p className="text-sm text-center mt-4">
                  {t("login.Don't have an account?")}{" "}
                  <span
                    className="text-[#065784] font-bold underline cursor-pointer"
                    onClick={() => handleNavigation("/signup")}
                  >
                    {t("login.Register Now")}
                  </span>
                </p>
              </form>
            ) : (
              <div className="w-full max-w-sm">
                {resetStage === "email" ? (
                  <>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="w-full mb-4 px-4 py-2 border rounded-4xl"
                    />
                    <button
                      onClick={() => {
                        handleSendResetEmail();
                        navigate("/login");
                      }}
                      className="w-full bg-[#065784] text-white py-2 rounded-4xl cursor-pointer"
                    >
                      {t("login.Send Reset Email")}
                    </button>
                  </>
                ) : (
                  <>
                    {/* <input
                      type="password"
                      placeholder="Enter new password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full mb-4 px-4 py-2 border rounded-4xl"
                    />
                    <button
                      onClick={handleSendResetEmail}
                      className="w-full bg-[#065784] text-white py-2 rounded-4xl"
                    >
                      {t("login.Reset Password")}
                    </button> */}
                    <p className="text-xl text-center  text-[#000]  ">
                      {t("login.Please check your email for your password.")} 
                    </p>
                  </>
                )}
                <p
                  className="text-sm text-center mt-4 text-gray-600 underline cursor-pointer"
                  onClick={() => {
                    setShowForgot(false);
                    setResetStage("email");
                  }}
                >
                  {t("login.Back to Login")}
                </p>
              </div>
            )}
          </div>

          {/* Right Side Image */}
          <div
            className="hidden md:block w-1/2 lg:w-[500px] relative right-7 bg-cover bg-center rounded-[2rem]"
            style={{
              backgroundImage: `url(${frontbg})`,
              border: "5px solid white",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
