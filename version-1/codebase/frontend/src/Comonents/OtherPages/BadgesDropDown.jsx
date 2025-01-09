/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

/*badges */
import adventureBadge from "../../assets/Badges/AD.svg";
import soloTraveller from "../../assets/Badges/ST.svg";
import explorerBadge from "../../assets/Badges/EX.svg";
import foodieBadge from "../../assets/Badges/FO.svg";
import luxuryTravelerBadge from "../../assets/Badges/LT.svg";

const BadgeDropdown = ({ formData, handleBadgeSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const badges = [
    {
      label: "Explorer",
      value:
        "Explorer - Curious souls who love uncovering hidden gems and learning the stories behind new places.",
      image: explorerBadge,
    },
    {
      label: "Adventurer",
      value:
        "Adventurer - Lives for thrilling experiences like trekking, diving, or exploring the wild outdoors.",
      image: adventureBadge,
    },
    {
      label: "Foodie",
      value:
        "Foodie - Travels to explore local cuisines, savoring unique flavors and culinary traditions.",
      image: foodieBadge,
    },
    {
      label: "Solo Traveler",
      value:
        "Solo Traveler - Enjoys the freedom of exploring alone, meeting new people, and creating personal stories.",
      image: soloTraveller,
    },
    {
      label: "Luxury Traveler",
      value:
        "Luxury Traveler - Loves traveling in comfort, enjoying luxurious stays, fine dining, and amazing experiences.",
      image: luxuryTravelerBadge,
    },
  ];

  const selectedBadge = badges.find((badge) => badge.value === formData?.badge);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full " ref={dropdownRef}>
      {/* Display Selected Option */}
      <div
        className="appearance-none bg-transparent text-[#667877] font-medium text-center w-full rounded cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedBadge ? (
          <div className="flex items-center gap-2 justify-center">
            <div className="flex items-center gap-2">
              <img
                src={selectedBadge.image}
                alt={selectedBadge.label}
                className="w-6 h-6"
              />
              <span>{selectedBadge.label}</span>
            </div>
            <div>
              {/* Centered Dropdown Icon */}
              <svg
                className="absolute top-1/2 -right-5 transform -translate-y-1/2 pointer-events-none font-semibold"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#667877"
                width="18"
                height="18"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        ) : (
          "Select your Badge"
        )}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-10  -left-10 top-8 bg-white rounded-[16px] shadow-lg flex flex-col items-center  mt-2 w-[190px] p-2">
          {badges.map((badge) => (
            <div
              key={badge.value}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer w-full"
              onClick={() => {
                handleBadgeSelect({
                  target: { name: "badge", value: badge.value },
                });
                setIsOpen(false);
              }}
            >
              <img src={badge.image} alt={badge.label} className="w-6 h-6" />
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BadgeDropdown;
