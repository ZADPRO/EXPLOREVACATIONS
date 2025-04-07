import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import decrypt from "../../helper";

import Axios from "axios";

export default function TermsCondition() {
  const location = useLocation();
  const toast = useRef(null);

 

  const navigate = useNavigate();


  return (
  <div>
    
  </div>
  );
}
