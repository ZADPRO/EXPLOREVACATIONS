import React, { useRef, useState } from "react";
import {  useNavigate } from "react-router-dom";

import image from "../../assets/Signup/signup1.jpg";
import "./Signup.css";
import Axios from "axios";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import decrypt from "../../helper";

export default function Signup() {
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
          temp_password: password,
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
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex  items-center justify-end px-10 p-10 "
      style={{
        backgroundImage: `url(${image})`,
        // backgroundSize: "contain",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Toast ref={toast} />
      <div className="flex flex-col sm:w-[90%] md:w-[70%] lg:w-[35%] xl:w-[30%] justify-end mt-6 p-0 lg:p-10 md:p-0  ">
        <p className="flex justify-center text-[#cdd69a] testingFont  text-3xl font-extrabold">
          Sign Up
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
            placeholder="First Name"
            id="fname"
            name="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            type="text"
            className="input"
            required
          />
          <input
            placeholder="Last Name"
            id="lname"
            name="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            type="text"
            className="input"
            required
          />
          <input
            placeholder="Mobile Number"
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
            placeholder="Date of Birth"
            showIcon
            required
            className="custom-calendar w-full h-[55px] rounded-3xl py-3 px-4 mt-3 bg-[#fff4f4] text-black"
          />
          <input
            placeholder="Email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="input"
            required
          />

          <input
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            className="input"
            required
          />
          <span className="forgot-password ">
            <a href="#">Forgot Password ?</a>
          </span>
          <input value="Sign Up" type="submit" className="login-button" />
        </form>
        <p className="flex justify-center text-[#cdd69a] testingFont  text-3xl font-extrabold">
          Already have an account Just
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              showSuccess("Created Account Successfully");
              handleNavigation("/login");
            }}
            className="flex justify-center  underline  text-[#cdd69a] testingFont  text-3xl font-extrabold cursor-pointer"
          >
            Signin..!
          </button>
        </div>
      </div>
    </div>
  );
}
