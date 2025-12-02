import React, { useState, useEffect, useRef } from "react";
import { Users, Check, Briefcase, Fuel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../BookingFlow/BookingFlow.css";
import { useTranslation } from "react-i18next";
import axios from "axios";
import decrypt from "../../helper";

const VehicleStep = ({
  bookingData,
  updateBookingData,
  onContinue,
  onBack,
}) => {
  // 🔥 RETURN TRIP LOGIC — DOUBLE PRICE IF RETURN EXISTS
  const hasReturnTrip = bookingData.return ? true : false;

  const computeFinalPrice = (vehicle) => {
    const legs = hasReturnTrip ? 2 : 1; // 1-way or 2-way price
    return vehicle.price * legs;
  };

  const navigate = useNavigate();
  const mapRef = useRef(null);

  const from = bookingData?.outbound?.from
    ? {
        lat: bookingData.outbound.from.lat,
        lng: bookingData.outbound.from.lng,
      }
    : null;

  const to = bookingData?.outbound?.to
    ? {
        lat: bookingData.outbound.to.lat,
        lng: bookingData.outbound.to.lng,
      }
    : null;

  // ======= FETCH DISTANCE =======
  const calculateDistance = async () => {
    try {
      const payload = {
        from: bookingData.outbound.from,
        to: bookingData.outbound.to,
      };

      await axios.post(
        import.meta.env.VITE_API_URL + "/calculateDistance",
        payload,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("❌ Error calling calculateDistance:", error);
    }
  };

  // ======= FETCH VEHICLES =======
  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/transferRoutes/cars",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      const decrypted = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      const carData = decrypted.data || [];

      const mappedVehicles = carData.map((car) => ({
        id: car.id,
        type: car.car_name,
        brand: car.car_brand,
        image: car.car_image_base64 || car.car_image,
        price: Number(car.price), // IMPORTANT: one-way price
        capacity: {
          passengers: Number(car.passengers),
          bags: Number(car.luggage),
        },
        description: car.description,
        mileage: `${car.mileage} km`,
        badges: car.car_badges,
        services: car.car_services,
      }));

      const passengerCount = bookingData.outbound.passengers;

      const filtered = mappedVehicles.filter(
        (v) => v.capacity.passengers >= passengerCount
      );

      setVehicles(filtered);

      // Auto-select first valid vehicle
      if (filtered.length && !selectedVehicle) {
        handleSelectVehicle(filtered[0]);
      }
    } catch (err) {
      console.error("❌ Error fetching vehicles:", err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [bookingData.outbound?.passengers]);

  useEffect(() => {
    if (bookingData.outbound?.from && bookingData.outbound?.to) {
      calculateDistance();
    }
  }, [bookingData.outbound?.from, bookingData.outbound?.to]);

  const { t } = useTranslation("global");
  const [selectedVehicle, setSelectedVehicle] = useState(
    bookingData.selectedVehicle
  );
  const [vehicles, setVehicles] = useState([]);

  // ⭐ SELECT VEHICLE (Price doubles if return exists)
  const handleSelectVehicle = (vehicle) => {
    const doubledPrice = computeFinalPrice(vehicle); // ⬅️ IMPORTANT

    setSelectedVehicle({
      ...vehicle,
      finalPrice: doubledPrice,
    });

    console.log("vehicle", vehicle);
    updateBookingData("selectedVehicle", {
      id: vehicle.id,
      type: vehicle.type,
      brand: vehicle.brand,
      capacity: `${vehicle.capacity.passengers} passengers, ${vehicle.capacity.bags} bags`,
      price: doubledPrice, // ⬅️ IMPORTANT — stored in bookingData
      image: vehicle.image,
      passengers: vehicle.capacity.passengers,
      luggage: vehicle.capacity.bags,
      mileage: vehicle.mileage,
      badges: vehicle.badges,
      services: vehicle.services,
    });
  };

  // ⭐ MAP INITIALISE
  useEffect(() => {
    if (!window.google || !from || !to) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: from,
      zoom: 7,
    });

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    directionsService.route(
      {
        origin: from,
        destination: to,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") directionsRenderer.setDirections(result);
      }
    );
  }, [from, to]);

  const handleBack = () => navigate("/transfer");

  return (
    <div className="step-card">
      {/* MAP */}
      <div style={{ height: "300px", marginBottom: "16px" }}>
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        ></div>
      </div>

      {/* VEHICLE LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => handleSelectVehicle(vehicle)}
            style={{
              border:
                selectedVehicle?.type === vehicle.type
                  ? "2px solid #000"
                  : "2px solid #e5e7eb",
              borderRadius: "12px",
              padding: "16px",
              cursor: "pointer",
              background:
                selectedVehicle?.type === vehicle.type ? "#f9fafb" : "#fff",
            }}
          >
            <div style={{ display: "flex", gap: "16px" }}>
              <img
                src={vehicle.image}
                style={{
                  width: "100px",
                  height: "75px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />

              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontWeight: 600 }}>{vehicle.type}</h3>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    margin: "8px 0",
                    color: "#6b7280",
                  }}
                >
                  <Users size={16} />
                  <span>Up to {vehicle.capacity.passengers}</span>

                  <Briefcase size={16} />
                  <span>{vehicle.capacity.bags}</span>

                  <Fuel size={16} />
                  <span>{vehicle.mileage}</span>
                </div>

                {/* ✔ DISPLAY DOUBLE PRICE IF RETURN EXISTS */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "24px", fontWeight: "700" }}>
                    CHF {computeFinalPrice(vehicle).toFixed(2)}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    Total price (
                    {hasReturnTrip ? "Return trip included" : "One-way"})
                  </div>
                </div>
              </div>
            </div>

            {selectedVehicle?.type === vehicle.type && (
              <div
                style={{
                  paddingTop: "16px",
                  borderTop: "1px solid #e5e7eb",
                  marginTop: "16px",
                }}
              >
                <Check size={18} color="#10b981" /> Selected
              </div>
            )}
          </div>
        ))}
      </div>

      {/* BOTTOM BUTTONS */}
      <div className="button-group" style={{ marginTop: "24px" }}>
        <button onClick={handleBack} className="btn btn-back">
          ← Back
        </button>

        <button
          onClick={onContinue}
          className="btn btn-primary"
          disabled={!selectedVehicle}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default VehicleStep;
