import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

// import image from "../../assets/home/home4.jpg";

import budha from "../../assets/tours/buddha[1].jpg";
import glamour from "../../assets/tours/glamour[1].jpg";
import highlight from "../../assets/tours/highlight[1].jpg";
import photographic from "../../assets/tours/photographic[1].jpg";
import amazing from "../../assets/tours/amazing[1].jpg";
import { ShoppingCart } from "lucide-react";

export default function Tours() {
  const location = useLocation();
  const toast = useRef(null);

  // Extract state from location (if any)
  const initialTourDestination = location.state?.tourDestination || null;
  const initialTourFromDate = location.state?.tourFromDate || null;
  const initialTourToDate = location.state?.tourToDate || null;
  const initialTourGuest = location.state?.tourGuest || 0;

  // Use state variables
  const [tourDestination, setTourDestination] = useState(
    initialTourDestination
  );
  const [tourFromDate, setTourFromDate] = useState(initialTourFromDate);
  const [tourToDate, setTourToDate] = useState(initialTourToDate);
  const [tourGuest, setTourGuest] = useState(initialTourGuest);

  const handleExplore = () => {
    if (!tourDestination) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Destination is required",
      });
      return;
    }
    if (!tourFromDate) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "From date is required",
      });
      return;
    }
    if (!tourToDate) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "To date is required",
      });
      return;
    }
    if (!tourGuest) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Number of guests is required",
      });
      return;
    }

    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Search submitted!",
    });
  };

  const navigate = useNavigate();

  const tourData = [
    {
      id: 1,
      name: "Buddhist Cultural Trip To Sri Lanka",
      duration: "8 days / 7 nights",
      location: "Sri Lanka",
      price: "CHF 980 / Person",
      image: budha,
      group_size: "No Specific Size",
      activities: ["World heritage visits", "Trips through the countryside"],
      categories: ["Cultural trip", "Vacation tour"],
      tour_code: "SW001",
      surcharges_in_high_season: true,
      itinerary: [
        {
          day: 1,
          title: "Airport — Negombo",
          meals: "Dinner",
          details: [
            "Arrival at Bandaranaike International Airport",
            "Welcomed by Explore Vacations representative",
            "Transfer to hotel in Negombo",
            "Relax, refresh, and have dinner",
          ],
        },
        {
          day: 2,
          title: "Negombo — Anuradhapura – Habarana",
          meals: "Breakfast, Dinner",
          details: [
            "Breakfast at the hotel",
            "Travel to Anuradhapura via Maho",
            "Explore the ancient city of Anuradhapura",
            "Continue to Habarana for dinner and overnight",
          ],
        },
        {
          day: 3,
          title: "Habarana – Polonnaruwa – Habarana",
          meals: "Breakfast, Dinner",
          details: [
            "Visit Polonnaruwa, the 2nd Capital of Sri Lanka",
            "Explore UNESCO World Heritage Site",
            "Return to the hotel for dinner and overnight",
          ],
        },
        {
          day: 4,
          title: "Habarana – Sigiriya – Matale – Kandy",
          meals: "Breakfast, Dinner",
          details: [
            "Climb Sigiriya Rock Fortress (UNESCO World Heritage Site)",
            "Continue to Kandy",
            "Visit a spice garden on the way",
            "Check into hotel in Kandy for dinner and overnight",
          ],
        },
        {
          day: 5,
          title: "Kandy",
          meals: "Breakfast, Dinner",
          details: [
            "Visit Temple of the Tooth Relic",
            "Free time at leisure",
            "Evening visit to Royal Botanical Garden",
            "Return to hotel for dinner and overnight",
          ],
        },
        {
          day: 6,
          title: "Kandy – Beruwala",
          meals: "Breakfast, Dinner",
          details: [
            "Free time at leisure",
            "Travel to Beruwala (Southwestern coast)",
            "Check into beachside hotel for relaxation",
            "Dinner and overnight at the hotel",
          ],
        },
        {
          day: 7,
          title: "Beruwala – Kalutara – Colombo",
          meals: "Breakfast, Dinner",
          details: [
            "Visit the Buddhist Temple in Kalutara",
            "Arrive in Colombo",
            "Explore city and shopping centers (House of Fashion, ODEL, etc.)",
            "Dinner and overnight at the hotel",
          ],
        },
        {
          day: 8,
          title: "Colombo – Departure",
          meals: "Breakfast",
          details: [
            "Enjoy breakfast at the hotel",
            "Transfer to Bandaranaike International Airport for departure",
          ],
        },
      ],
      inclusions: [
        "07 nights in 4-star hotels or comparable in a double/twin room",
        "Half-board meals (Bed, Breakfast, and Dinner)",
        "A/C vehicle for all transfers and visits",
        "English-speaking chauffeur guide",
        "Tickets, monument, and museum fees per itinerary",
        "All applicable taxes",
      ],
      exclusions: [
        "Lunch",
        "Expenses due to accidents, strikes, political unrest, etc.",
        "Personal expenses (laundry, soft drinks, bottled water, camera fees, postage, tipping, etc.)",
        "Domestic or international airfare",
        "Visa fees",
        "Insurance and gratuities",
      ],
      special_notes: {
        validity: "Valid until November 30, 2023",
        visa_info:
          "All foreign travelers must obtain a valid Sri Lanka visa before entry. Apply online at http://www.eta.gov.lk/",
        room_category:
          "Base category room included. Higher room categories available at an additional cost.",
      },
    },
    {
      id: 2,
      name: "Sri Lanka highlight tour",
      duration: "8 days / 7 nights",
      location: "Switzerland",
      price: "$500 / Person",
      image: highlight,
      group_size: "No Specific Size",
      activities: ["World heritage visits", "Trips through the countryside"],
      categories: ["Cultural trip", "Vacation tour"],
      tour_code: "SW001",
      surcharges_in_high_season: true,
      itinerary: [
        {
          day: 1,
          title: "Airport — Negombo",
          meals: "Dinner",
          details: [
            "Arrival at Bandaranaike International Airport",
            "Welcomed by Explore Vacations representative",
            "Transfer to hotel in Negombo",
            "Relax, refresh, and have dinner",
          ],
        },
        {
          day: 2,
          title: "Negombo — Anuradhapura – Habarana",
          meals: "Breakfast, Dinner",
          details: [
            "Breakfast at the hotel",
            "Travel to Anuradhapura via Maho",
            "Explore the ancient city of Anuradhapura",
            "Continue to Habarana for dinner and overnight",
          ],
        },
        {
          day: 3,
          title: "Habarana – Polonnaruwa – Habarana",
          meals: "Breakfast, Dinner",
          details: [
            "Visit Polonnaruwa, the 2nd Capital of Sri Lanka",
            "Explore UNESCO World Heritage Site",
            "Return to the hotel for dinner and overnight",
          ],
        },
        {
          day: 4,
          title: "Habarana – Sigiriya – Matale – Kandy",
          meals: "Breakfast, Dinner",
          details: [
            "Climb Sigiriya Rock Fortress (UNESCO World Heritage Site)",
            "Continue to Kandy",
            "Visit a spice garden on the way",
            "Check into hotel in Kandy for dinner and overnight",
          ],
        },
        {
          day: 5,
          title: "Kandy",
          meals: "Breakfast, Dinner",
          details: [
            "Visit Temple of the Tooth Relic",
            "Free time at leisure",
            "Evening visit to Royal Botanical Garden",
            "Return to hotel for dinner and overnight",
          ],
        },
        {
          day: 6,
          title: "Kandy – Beruwala",
          meals: "Breakfast, Dinner",
          details: [
            "Free time at leisure",
            "Travel to Beruwala (Southwestern coast)",
            "Check into beachside hotel for relaxation",
            "Dinner and overnight at the hotel",
          ],
        },
        {
          day: 7,
          title: "Beruwala – Kalutara – Colombo",
          meals: "Breakfast, Dinner",
          details: [
            "Visit the Buddhist Temple in Kalutara",
            "Arrive in Colombo",
            "Explore city and shopping centers (House of Fashion, ODEL, etc.)",
            "Dinner and overnight at the hotel",
          ],
        },
        {
          day: 8,
          title: "Colombo – Departure",
          meals: "Breakfast",
          details: [
            "Enjoy breakfast at the hotel",
            "Transfer to Bandaranaike International Airport for departure",
          ],
        },
      ],
      inclusions: [
        "07 nights in 4-star hotels or comparable in a double/twin room",
        "Half-board meals (Bed, Breakfast, and Dinner)",
        "A/C vehicle for all transfers and visits",
        "English-speaking chauffeur guide",
        "Tickets, monument, and museum fees per itinerary",
        "All applicable taxes",
      ],
      exclusions: [
        "Lunch",
        "Expenses due to accidents, strikes, political unrest, etc.",
        "Personal expenses (laundry, soft drinks, bottled water, camera fees, postage, tipping, etc.)",
        "Domestic or international airfare",
        "Visa fees",
        "Insurance and gratuities",
      ],
      special_notes: {
        validity: "Valid until November 30, 2023",
        visa_info:
          "All foreign travelers must obtain a valid Sri Lanka visa before entry. Apply online at http://www.eta.gov.lk/",
        room_category:
          "Base category room included. Higher room categories available at an additional cost.",
      },
    },
    {
      id: 3,
      name: "Photographic safari tour in Sri Lanka",
      duration: "8 days / 7 nights",
      location: "Sri Lanka",
      price: "$280 / Person",
      image: photographic,
      group_size: "No Specific Size",
      activities: ["World heritage visits", "Trips through the countryside"],
      categories: ["Cultural trip", "Vacation tour"],
      tour_code: "SW001",
      surcharges_in_high_season: true,
      itinerary: [
        {
          day: 1,
          title: "Airport — Negombo",
          meals: "Dinner",
          details: [
            "Arrival at Bandaranaike International Airport",
            "Welcomed by Explore Vacations representative",
            "Transfer to hotel in Negombo",
            "Relax, refresh, and have dinner",
          ],
        },
        {
          day: 2,
          title: "Negombo — Anuradhapura – Habarana",
          meals: "Breakfast, Dinner",
          details: [
            "Breakfast at the hotel",
            "Travel to Anuradhapura via Maho",
            "Explore the ancient city of Anuradhapura",
            "Continue to Habarana for dinner and overnight",
          ],
        },
        {
          day: 3,
          title: "Habarana – Polonnaruwa – Habarana",
          meals: "Breakfast, Dinner",
          details: [
            "Visit Polonnaruwa, the 2nd Capital of Sri Lanka",
            "Explore UNESCO World Heritage Site",
            "Return to the hotel for dinner and overnight",
          ],
        },
        {
          day: 4,
          title: "Habarana – Sigiriya – Matale – Kandy",
          meals: "Breakfast, Dinner",
          details: [
            "Climb Sigiriya Rock Fortress (UNESCO World Heritage Site)",
            "Continue to Kandy",
            "Visit a spice garden on the way",
            "Check into hotel in Kandy for dinner and overnight",
          ],
        },
        {
          day: 5,
          title: "Kandy",
          meals: "Breakfast, Dinner",
          details: [
            "Visit Temple of the Tooth Relic",
            "Free time at leisure",
            "Evening visit to Royal Botanical Garden",
            "Return to hotel for dinner and overnight",
          ],
        },
        {
          day: 6,
          title: "Kandy – Beruwala",
          meals: "Breakfast, Dinner",
          details: [
            "Free time at leisure",
            "Travel to Beruwala (Southwestern coast)",
            "Check into beachside hotel for relaxation",
            "Dinner and overnight at the hotel",
          ],
        },
        {
          day: 7,
          title: "Beruwala – Kalutara – Colombo",
          meals: "Breakfast, Dinner",
          details: [
            "Visit the Buddhist Temple in Kalutara",
            "Arrive in Colombo",
            "Explore city and shopping centers (House of Fashion, ODEL, etc.)",
            "Dinner and overnight at the hotel",
          ],
        },
        {
          day: 8,
          title: "Colombo – Departure",
          meals: "Breakfast",
          details: [
            "Enjoy breakfast at the hotel",
            "Transfer to Bandaranaike International Airport for departure",
          ],
        },
      ],
      inclusions: [
        "07 nights in 4-star hotels or comparable in a double/twin room",
        "Half-board meals (Bed, Breakfast, and Dinner)",
        "A/C vehicle for all transfers and visits",
        "English-speaking chauffeur guide",
        "Tickets, monument, and museum fees per itinerary",
        "All applicable taxes",
      ],
      exclusions: [
        "Lunch",
        "Expenses due to accidents, strikes, political unrest, etc.",
        "Personal expenses (laundry, soft drinks, bottled water, camera fees, postage, tipping, etc.)",
        "Domestic or international airfare",
        "Visa fees",
        "Insurance and gratuities",
      ],
      special_notes: {
        validity: "Valid until November 30, 2023",
        visa_info:
          "All foreign travelers must obtain a valid Sri Lanka visa before entry. Apply online at http://www.eta.gov.lk/",
        room_category:
          "Base category room included. Higher room categories available at an additional cost.",
      },
    },
    {
      id: 4,
      name: "Shine Sri Lanka",
      duration: "8 days / 7 nights",
      location: "Switzerland",
      price: "$450 / Person",
      image: glamour,
      group_size: "No Specific Size",
      activities: ["World heritage visits", "Trips through the countryside"],
      categories: ["Cultural trip", "Vacation tour"],
      tour_code: "SW001",
      surcharges_in_high_season: true,
      itinerary: [
        {
          day: 1,
          title: "Airport — Negombo",
          meals: "Dinner",
          details: [
            "Arrival at Bandaranaike International Airport",
            "Welcomed by Explore Vacations representative",
            "Transfer to hotel in Negombo",
            "Relax, refresh, and have dinner",
          ],
        },
        {
          day: 2,
          title: "Negombo — Anuradhapura – Habarana",
          meals: "Breakfast, Dinner",
          details: [
            "Breakfast at the hotel",
            "Travel to Anuradhapura via Maho",
            "Explore the ancient city of Anuradhapura",
            "Continue to Habarana for dinner and overnight",
          ],
        },
        {
          day: 3,
          title: "Habarana – Polonnaruwa – Habarana",
          meals: "Breakfast, Dinner",
          details: [
            "Visit Polonnaruwa, the 2nd Capital of Sri Lanka",
            "Explore UNESCO World Heritage Site",
            "Return to the hotel for dinner and overnight",
          ],
        },
        {
          day: 4,
          title: "Habarana – Sigiriya – Matale – Kandy",
          meals: "Breakfast, Dinner",
          details: [
            "Climb Sigiriya Rock Fortress (UNESCO World Heritage Site)",
            "Continue to Kandy",
            "Visit a spice garden on the way",
            "Check into hotel in Kandy for dinner and overnight",
          ],
        },
        {
          day: 5,
          title: "Kandy",
          meals: "Breakfast, Dinner",
          details: [
            "Visit Temple of the Tooth Relic",
            "Free time at leisure",
            "Evening visit to Royal Botanical Garden",
            "Return to hotel for dinner and overnight",
          ],
        },
        {
          day: 6,
          title: "Kandy – Beruwala",
          meals: "Breakfast, Dinner",
          details: [
            "Free time at leisure",
            "Travel to Beruwala (Southwestern coast)",
            "Check into beachside hotel for relaxation",
            "Dinner and overnight at the hotel",
          ],
        },
        {
          day: 7,
          title: "Beruwala – Kalutara – Colombo",
          meals: "Breakfast, Dinner",
          details: [
            "Visit the Buddhist Temple in Kalutara",
            "Arrive in Colombo",
            "Explore city and shopping centers (House of Fashion, ODEL, etc.)",
            "Dinner and overnight at the hotel",
          ],
        },
        {
          day: 8,
          title: "Colombo – Departure",
          meals: "Breakfast",
          details: [
            "Enjoy breakfast at the hotel",
            "Transfer to Bandaranaike International Airport for departure",
          ],
        },
      ],
      inclusions: [
        "07 nights in 4-star hotels or comparable in a double/twin room",
        "Half-board meals (Bed, Breakfast, and Dinner)",
        "A/C vehicle for all transfers and visits",
        "English-speaking chauffeur guide",
        "Tickets, monument, and museum fees per itinerary",
        "All applicable taxes",
      ],
      exclusions: [
        "Lunch",
        "Expenses due to accidents, strikes, political unrest, etc.",
        "Personal expenses (laundry, soft drinks, bottled water, camera fees, postage, tipping, etc.)",
        "Domestic or international airfare",
        "Visa fees",
        "Insurance and gratuities",
      ],
      special_notes: {
        validity: "Valid until November 30, 2023",
        visa_info:
          "All foreign travelers must obtain a valid Sri Lanka visa before entry. Apply online at http://www.eta.gov.lk/",
        room_category:
          "Base category room included. Higher room categories available at an additional cost.",
      },
    },
    {
      id: 5,
      name: "Amazing Sri Lanka tour",
      duration: "15 days / 14 nights",
      location: "Sri Lanka",
      price: "$200 / Person",
      image: amazing,
      group_size: "No Specific Size",
      activities: ["World heritage visits", "Trips through the countryside"],
      categories: ["Cultural trip", "Vacation tour"],
      tour_code: "SW001",
      surcharges_in_high_season: true,
      itinerary: [
        {
          day: 1,
          title: "Airport — Negombo",
          meals: "Dinner",
          details: [
            "Arrival at Bandaranaike International Airport",
            "Welcomed by Explore Vacations representative",
            "Transfer to hotel in Negombo",
            "Relax, refresh, and have dinner",
          ],
        },
        {
          day: 2,
          title: "Negombo — Anuradhapura – Habarana",
          meals: "Breakfast, Dinner",
          details: [
            "Breakfast at the hotel",
            "Travel to Anuradhapura via Maho",
            "Explore the ancient city of Anuradhapura",
            "Continue to Habarana for dinner and overnight",
          ],
        },
        {
          day: 3,
          title: "Habarana – Polonnaruwa – Habarana",
          meals: "Breakfast, Dinner",
          details: [
            "Visit Polonnaruwa, the 2nd Capital of Sri Lanka",
            "Explore UNESCO World Heritage Site",
            "Return to the hotel for dinner and overnight",
          ],
        },
        {
          day: 4,
          title: "Habarana – Sigiriya – Matale – Kandy",
          meals: "Breakfast, Dinner",
          details: [
            "Climb Sigiriya Rock Fortress (UNESCO World Heritage Site)",
            "Continue to Kandy",
            "Visit a spice garden on the way",
            "Check into hotel in Kandy for dinner and overnight",
          ],
        },
        {
          day: 5,
          title: "Kandy",
          meals: "Breakfast, Dinner",
          details: [
            "Visit Temple of the Tooth Relic",
            "Free time at leisure",
            "Evening visit to Royal Botanical Garden",
            "Return to hotel for dinner and overnight",
          ],
        },
        {
          day: 6,
          title: "Kandy – Beruwala",
          meals: "Breakfast, Dinner",
          details: [
            "Free time at leisure",
            "Travel to Beruwala (Southwestern coast)",
            "Check into beachside hotel for relaxation",
            "Dinner and overnight at the hotel",
          ],
        },
        {
          day: 7,
          title: "Beruwala – Kalutara – Colombo",
          meals: "Breakfast, Dinner",
          details: [
            "Visit the Buddhist Temple in Kalutara",
            "Arrive in Colombo",
            "Explore city and shopping centers (House of Fashion, ODEL, etc.)",
            "Dinner and overnight at the hotel",
          ],
        },
        {
          day: 8,
          title: "Colombo – Departure",
          meals: "Breakfast",
          details: [
            "Enjoy breakfast at the hotel",
            "Transfer to Bandaranaike International Airport for departure",
          ],
        },
      ],
      inclusions: [
        "07 nights in 4-star hotels or comparable in a double/twin room",
        "Half-board meals (Bed, Breakfast, and Dinner)",
        "A/C vehicle for all transfers and visits",
        "English-speaking chauffeur guide",
        "Tickets, monument, and museum fees per itinerary",
        "All applicable taxes",
      ],
      exclusions: [
        "Lunch",
        "Expenses due to accidents, strikes, political unrest, etc.",
        "Personal expenses (laundry, soft drinks, bottled water, camera fees, postage, tipping, etc.)",
        "Domestic or international airfare",
        "Visa fees",
        "Insurance and gratuities",
      ],
      special_notes: {
        validity: "Valid until November 30, 2023",
        visa_info:
          "All foreign travelers must obtain a valid Sri Lanka visa before entry. Apply online at http://www.eta.gov.lk/",
        room_category:
          "Base category room included. Higher room categories available at an additional cost.",
      },
    },
  ];

  return (
    <div>
      <div className="homePageContainer01">
        <div className="h-[80vh]"></div>
      </div>

      <div
        id="tab-panel-1ai"
        role="tabpanel"
        className="card w-10/12 mx-auto bg-white p-4 shadow-md rounded-lg mt-[-30px]"
        aria-labelledby="tab-label-1ai"
        tabIndex="-1"
      >
        <Toast ref={toast} />

        <div className="flex gap-3 lg:flex-row flex-column">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-map-marker"></i>
            </span>
            <Dropdown
              value={tourDestination}
              onChange={(e) => setTourDestination(e.value)}
              options={[
                { name: "New York", code: "NY" },
                { name: "London", code: "LD" },
                { name: "Paris", code: "PR" },
              ]}
              optionLabel="name"
              placeholder="Select Destination"
              className="flex-1"
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-calendar-clock"></i>
            </span>
            <Calendar
              value={tourFromDate}
              placeholder="From"
              className="flex-1"
              onChange={(e) => setTourFromDate(e.value)}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-calendar-clock"></i>
            </span>
            <Calendar
              className="flex-1"
              placeholder="To"
              value={tourToDate}
              onChange={(e) => setTourToDate(e.value)}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputNumber
              value={tourGuest}
              className="flex-1"
              placeholder="Guest"
              onValueChange={(e) => setTourGuest(e.value)}
            />
          </div>

          <Button label="Explore" className="" onClick={handleExplore} />
        </div>
      </div>

      <div className="container mx-auto px-6 mt-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-10/12 mx-auto justify-center">
          {tourData.map((tour) => (
            <div
              key={tour.id}
              className="bg-white cursor-pointer shadow-md rounded-lg overflow-hidden flex flex-col w-70 my-3 mx-auto"
              onClick={() => navigate("/tourDetails", { state: { tour } })}
            >
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full object-cover aspect-[4/3]"
              />
              <div className="px-4 pt-4 flex-grow">
                <h3 className="text-lg font-semibold text-black line-clamp-1">
                  {tour.name}
                </h3>
                <div className="flex justify-content-between">
                  <p className="text-gray-600 m-0">{tour.duration}</p>
                  <p className="text-gray-700 m-0">{tour.location}</p>
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-100">
                <span className="text-md font-bold px-3 bg-[#ffcb27] mt-2 py-3 rounded-tr-xl">
                  {tour.price}
                </span>
                <span className="text-md font-bold pe-3 py-3 mt-2">
                  View Tour
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
