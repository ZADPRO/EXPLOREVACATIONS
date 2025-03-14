import React from "react";
import { useLocation } from "react-router-dom";

export default function ToursTemplate() {
  const location = useLocation();
  const tour = location.state?.tour;

  if (!tour) {
    return <h2 className="text-center text-red-500">No Tour Data Found!</h2>;
  }
  return (
    <div>
      <div className="homePageContainer01 relative h-[60vh] flex items-center justify-center text-white text-3xl font-bold">
        {/* Centered Text Here */}
      </div>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <img src={tour.image} alt={tour.name} className="w-full rounded-md" />
        <h2 className="text-2xl font-bold mt-4">{tour.name}</h2>
        <p className="text-gray-700">
          {tour.duration} - {tour.location}
        </p>
        <p className="text-lg font-semibold text-[#ffcb27] my-2">
          {tour.price}
        </p>

        <h3 className="text-xl font-bold mt-6">Itinerary</h3>
        <ul className="list-disc list-inside">
          {tour.itinerary.map((item) => (
            <li key={item.day} className="mt-2">
              <strong>Day {item.day}:</strong> {item.title}
              <p className="text-sm text-gray-600">Meals: {item.meals}</p>
              <ul className="list-disc list-inside ml-4 text-sm">
                {item.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
