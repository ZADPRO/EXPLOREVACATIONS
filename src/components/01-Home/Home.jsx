import React, { useState, useRef, useEffect } from "react";

import { Send, CarFront, TicketsPlane } from "lucide-react";

export default function Home() {
  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 3,
  });

  const wrapperRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.keyCode === 39) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab >= 1 &&
          tabSelected.currentTab < tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab + 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: 1,
          });
        }
      }
    }

    if (e.keyCode === 37) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab > 1 &&
          tabSelected.currentTab <= tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab - 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.noTabs,
          });
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="mt-[80px]">
      <div className="px-10">
        <section
          className="w-full md:w-8/12 mx-auto"
          aria-multiselectable="false"
        >
          <ul
            className="flex items-center border-b border-slate-200"
            role="tablist"
            ref={wrapperRef}
          >
            <li className="" role="presentation">
              <button
                className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300 hover:bg-emerald-50 hover:stroke-[#02569c] focus:bg-emerald-50 focus-visible:outline-none disabled:cursor-not-allowed ${
                  tabSelected.currentTab === 1
                    ? "border-[#02569c] stroke-[#02569c] text-[#02569c] hover:border-[#02569c]  hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:border-slate-500"
                    : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-[#02569c] hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:text-slate-500"
                }`}
                id="tab-label-1ai"
                role="tab"
                aria-setsize="3"
                aria-posinset="1"
                tabindex={`${tabSelected.currentTab === 1 ? "0" : "-1"}`}
                aria-controls="tab-panel-1ai"
                aria-selected={`${
                  tabSelected.currentTab === 1 ? "true" : "false"
                }`}
                onClick={() =>
                  setTabSelected({ ...tabSelected, currentTab: 1 })
                }
              >
                <span className="order-2 ">Tour</span>
                <span className="relative only:-mx-6">
                  <Send />
                </span>
              </button>
            </li>
            <li className="" role="presentation">
              <button
                className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300 hover:bg-emerald-50 hover:stroke-[#02569c] focus:bg-emerald-50 focus-visible:outline-none disabled:cursor-not-allowed ${
                  tabSelected.currentTab === 2
                    ? "border-[#02569c] stroke-[#02569c] text-[#02569c] hover:border-[#02569c]  hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:border-slate-500"
                    : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-[#02569c] hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:text-slate-500"
                }`}
                id="tab-label-2ai"
                role="tab"
                aria-setsize="3"
                aria-posinset="2"
                tabindex={`${tabSelected.currentTab === 2 ? "0" : "-1"}`}
                aria-controls="tab-panel-2ai"
                aria-selected={`${
                  tabSelected.currentTab === 2 ? "true" : "false"
                }`}
                onClick={() =>
                  setTabSelected({ ...tabSelected, currentTab: 2 })
                }
              >
                <span className="order-2 ">Car</span>
                <CarFront />
              </button>
            </li>
            <li className="" role="presentation">
              <button
                className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300 hover:bg-emerald-50 hover:stroke-[#02569c] focus:bg-emerald-50 focus-visible:outline-none disabled:cursor-not-allowed ${
                  tabSelected.currentTab === 3
                    ? "border-[#02569c] stroke-[#02569c] text-[#02569c] hover:border-[#02569c]  hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:border-slate-500"
                    : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-[#02569c] hover:text-[#02569c] focus:border-[#02569c] focus:stroke-[#02569c] focus:text-[#02569c] disabled:text-slate-500"
                }`}
                id="tab-label-3ai"
                role="tab"
                aria-setsize="3"
                aria-posinset="3"
                tabindex={`${tabSelected.currentTab === 3 ? "0" : "-1"}`}
                aria-controls="tab-panel-3ai"
                aria-selected={`${
                  tabSelected.currentTab === 3 ? "true" : "false"
                }`}
                onClick={() =>
                  setTabSelected({ ...tabSelected, currentTab: 3 })
                }
              >
                <span className="order-2 ">Flight</span>
                <span className="relative only:-mx-6">
                  <TicketsPlane />
                </span>
              </button>
            </li>
          </ul>
          <div className="">
            <div
              className={`px-6 py-4 ${
                tabSelected.currentTab === 1 ? "" : "hidden"
              }`}
              id="tab-panel-1ai"
              aria-selected={`${
                tabSelected.currentTab === 1 ? "true" : "false"
              }`}
              role="tabpanel"
              aria-labelledby="tab-label-1ai"
              tabindex="-1"
            >
              <p>
                What is the recipe for successful achievement? To my mind there
                are just four essential ingredients: Choose a career you love,
                give it the best there is in you, seize your opportunities, and
                be a member of the team.
              </p>
            </div>
            <div
              className={`px-6 py-4 ${
                tabSelected.currentTab === 2 ? "" : "hidden"
              }`}
              id="tab-panel-2ai"
              aria-selected={`${
                tabSelected.currentTab === 2 ? "true" : "false"
              }`}
              role="tabpanel"
              aria-labelledby="tab-label-2ai"
              tabindex="-1"
            >
              <p>
                One must be entirely sensitive to the structure of the material
                that one is handling. One must yield to it in tiny details of
                execution, perhaps the handling of the surface or grain, and one
                must master it as a whole.
              </p>
            </div>
            <div
              className={`px-6 py-4 ${
                tabSelected.currentTab === 3 ? "" : "hidden"
              }`}
              id="tab-panel-3ai"
              aria-selected={`${
                tabSelected.currentTab === 3 ? "true" : "false"
              }`}
              role="tabpanel"
              aria-labelledby="tab-label-3ai"
              tabindex="-1"
            >
              <p>
                Even though there is no certainty that the expected results of
                our work will manifest, we have to remain committed to our work
                and duties; because, even if the results are slated to arrive,
                they cannot do so without the performance of work.
              </p>
            </div>
          </div>
        </section>
        <div className="h-screen "></div>
        <div className="h-screen "></div>
      </div>
    </div>
  );
}
