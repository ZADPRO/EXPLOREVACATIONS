import React, { useEffect, useRef, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import bgimg from "../../assets/Login/loginback.jpg";
import frontbg from "../../assets/Login/frontbg.jpg";
import Axios from "axios";
import { Toast } from "primereact/toast";
import decrypt from "../../helper";

const Login = () => {
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

  // const handleResetPassword = async () => {
  //   try {
  //     const res = await Axios.post(
  //       import.meta.env.VITE_API_URL + "/adminRoutes/resetPassword",
  //       { email: resetEmail, newPassword: newPassword }
  //     );
  //     toast.current?.show({
  //       severity: "success",
  //       summary: "Password Reset",
  //       detail: "You can now log in with the new password",
  //       life: 3000,
  //     });
  //     setShowForgot(false);
  //     setResetStage("email");
  //     setNewPassword("");
  //     setResetEmail("");
  //   } catch (error) {
  //     toast.current?.show({
  //       severity: "error",
  //       summary: "Error",
  //       detail: "Failed to reset password",
  //       life: 3000,
  //     });
  //   }
  // };

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
      <Toast ref={toast} />
      <div className="flex flex-col lg:flex-row lg:mt-0 md:mt-0 mt-20 gap-6  md:flex-row w-full  items-center justify-center">
        <div className="flex font-sans lg:w-[full] md:w-[full] pt-5">
          {/* Left side: Form */}

          <div className=" w-3/2 lg:w-[40%] md:w-[100%]  bg-white flex flex-col justify-center items-center  lg:p-10 md:p-10 p-5 lg:m-0 md:m-0  m-4 rounded-2xl lg:rounded-l-4xl md:rounded-l-4xl ">
            <h1 className="text-4xl font-bold mb-2 text-center">
              Start your perfect trip
            </h1>
            <p className="text-blue-950 font-semibold text-lg mb-6">voyage</p>

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
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mb-4 px-4 py-2 border rounded-4xl"
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mb-4 px-4 py-2 border rounded-4xl"
                />
                <button
                  type="submit"
                  className="w-full bg-[#065784] text-white py-2 rounded-4xl"
                >
                  Start
                </button>
                {warning && (
                  <p className="text-center mt-3 text-red-600">{warning}</p>
                )}
                <p
                  className="text-sm text-center mt-3 text-blue-700 underline cursor-pointer"
                  onClick={() => setShowForgot(true)}
                >
                  Forgot Password?
                </p>
                <p className="text-sm text-center mt-4">
                  Don't have an account?{" "}
                  <span
                    className="text-[#065784] underline cursor-pointer"
                    onClick={() => handleNavigation("/signup")}
                  >
                    Sign Up
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
                      onClick={handleSendResetEmail}
                      className="w-full bg-[#065784] text-white py-2 rounded-4xl"
                    >
                      Send Reset Email
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full mb-4 px-4 py-2 border rounded-4xl"
                    />
                    <button
                      onClick={handleResetPassword}
                      className="w-full bg-[#065784] text-white py-2 rounded-4xl"
                    >
                      Reset Password
                    </button>
                  </>
                )}
                <p
                  className="text-sm text-center mt-4 text-gray-600 underline cursor-pointer"
                  onClick={() => {
                    setShowForgot(false);
                    setResetStage("email");
                  }}
                >
                  Back to Login
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
