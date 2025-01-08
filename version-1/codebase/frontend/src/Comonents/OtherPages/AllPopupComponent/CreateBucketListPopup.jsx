/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import Girl from "../../../assets/headerIcon/girl.jpg";
import chevron_down from "../../../assets/chevron-down.png";
import ImageBoxed from "../../../assets/ImageBoxed.png";
import image_add_logo from "../../../assets/image_add_logo.png";
import BadgesIconFirst from "../../../assets/BadgesIconFirst.png";
import Select from "react-select";
import "./AllPopupPage.css";
import { useDispatch, useSelector } from "react-redux";
import dummyUserImage from "../../../assets/user_image-removebg-preview.png";
import PostDetailPopup from "./PostDetailPopup";
import { fetchCities } from "../../../redux/slices/stateCitySlice";
import ShowBadgeIcon from "../ShowBadgeIcons";
import {
  addCountOnStoryView,
  commentOnStory,
  bucketPost,
  getActiveStories,
  getAllPosts,
  LikeUnlikePost,
  likeUnlikeStory,
} from "../../../redux/slices/postSlice";
const apiUrl = import.meta.env.VITE_API_URL;
 
const CreateBucketListPopup = ({
  post_id,
  isOpen,
  bucketpostData,
  setbucketpostData,
  onCloseBucket
}) => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [listName, setListName] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Select View");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showTagBuddySuggestions, setShowBuddyTagSuggestions] = useState(false);
  const [buddyInput, setBuddyInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [showTagSuggestion, setShowTagSuggestion] = useState(false);
  const [filteredTagSuggestions, setFilteredTagSuggestions] = useState([]);
  const [isPostDetailPopup, setIsPostDetailPopup] = useState(false);
  const fileInputRef = useRef(null); // Create a ref for the file input

  useEffect(() => {
    const fetchCategoryLists = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${apiUrl}/post/getAllCategoryLists`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching categories:", errorData);
          return; // Handle or log the error as needed
        }
  
        const data = await response.json();
        setListName(data.data);
        console.log("Fetched categories:", data.data);
      } catch (error) {
        console.error("Error in getAllCategoryLists fetch:", error.message);
      }
    };
  
    fetchCategoryLists();
  }, [apiUrl]); // Add dependencies if `apiUrl` or other variables might change
  
  const handlePostUpload = async () => {
    try {
      //console.log("bucketpostDatanew", bucketpostData);

      const bucketResult = await dispatch(bucketPost(bucketpostData)).unwrap();
      if (bucketResult) {
        // console.log("=====commentResult===>", commentResult.message);
        await dispatch(getAllPosts());
        // await dispatch(getUserPosts());
        setbucketpostData({
          list_name: "",
          post_id: "",
          buddies: [],
          buddies_id: [],
        });
        onCloseBucket();

        // handleFlashMessage(commentResult.message, 'success');
      }
    } catch (error) {
      console.log("error in handlePostUpload", error);
    }
  };
  

  /* user details from auth slice */
  const { user: userDetails, userBuddies } = useSelector((state) => state.auth);
  /* handle buddy tag */
  const handleBuddyTag = (e) => {
    const { value } = e.target;
    const match = value.match(/@(\w*)$/); // Match word after @
    setBuddyInput(value);
    if (match) {
      const query = match[1].toLowerCase();
      const filtered = userBuddies.filter((person) =>
        person.full_name.toLowerCase().includes(query)
      );
      setFilteredSuggestions(filtered);
      setShowBuddyTagSuggestions(filtered.length > 0);
    } else {
      setShowBuddyTagSuggestions(false);
    }
  };

  /* handle public and private account choose */
  const handleOption = (option) => {
    if (option === "public") {
      setbucketpostData((prev) => ({
        ...prev,
        is_public: true,
      }));
    } else if (option === "private") {
      setbucketpostData((prev) => ({
        ...prev,
        is_public: false,
      }));
    }

    setDropdownOpen(false);
  };

  // Disable body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  /* handle description change value and show words count*/
  useEffect(() => {
    if (post_id) {
      setbucketpostData((prev) => ({
        ...prev,
        post_id,
      }));
    }
  }, [post_id, setbucketpostData]);

  const handleListNameInputChange = (input) => {
    let value;

    // Check if the input is an event (from input field) or a direct value (from dropdown)
    if (input?.target?.value !== undefined) {
      value = input.target.value; // Input field
    } else if (input?.list_name) {
      value = input.list_name; // Dropdown
    } else {
      return; // If input is invalid, exit early
    }

    // Update state with the new value
    setbucketpostData((prev) => ({
      ...prev,
      list_name: value,
    }));
  };

  const handleSuggestionClick = (person) => {
    // Add selected buddy to bucketpostData.buddies
    setbucketpostData((prevData) => {
      const isAlreadyAdded = prevData.buddies.some(
        (buddy) => buddy.id === person.id
      );
      if (isAlreadyAdded) return prevData; // Avoid duplicates
      return {
        ...prevData,
        buddies: [
          ...prevData.buddies,
          {
            id: person.id,
            name: person.full_name,
            profile_image: person.profile_image,
            followers_count: person.followers_count || 0,
            buddies_count: person.buddies_count || 0,
            trips_count: person.trips_count || 0,
            role: person.user_role,
            user_name: person.user_name,
          },
        ],
        buddies_id: [...prevData.buddies_id, person.id], // Maintain IDs separately
      };
    });
    setBuddyInput("");
    setShowBuddyTagSuggestions(false);
  };

  // Remove buddy from tagged list
  const handleRemoveBuddy = (id) => {
    setbucketpostData((prevData) => ({
      ...prevData,
      buddies: prevData.buddies.filter((buddy) => buddy.id !== id),
      buddies_id: prevData.buddies_id.filter((buddyId) => buddyId !== id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form");
  };

  /* set bucketpostData to initial state if popup is closed */
  const handlePopUpClose = () => {
    console.log("create popup");
    setbucketpostData({
      list_name: "",
      buddies: [],
      buddies_id: [],
      post_id: "",
    });
    onCloseBucket();
  };

  // Disable body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <style>
        {`
          .no-scroll {
            overflow: hidden;
          }
        `}
      </style>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-[16px] shadow-lg w-[696px] px-1 py-5 md:w-[696px] h-[672px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 flex justify-between items-center border-b border-gray-200 sticky top-0 bg-white z-10 md:h-[55px]">
            <h4 className="text-[#303037] font-ubuntu font-bold text-[24px]">
              Create a Bucket List
            </h4>
            <button
              className="text-black hover:text-[#2DC6BE] font-bold text-xl"
              onClick={() => handlePopUpClose()}
              aria-label="Close"
            >
              &#x2715;
            </button>
          </div>

          <div className="px-4 flex flex-col h-full flex-1 overflow-y-auto scrollbar-hidden">
            <div className="py-5 flex items-center justify-between">
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div>
                  <img
                    src={userDetails?.profile_image || dummyUserImage}
                    alt="profile_image"
                    className="w-[44px] h-[44px] rounded-full"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h5 className="font-poppins font-semibold text-[20px] text-[#212626] text-left">
                      {userDetails?.full_name}
                    </h5>
                    {/* badge icon section  */}
                    {userDetails?.badge?.split("-")[0]?.trim() ==
                      "Solo Traveler" && (
                      <ShowBadgeIcon badge={userDetails?.badge} />
                    )}

                    {userDetails?.badge?.split("-")[0]?.trim() ==
                      "Luxury Traveler" && (
                      <ShowBadgeIcon badge={userDetails?.badge} />
                    )}

                    {userDetails?.badge?.split("-")[0]?.trim() ==
                      "Adventurer" && (
                      <ShowBadgeIcon badge={userDetails?.badge} />
                    )}

                    {userDetails?.badge?.split("-")[0]?.trim() ==
                      "Explorer" && (
                      <ShowBadgeIcon badge={userDetails?.badge} />
                    )}

                    {userDetails?.badge?.split("-")[0]?.trim() == "Foodie" && (
                      <ShowBadgeIcon badge={userDetails?.badge} />
                    )}
                    {/* <img
                      src={BadgesIconFirst}
                      alt="BadgesIconFirst"
                      className="w-[24px] h-[24px]"
                    /> */}
                  </div>
                  <div>
                    <p className="-mt-2 font-inter font-medium text-[16px] text-[#667877] text-left">
                      {userDetails?.user_name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center space-x-2">
                {/* Dropdown Button */}
                <div className="relative">
                  <button
                    className="flex items-center justify-center w-[120px] h-[24px] bg-[#FFFFFF] border border-[#D5D5D5] text-[#6D6D6D] font-normal text-[14px] rounded-full focus:outline-none"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  >
                    {bucketpostData?.is_public ? "Public" : "Private"}
                    <img
                      src={chevron_down}
                      alt="Chevron"
                      className={`ml-1 w-4 h-4 transform transition-transform duration-300 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md">
                      <button
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        onClick={() => handleOption("public")}
                      >
                        Public View
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                        onClick={() => handleOption("private")}
                      >
                        Private View
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-2">
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {/* Input Fields */}

                <div className="flex flex-col dataSelect">
                  <p className="text-left font-inter font-medium text-[14px] text-[#212626] mb-3">
                    Add List Name
                  </p>
                  {/* <Select
                  options={options}
                  onChange={handleLocationChange}
                  placeholder="eg: Mysore"
                  className=""
                /> */}
                  <input
                    type="text"
                    onChange={(e) => handleListNameInputChange(e)}
                    placeholder="eg: travel"
                    value={bucketpostData?.list_name || ""}
                    className="flex-grow font-inter font-medium text-[16px] text-[#212626] w-full p-3 h-[48px] bg-[#F0F7F7] rounded-[8px] border-1 border-[#F5F5F5] placeholder:text-[#869E9D] focus:outline-none focus:ring-1 focus:ring-[#5E6F78] placeholder:font-inter placeholder:font-medium placeholder:text-[16px]"
                  />
                </div>

                {Array.isArray(listName) && listName.length > 0 && (
                  <div className="flex flex-col relative">
                    {/* Label */}
                    <p className="text-left font-inter font-medium text-[14px] text-[#212626] mb-3">
                      Category List
                    </p>

                    <div className="absolute top-[60px] bg-white border border-gray-200 rounded shadow-lg w-full z-10">
                      <select
                        className="p-2 bg-[#F0F7F7] rounded-[8px] border border-[#F5F5F5] text-[16px] text-[#212626] font-medium cursor-pointer w-full"
                        onChange={(e) => handleListNameInputChange(e)}
                      >
                        <option value="">Select an option</option>
                        {listName.map((list) => (
                          <option key={list.id} value={list.list_name}>
                            {list.list_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex flex-col relative mt-[75px]">
                  <p className="text-left font-inter font-medium text-[14px] text-[#212626] mb-3">
                    Add Buddies
                  </p>

                  <div className="relative flex flex-wrap items-center gap-2 p-2 bg-[#F0F7F7] rounded-[8px] border border-[#F5F5F5]">
                    {/* Tag Show inside input */}
                    {bucketpostData.buddies.map((buddy) => (
                      <span
                        key={buddy.id}
                        className="inline-flex items-center justify-center gap-2 bg-[#09857E] text-white w-[90px] h-[24px] rounded-[4px] text-[12px] font-inter font-medium p-2"
                      >
                        {/* {buddy.name} */}
                        {buddy.name.length > 6
                          ? `${buddy.name.slice(0, 6)}...`
                          : buddy.name}
                        <button
                          onClick={() => handleRemoveBuddy(buddy.id)}
                          className="text-[#2DC6BE] font-bold"
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 4L4 12M4 4L12 12"
                              stroke="white"
                              strokeWidth="1.33333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </span>
                    ))}

                    {/* Input Field */}
                    <input
                      type="text"
                      placeholder={
                        bucketpostData.buddies.length === 0 ? "eg: @calvin" : ""
                      }
                      className="flex-grow font-inter font-medium text-[16px] text-[#212626] h-[30px] bg-transparent outline-none placeholder:text-[#869E9D] placeholder:font-medium"
                      value={buddyInput}
                      onChange={(e) => handleBuddyTag(e)}
                    />
                  </div>

                  {/* Search show dropdown */}
                  {showTagBuddySuggestions &&
                    filteredSuggestions.length > 0 && (
                      <div className="absolute top-[80px] bg-white border border-gray-200 rounded shadow-lg w-[656px] z-10">
                        <ul className="max-h-40 overflow-y-auto">
                          {filteredSuggestions.map((person) => (
                            <li
                              key={person.id}
                              onClick={() => handleSuggestionClick(person)}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                              {person.full_name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>

                <div className="mt-20 flex justify-end">
                  <button
                    type="button"
                    className="font-inter font-medium text-[14px] flex items-center justify-center bg-[#2DC6BE] text-white rounded-[7px] w-[82px] h-[36px]"
                    onClick={() => handlePostUpload()}
                  >
                    Next
                  </button>
                </div>
              </form>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBucketListPopup;
