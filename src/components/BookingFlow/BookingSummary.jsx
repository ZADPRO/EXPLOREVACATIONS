import React, { useState, useEffect } from "react";
import {
  Pencil,
  Calendar,
  Clock,
  MapPin,
  Users,
  Check,
  Briefcase,
  ChevronUp,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import "./BookingFlow.css";
import { useTranslation } from "react-i18next";
import axios from "axios";
// import img1 from '../../assets/Home1/';
const BookingSummary = ({
  bookingData,
  totalPrice,
  onEditJourney,
  updateBookingData,
}) => {
  console.log("bookingData", bookingData);

  const [showReturnSection, setShowReturnSection] = useState(false);
  const [showOutboundEditSection, setShowOutboundEditSection] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showOutboundCalendar, setShowOutboundCalendar] = useState(false);
  const [showOutboundTimePicker, setShowOutboundTimePicker] = useState(false);

  const [returnDate, setReturnDate] = useState(new Date());
  const [returnTime, setReturnTime] = useState({
    hour: "01",
    minute: "45",
    period: "PM",
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // New state for outbound editing
  const [outboundDate, setOutboundDate] = useState(new Date());
  const [outboundTime, setOutboundTime] = useState({
    hour: "01",
    minute: "45",
    period: "PM",
  });
  const [outboundMonth, setOutboundMonth] = useState(new Date());
  const [outboundFrom, setOutboundFrom] = useState("");
  const [outboundFromCity, setOutboundFromCity] = useState("");
  const [outboundTo, setOutboundTo] = useState("");
  const [outboundToCity, setOutboundToCity] = useState("");
  const [outboundPassengers, setOutboundPassengers] = useState(2);

  // What's Included State - will be populated from backend
  const [includedFeatures, setIncludedFeatures] = useState([
    { id: 1, name: "Free waiting time", enabled: true },
    { id: 2, name: "Door-to-door service", enabled: true },
    { id: 3, name: "Meet & Greet", enabled: true },
    { id: 4, name: "Private transfer", enabled: true },
    { id: 5, name: "Flight tracking", enabled: true },
  ]);

  const hours12 = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const minutes = ["00", "15", "30", "45"];

  const calculateDistance = async () => {
    if (!bookingData?.outbound?.from || !bookingData?.outbound?.to) {
      console.log("No outbound from/to found");
      return;
    }

    const payload = {
      from: {
        name: bookingData.outbound.from.name,
        placeId: bookingData.outbound.from.placeId,
        lat: bookingData.outbound.from.lat,
        lng: bookingData.outbound.from.lng,
        postalCode: bookingData.outbound.from.postalCode,
      },
      to: {
        name: bookingData.outbound.to.name,
        placeId: bookingData.outbound.to.placeId,
        lat: bookingData.outbound.to.lat,
        lng: bookingData.outbound.to.lng,
        postalCode: bookingData.outbound.to.postalCode,
      },
    };

    console.log("📤 Sending payload:", payload);

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/calculateDistance",
        payload,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      console.log("📥 API Response:", response.data);

      if (response.data.success) {
        const distanceKm = response.data.distanceKm;
        const duration = response.data.duration;

        const estimatedArrival = duration;

        updateBookingData("outbound", {
          ...bookingData.outbound,
          distance: `${distanceKm} km`,
          estimatedArrival: estimatedArrival,
        });
      }
    } catch (err) {
      console.error("❌ calculateDistance error:", err);
    }
  };

  useEffect(() => {
    if (bookingData?.outbound?.from && bookingData?.outbound?.to) {
      calculateDistance();
    }
  }, [bookingData?.outbound?.from, bookingData?.outbound?.to]);

  const handleEditOutbound = () => {
    const dateString = bookingData.outbound.date;
    const parsedDate = new Date(dateString);
    setOutboundDate(parsedDate);
    setOutboundMonth(parsedDate);

    const timeString = bookingData.outbound.time;
    const timeMatch = timeString.match(/(\d+):(\d+)\s*(am|pm)/i);
    if (timeMatch) {
      setOutboundTime({
        hour: timeMatch[1].padStart(2, "0"),
        minute: timeMatch[2],
        period: timeMatch[3].toUpperCase(),
      });
    }
    setOutboundFrom(bookingData.outbound.from);
    setOutboundFromCity(bookingData.outbound.fromCity);
    setOutboundTo(bookingData.outbound.to);
    setOutboundToCity(bookingData.outbound.toCity);
    setOutboundPassengers(bookingData.outbound.passengers);

    setShowOutboundEditSection(true);
  };

  const handleSaveOutbound = () => {
    const formattedDate = `${outboundDate.getDate()} ${outboundDate.toLocaleString(
      "en-US",
      { month: "short" }
    )} ${outboundDate.getFullYear()}`;
    const formattedTime = `${outboundTime.hour}:${outboundTime.minute} ${outboundTime.period}`;

    updateBookingData("outbound", {
      from: outboundFrom,
      fromCity: outboundFromCity,
      to: outboundTo,
      toCity: outboundToCity,
      date: formattedDate,
      time: formattedTime,
      estimatedArrival: bookingData.outbound.estimatedArrival || "",
      distance: bookingData.outbound.distance || "",
      passengers: outboundPassengers,
    });

    setShowOutboundEditSection(false);
    setShowOutboundCalendar(false);
    setShowOutboundTimePicker(false);
  };

  const handleAddReturn = () => {
    try {
      const formattedDate = `${returnDate.getDate()} ${returnDate.toLocaleString(
        "en-US",
        { month: "short" }
      )} ${returnDate.getFullYear()}`;
      const formattedTime = `${returnTime.hour}:${returnTime.minute} ${returnTime.period}`;

      updateBookingData("return", {
        from: bookingData.outbound.to,
        fromCity: bookingData.outbound.toCity,
        to: bookingData.outbound.from,
        toCity: bookingData.outbound.fromCity,
        date: formattedDate,
        time: formattedTime,
        estimatedArrival: bookingData.outbound.estimatedArrival || "",
        distance: bookingData.outbound.distance || "",
        passengers: bookingData.outbound.passengers,
      });

      setShowReturnSection(false);
      setShowCalendar(false);
      setShowTimePicker(false);
    } catch (error) {
      console.error("Error adding return:", error);
    }
  };

  const handleEditReturn = () => {
    setShowReturnSection(true);

    if (bookingData.return) {
      const oldDate = new Date(bookingData.return.date);
      setReturnDate(oldDate);
      const [time, period] = bookingData.return.time.split(" ");
      const [hour, minute] = time.split(":");

      setReturnTime({ hour, minute, period });
    }
  };

  const handleRemoveReturn = () => {
    if (window.confirm("Are you sure you want to remove the return journey?")) {
      updateBookingData("return", null);
      setShowReturnSection(false);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek, year, month };
  };
  const { t } = useTranslation("global");
  const renderCalendar = (selectedDate, setDate, isOutbound = false) => {
    const monthToUse = isOutbound ? outboundMonth : currentMonth;
    const { daysInMonth, startingDayOfWeek, year, month } =
      getDaysInMonth(monthToUse);
    const days = [];
    const today = new Date();

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} style={{ padding: "8px" }}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();
      const isPast = date < today && !isToday;

      days.push(
        <div
          key={day}
          onClick={() => !isPast && setDate(date)}
          style={{
            padding: "8px",
            textAlign: "center",
            cursor: isPast ? "not-allowed" : "pointer",
            borderRadius: "8px",
            backgroundColor: isSelected ? "#fbbf24" : "transparent",
            color: isPast ? "#d1d5db" : "#000",
            fontWeight: isSelected ? "600" : "400",
            border: isToday ? "2px solid #fbbf24" : "none",
          }}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const navigateMonth = (direction, isOutbound = false) => {
    if (isOutbound) {
      setOutboundMonth((prev) => {
        const newDate = new Date(prev);
        newDate.setMonth(newDate.getMonth() + direction);
        return newDate;
      });
    } else {
      setCurrentMonth((prev) => {
        const newDate = new Date(prev);
        newDate.setMonth(newDate.getMonth() + direction);
        return newDate;
      });
    }
  };

  const incrementValue = (type, isOutbound = false) => {
    const timeState = isOutbound ? outboundTime : returnTime;
    const setTime = isOutbound ? setOutboundTime : setReturnTime;

    if (type === "hour") {
      const idx = hours12.indexOf(timeState.hour);
      setTime({
        ...timeState,
        hour: hours12[idx < hours12.length - 1 ? idx + 1 : 0],
      });
    } else if (type === "minute") {
      const idx = minutes.indexOf(timeState.minute);
      setTime({
        ...timeState,
        minute: minutes[idx < minutes.length - 1 ? idx + 1 : 0],
      });
    }
  };

  const decrementValue = (type, isOutbound = false) => {
    const timeState = isOutbound ? outboundTime : returnTime;
    const setTime = isOutbound ? setOutboundTime : setReturnTime;

    if (type === "hour") {
      const idx = hours12.indexOf(timeState.hour);
      setTime({
        ...timeState,
        hour: hours12[idx > 0 ? idx - 1 : hours12.length - 1],
      });
    } else if (type === "minute") {
      const idx = minutes.indexOf(timeState.minute);
      setTime({
        ...timeState,
        minute: minutes[idx > 0 ? idx - 1 : minutes.length - 1],
      });
    }
  };

  const togglePeriod = (isOutbound = false) => {
    if (isOutbound) {
      setOutboundTime((prev) => ({
        ...prev,
        period: prev.period === "AM" ? "PM" : "AM",
      }));
    } else {
      setReturnTime((prev) => ({
        ...prev,
        period: prev.period === "AM" ? "PM" : "AM",
      }));
    }
  };

  const swapLocations = () => {
    const tempFrom = outboundFrom;
    const tempFromCity = outboundFromCity;
    setOutboundFrom(outboundTo);
    setOutboundFromCity(outboundToCity);
    setOutboundTo(tempFrom);
    setOutboundToCity(tempFromCity);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showCalendar &&
        !event.target.closest(".calendar-popup") &&
        !event.target.closest(".form-input")
      ) {
        setShowCalendar(false);
      }
      if (
        showTimePicker &&
        !event.target.closest(".time-popup") &&
        !event.target.closest(".form-input")
      ) {
        setShowTimePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCalendar, showTimePicker]);

  return (
    <div className="booking-summary summary-sticky">
      <h2 className="summary-title">Your Booking</h2>

      {/* Outbound Journey */}
      <div className="journey-section">
        {!showOutboundEditSection ? (
          <>
            <div className="journey-header">
              <span className="journey-label">Outward journey</span>
              <button
                onClick={handleEditOutbound}
                className="edit-button"
                title="Edit outbound"
              >
                <Pencil size={16} />
              </button>
            </div>

            <JourneyDetails journey={bookingData.outbound} />
          </>
        ) : (
          <>
            <div className="journey-header">
              <span className="journey-label">Edit Outward journey</span>
              <button
                onClick={() => {
                  setShowOutboundEditSection(false);
                  setShowOutboundCalendar(false);
                  setShowOutboundTimePicker(false);
                }}
                className="edit-button"
                title="Cancel editing"
              >
                ✕
              </button>
            </div>

            <div
              style={{
                marginTop: "16px",
                padding: "16px",
                backgroundColor: "#fef9f3",
                border: "2px solid #fed7aa",
                borderRadius: "12px",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                Edit Outbound Trip
              </h3>

              {/* From/To Location Edit */}
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "6px",
                  }}
                >
                  From Location
                </label>
                <input
                  type="text"
                  value={outboundFrom}
                  onChange={(e) => setOutboundFrom(e.target.value)}
                  placeholder="Airport or address"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                />
                <input
                  type="text"
                  value={outboundFromCity}
                  onChange={(e) => setOutboundFromCity(e.target.value)}
                  placeholder="City, Country"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                />
              </div>

              {/* Swap Button */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <button
                  onClick={swapLocations}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#f3f4f6",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  ⇅ Swap
                </button>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "6px",
                  }}
                >
                  To Location
                </label>
                <input
                  type="text"
                  value={outboundTo}
                  onChange={(e) => setOutboundTo(e.target.value)}
                  placeholder="Airport or address"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                />
                <input
                  type="text"
                  value={outboundToCity}
                  onChange={(e) => setOutboundToCity(e.target.value)}
                  placeholder="City, Country"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                />
              </div>

              {/* Date and Time Selection */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ position: "relative" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "6px",
                    }}
                  >
                    {t("Transfer.pickup_date")}
                  </label>
                  <div
                    onClick={() => {
                      setShowOutboundCalendar(!showOutboundCalendar);
                      setShowOutboundTimePicker(false);
                    }}
                    style={{
                      padding: "10px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      backgroundColor: "#f9fafb",
                      fontSize: "14px",
                    }}
                  >
                    <Calendar size={14} />
                    <span>
                      {outboundDate.toLocaleDateString("en-US", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {showOutboundCalendar && (
                    <div
                      style={{
                        marginTop: "8px",
                        padding: "12px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        position: "absolute",
                        zIndex: 100,
                        width: "280px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "12px",
                        }}
                      >
                        <button
                          onClick={() => navigateMonth(-1, true)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "4px",
                            fontSize: "16px",
                          }}
                        >
                          ←
                        </button>
                        <div style={{ fontWeight: "600", fontSize: "14px" }}>
                          {outboundMonth.toLocaleString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                        <button
                          onClick={() => navigateMonth(1, true)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "4px",
                            fontSize: "16px",
                          }}
                        >
                          →
                        </button>
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(7, 1fr)",
                          gap: "2px",
                        }}
                      >
                        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(
                          (day) => (
                            <div
                              key={day}
                              style={{
                                textAlign: "center",
                                fontSize: "11px",
                                fontWeight: "600",
                                color: "#6b7280",
                                padding: "6px",
                              }}
                            >
                              {day}
                            </div>
                          )
                        )}
                        {renderCalendar(outboundDate, setOutboundDate, true)}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ position: "relative" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "6px",
                    }}
                  >
                    {t("Transfer.pickup_time")}
                  </label>
                  <div
                    onClick={() => {
                      setShowOutboundTimePicker(!showOutboundTimePicker);
                      setShowOutboundCalendar(false);
                    }}
                    style={{
                      padding: "10px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      backgroundColor: "#f9fafb",
                      fontSize: "14px",
                    }}
                  >
                    <Clock size={14} />
                    <span>
                      {outboundTime.hour}:{outboundTime.minute}{" "}
                      {outboundTime.period}
                    </span>
                  </div>

                  {showOutboundTimePicker && (
                    <div
                      style={{
                        marginTop: "8px",
                        padding: "16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        position: "absolute",
                        zIndex: 100,
                        width: "240px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "16px",
                        }}
                      >
                        <div style={{ textAlign: "center" }}>
                          <button
                            onClick={() => incrementValue("hour", true)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: "2px",
                            }}
                          >
                            <ChevronUp size={16} />
                          </button>
                          <div
                            style={{
                              fontSize: "24px",
                              fontWeight: "700",
                              padding: "8px 12px",
                              backgroundColor: "#ff9447",
                              color: "#fff",
                              borderRadius: "8px",
                              minWidth: "50px",
                            }}
                          >
                            {outboundTime.hour}
                          </div>
                          <button
                            onClick={() => decrementValue("hour", true)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: "2px",
                            }}
                          >
                            <ChevronDown size={16} />
                          </button>
                        </div>

                        <div style={{ fontSize: "24px", fontWeight: "700" }}>
                          :
                        </div>

                        <div style={{ textAlign: "center" }}>
                          <button
                            onClick={() => incrementValue("minute", true)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: "2px",
                            }}
                          >
                            <ChevronUp size={16} />
                          </button>
                          <div
                            style={{
                              fontSize: "24px",
                              fontWeight: "700",
                              padding: "8px 12px",
                              backgroundColor: "#ff9447",
                              color: "#fff",
                              borderRadius: "8px",
                              minWidth: "50px",
                            }}
                          >
                            {outboundTime.minute}
                          </div>
                          <button
                            onClick={() => decrementValue("minute", true)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: "2px",
                            }}
                          >
                            <ChevronDown size={16} />
                          </button>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                          }}
                        >
                          <button
                            onClick={() => togglePeriod(true)}
                            style={{
                              padding: "6px 10px",
                              backgroundColor:
                                outboundTime.period === "AM"
                                  ? "#ff9447"
                                  : "#f3f4f6",
                              color:
                                outboundTime.period === "AM" ? "#fff" : "#000",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            AM
                          </button>
                          <button
                            onClick={() => togglePeriod(true)}
                            style={{
                              padding: "6px 10px",
                              backgroundColor:
                                outboundTime.period === "PM"
                                  ? "#ff9447"
                                  : "#f3f4f6",
                              color:
                                outboundTime.period === "PM" ? "#fff" : "#000",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            PM
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowOutboundTimePicker(false)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          backgroundColor: "#000",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Passengers */}
              <div style={{ marginBottom: "12px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "6px",
                  }}
                >
                  <Users
                    size={14}
                    style={{
                      display: "inline",
                      marginRight: "4px",
                      verticalAlign: "middle",
                    }}
                  />
                  {t("Transfer.passengers")}
                </label>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <button
                    onClick={() =>
                      outboundPassengers > 1 &&
                      setOutboundPassengers(outboundPassengers - 1)
                    }
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#f3f4f6",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    -
                  </button>
                  <div
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#f9fafb",
                      borderRadius: "8px",
                      fontSize: "18px",
                      fontWeight: "600",
                      minWidth: "60px",
                      textAlign: "center",
                    }}
                  >
                    {outboundPassengers}
                  </div>
                  <button
                    onClick={() =>
                      outboundPassengers < 10 &&
                      setOutboundPassengers(outboundPassengers + 1)
                    }
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#f3f4f6",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveOutbound}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#fbbf24",
                  color: "#000",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                SAVE CHANGES
              </button>
            </div>
          </>
        )}

        {/* Add Return Button */}
        {!showOutboundEditSection &&
          !bookingData.return &&
          !showReturnSection && (
            <div style={{ marginTop: "16px" }}>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  color: "#6b7280",
                  marginBottom: "8px",
                }}
              >
                Book smart! Add a return trip
              </div>
              <button
                onClick={() => setShowReturnSection(true)}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "white",
                  border: "2px solid #fbbf24",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "#000",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#fef3c7")
                }
                onMouseOut={(e) => (e.currentTarget.style.background = "white")}
              >
                <RefreshCw size={18} />
                Add Return
              </button>
            </div>
          )}
        {showReturnSection && (
          <div
            style={{
              marginTop: "16px",
              padding: "16px",
              backgroundColor: "#fef9f3", // Changed from '#fff'
              border: "2px solid #fed7aa", // Changed from '1px solid #e5e7eb'
              borderRadius: "12px",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "12px",
              }}
            >
              Add Return Trip
            </h3>

            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "600" }}>
                    {bookingData.outbound.to}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    {bookingData.outbound.toCity}
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "2px",
                  height: "16px",
                  backgroundColor: "#fbbf24",
                  marginLeft: "4px",
                }}
              ></div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#fbbf24",
                  }}
                ></div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "600" }}>
                    {bookingData.outbound.from.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    {bookingData.outbound.fromCity}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div style={{ position: "relative" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "6px",
                  }}
                >
                  {t("Transfer.return_date")}
                </label>
                <div
                  onClick={() => {
                    setShowCalendar(!showCalendar);
                    setShowTimePicker(false);
                  }}
                  style={{
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "#f9fafb",
                    fontSize: "14px",
                  }}
                >
                  <Calendar size={14} />
                  <span>
                    {returnDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {showCalendar && (
                  <div
                    style={{
                      marginTop: "8px",
                      padding: "12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      position: "absolute",
                      zIndex: 100,
                      width: "280px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <button
                        onClick={() => navigateMonth(-1)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "4px",
                          fontSize: "16px",
                        }}
                      >
                        ←
                      </button>
                      <div style={{ fontWeight: "600", fontSize: "14px" }}>
                        {currentMonth.toLocaleString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <button
                        onClick={() => navigateMonth(1)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "4px",
                          fontSize: "16px",
                        }}
                      >
                        →
                      </button>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, 1fr)",
                        gap: "2px",
                      }}
                    >
                      {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                        <div
                          key={day}
                          style={{
                            textAlign: "center",
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#6b7280",
                            padding: "6px",
                          }}
                        >
                          {day}
                        </div>
                      ))}
                      {renderCalendar()}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ position: "relative" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "6px",
                  }}
                >
                  {t("Transfer.return_time")}
                </label>
                <div
                  onClick={() => {
                    setShowTimePicker(!showTimePicker);
                    setShowCalendar(false);
                  }}
                  style={{
                    padding: "10px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "#f9fafb",
                    fontSize: "14px",
                  }}
                >
                  <Clock size={14} />
                  <span>
                    {returnTime.hour}:{returnTime.minute} {returnTime.period}
                  </span>
                </div>

                {showTimePicker && (
                  <div
                    style={{
                      marginTop: "8px",
                      padding: "16px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      position: "absolute",
                      zIndex: 100,
                      width: "240px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <button
                          onClick={() => incrementValue("hour")}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "2px",
                          }}
                        >
                          <ChevronUp size={16} />
                        </button>
                        <div
                          style={{
                            fontSize: "24px",
                            fontWeight: "700",
                            padding: "8px 12px",
                            backgroundColor: "#ff9447",
                            color: "#fff",
                            borderRadius: "8px",
                            minWidth: "50px",
                          }}
                        >
                          {returnTime.hour}
                        </div>
                        <button
                          onClick={() => decrementValue("hour")}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "2px",
                          }}
                        >
                          <ChevronDown size={16} />
                        </button>
                      </div>

                      <div style={{ fontSize: "24px", fontWeight: "700" }}>
                        :
                      </div>

                      <div style={{ textAlign: "center" }}>
                        <button
                          onClick={() => incrementValue("minute")}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "2px",
                          }}
                        >
                          <ChevronUp size={16} />
                        </button>
                        <div
                          style={{
                            fontSize: "24px",
                            fontWeight: "700",
                            padding: "8px 12px",
                            backgroundColor: "#ff9447",
                            color: "#fff",
                            borderRadius: "8px",
                            minWidth: "50px",
                          }}
                        >
                          {returnTime.minute}
                        </div>
                        <button
                          onClick={() => decrementValue("minute")}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "2px",
                          }}
                        >
                          <ChevronDown size={16} />
                        </button>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        <button
                          onClick={togglePeriod}
                          style={{
                            padding: "6px 10px",
                            backgroundColor:
                              returnTime.period === "AM"
                                ? "#ff9447"
                                : "#f3f4f6",
                            color: returnTime.period === "AM" ? "#fff" : "#000",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          AM
                        </button>
                        <button
                          onClick={togglePeriod}
                          style={{
                            padding: "6px 10px",
                            backgroundColor:
                              returnTime.period === "PM"
                                ? "#ff9447"
                                : "#f3f4f6",
                            color: returnTime.period === "PM" ? "#fff" : "#000",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          PM
                        </button>
                      </div>
                    </div>

                    {/* This button now just closes the time picker */}
                    <button
                      onClick={() => setShowTimePicker(false)}
                      style={{
                        width: "100%",
                        padding: "8px",
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "6px",
                }}
              >
                <Users
                  size={14}
                  style={{
                    display: "inline",
                    marginRight: "4px",
                    verticalAlign: "middle",
                  }}
                />
                {t("Transfer.passengers")}
              </label>
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {bookingData.outbound.passengers}
              </div>
            </div>

            {/* This is the actual SAVE button for the return trip */}
            <button
              onClick={bookingData.return ? handleEditReturn : handleAddReturn}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#fbbf24",
                color: "#000",
                border: "none",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {bookingData.return ? "SAVE CHANGES" : t("vehicle.add_return")}
            </button>
          </div>
        )}
      </div>

      {/* Return Journey Display */}
      {bookingData.return && !showReturnSection && (
        <div className="journey-section section-divider">
          <div className="journey-header">
            <span className="journey-label">Return journey</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={handleEditReturn}
                className="edit-button"
                title="Edit return"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={handleRemoveReturn}
                className="edit-button"
                title="Remove return"
                style={{ color: "#ef4444" }}
              >
                ✕
              </button>
            </div>
          </div>

          <JourneyDetails journey={bookingData.return} />
        </div>
      )}

      {/* Vehicle Info */}
      {/* Vehicle Info */}
      <div className="section-divider">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img
              src={bookingData.selectedVehicle?.image || img1}
              alt={bookingData.selectedVehicle?.type || "Vehicle"}
              style={{
                width: "70px",
                height: "52px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <div>
              <div className="vehicle-type">
                {bookingData.selectedVehicle?.type || "Select Vehicle"}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#6b7280",
                  marginTop: "4px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "3px" }}
                >
                  <Users size={12} />
                  <span>{bookingData.selectedVehicle?.passengers || 0}</span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "3px" }}
                >
                  <Briefcase size={12} />
                  <span>{bookingData.selectedVehicle?.luggage || 0}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="vehicle-price">
            <div className="price-total">CHF {totalPrice || 0}</div>
          </div>
        </div>
      </div>

      {/* What's Included - Now using state */}
      <div className="whats-included">
        <h3 className="included-title">What's included</h3>
        <div className="included-list">
          {includedFeatures
            .filter((feature) => feature.enabled)
            .map((feature) => (
              <div key={feature.id} className="included-item">
                <Check size={16} className="check-icon" />
                {feature.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// JourneyDetails component remains the same
const JourneyDetails = ({ journey }) => {
  const { t } = useTranslation("global");
  return (
    <div>
      <div className="journey-details">
        <div className="journey-indicator">
          <div className="indicator-dot start"></div>
          <div className="indicator-line"></div>
          <div className="indicator-dot end"></div>
        </div>
        <div className="journey-info">
          <div style={{ marginBottom: "24px" }}>
            <div className="location-name">{journey.from.name}</div>
            {/* <div className="location-city">{journey.fromCity}</div> */}
          </div>
          <div>
            <div className="location-name">{journey.to.name}</div>
            {/* <div className="location-city">{journey.toCity}</div> */}
          </div>
        </div>
      </div>

      <div className="journey-meta">
        <div className="meta-item">
          <Calendar size={14} />
          {journey.date} {journey.time}
        </div>
        <div className="meta-item">
          <Clock size={14} />
          Estimated arrival {journey.estimatedArrival}
        </div>
        <div className="meta-item">
          <MapPin size={14} />
          Distance {journey.distance}
        </div>
        <div className="meta-item">
          <Users size={14} />
          {journey.passengers} {t("Transfer.passengers")}
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
