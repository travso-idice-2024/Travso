import React, { useState, useRef } from "react";
import Background from "../../../assets/Background.png";
import logo from "../../../assets/headerIcon/logo.png";
import Girl from "../../../assets/headerIcon/girl.jpg";
import Travel from "../../../assets/travel.png";
import dummyUserImage from "../../../assets/user_image-removebg-preview.png";
import { useDispatch } from "react-redux";
import { deleteStory, getActiveStories } from "../../../redux/slices/postSlice";
import { blockAccount } from "../../../redux/slices/authSlice";
import ShareStoryPopup from "../AllPopupComponent/ShareStoryPopup";
import EmojiPicker from "emoji-picker-react";
import ShowBadgeIcon from "../ShowBadgeIcons";
import Progressbar from "../../Common/Progressbar";

const StoryUsernewPage = ({
  isOpen,
  onClose,
  currentUserStoryIndex,
  mediaArray,
  handleUserStoryPrevious,
  handleUserStoryNext,
  storyData,
  closeBuddiesStoryPopup,
  currentBuddiesReelIndex,
  isShowvisibleStoryViewID,
  handleBuddiesStoryPrevious,
  handleBuddiesStoryNext,
  handleStoryCommentEnter,
  handleStoryReplyInputChange,
  storyReply,
  handleShareStoryPopupClose,
  handleEmojiSelectUserID,
  activeEmojiStoryId,
  showEmojiPickerStory,
  handleEmojiClickStory,
  handleLikeUnlikeStory,
  increaseViewersCount,
  handleCloseEmojiPicker,
  showEmojiPicker
}) => {
  const dispatch = useDispatch();
  const [viewedStoryId, setViewedStoryId] = useState("");

  const [dropdownOpenSettingUserStory, setDropdownOpenSettingUserStory] =
    useState(false);
  const [isBuddiesReelSharePopup, setIsBuddiesReelSharePopup] = useState(false);

  const handleStoryViewed = async () => {
    console.log("====viewedStoryId===>", viewedStoryId);
    await increaseViewersCount(viewedStoryId);
  };

  console.log(storyData);

  const data = [
    { id: 1, src: Girl, label: "Priya Sharma" },
    { id: 2, src: Girl, label: "Rohit Singh" },
  ];

  const toggleSettingUserStory = () => {
    setDropdownOpenSettingUserStory(!dropdownOpenSettingUserStory);
  };
  const handleBuddiesReelSharePopup = () => {
    setIsBuddiesReelSharePopup(true);
  };

  const handleBuddiesReelSharePopupClose = () => {
    setIsBuddiesReelSharePopup(false);
  };

  //=================mute/unmute =================
  const videoRef = useRef(null); // Reference for the video element
  const [isMuted, setIsMuted] = useState(false); // State for mute/unmute

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted; // Toggle muted property of the video
      setIsMuted(video.muted); // Update state to reflect the current mute status
    }
  };
  //=================mute/unmute =================
  //=================play/pause===================
  const [isPlaying, setIsPlaying] = useState(true); // State for play/pause

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause(); // Pause the video
      } else {
        video.play(); // Play the video
      }
      setIsPlaying(!isPlaying); // Toggle the play/pause state
    }
  };
  //=================play/pause===================
    
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center z-50"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <div className="relative w-full max-w-[396px] flex items-center">
        {/* Logo */}

        <div className="absolute -top-[10px] -left-[540px] z-10">
          <img
            src={logo}
            alt="Travso Logo"
            className="h-12 bg-white w-[230px] h-[70px] rounded-[16px] p-[16px]"
          />
        </div>

        {/* Close Tab */}
        <div
          className="absolute -top-[10px] -right-[540px] z-10 cursor-pointer"
          onClick={onClose}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_b_40000261_31302)">
              <rect
                width="44"
                height="44"
                rx="22"
                fill="white"
                fill-opacity="0.75"
              />
              <path
                d="M15.5188 28.4817L28.4824 15.5181"
                stroke="#212626"
                stroke-width="3"
                stroke-linecap="round"
              />
              <path
                d="M15.5188 15.5183L28.4824 28.4819"
                stroke="#212626"
                stroke-width="3"
                stroke-linecap="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_b_40000261_31302"
                x="-15"
                y="-15"
                width="74"
                height="74"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="7.5" />
                <feComposite
                  in2="SourceAlpha"
                  operator="in"
                  result="effect1_backgroundBlur_40000261_31302"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_backgroundBlur_40000261_31302"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>

        {/* Left Navigation Button */}
        <button
          className="absolute top-1/2 -left-[50px] w-9 h-9 transform -translate-y-1/2 bg-white text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center rotate-180"
          onClick={handleUserStoryPrevious}
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 13L7 7L1 1"
              stroke="#212626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Image Slider */}
        <div className="relative w-[396px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 gap-4"
            style={{
              transform: `translateX(calc(-${currentUserStoryIndex * 100}% + ${
                currentUserStoryIndex * -16
              }px))`,
            }}
          >
            
            {storyData.map((story, index) => (
              <div
                key={index}
                className={`w-[396px] h-[650px] flex-shrink-0 ${
                  index === currentUserStoryIndex
                    ? "scale-100 z-10"
                    : "scale-90 opacity-70"
                } transition-all duration-500`}
                style={{ flexBasis: "100%" }}
              >
                {/* Top Data */}
                <div className="flex items-center justify-between absolute top-9 w-[396px] px-4">
                  <div className="flex items-center gap-[8px]">
                    
                    <div>

                      <img
                        //src={Girl}
                        src={story?.profile_image || dummyUserImage}
                        alt="Girl"
                        className="w-[44px] h-[44px] rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="flex items-center gap-[5px] font-poppins font-semibold text-[16px] text-[#FFFFFF]">
                        {story.full_name}{" "}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 0L14.2547 3.01208L15.7994 9.78017L11.4711 15.2078H4.52893L0.200577 9.78017L1.74535 3.01208L8 0Z"
                            fill="#9747FF"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.6843 5.53415C11.8633 5.71314 11.8633 6.00334 11.6843 6.18233L7.40656 10.4601C7.22757 10.6391 6.93736 10.6391 6.75837 10.4601L4.31393 8.01566C4.13494 7.83667 4.13494 7.54647 4.31393 7.36748C4.49292 7.18849 4.78312 7.18849 4.96211 7.36748L7.08246 9.48783L11.0362 5.53415C11.2151 5.35515 11.5053 5.35515 11.6843 5.53415Z"
                            fill="white"
                          />
                        </svg>
                      </p>
                      <div className="-mt-1 text-left font-inter font-medium text-[14px] text-[#FFFFFF]">
                        {/* badge icon section  */}
                        {story?.badge?.split("-")[0]?.trim() ==
                          "Solo Traveler" && (
                          <ShowBadgeIcon badge={story?.badge} />
                        )}
                        {story?.badge?.split("-")[0]?.trim() ==
                          "Luxury Traveler" && (
                          <ShowBadgeIcon badge={story?.badge} />
                        )}
                        {story?.badge?.split("-")[0]?.trim() ==
                          "Adventurer" && (
                          <ShowBadgeIcon badge={story?.badge} />
                        )}
                        {story?.badge?.split("-")[0]?.trim() == "Explorer" && (
                          <ShowBadgeIcon badge={story?.badge} />
                        )}
                        {story?.badge?.split("-")[0]?.trim() == "Foodie" && (
                          <ShowBadgeIcon badge={story?.badge} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    {/* Mute/Unmute Button */}
                    <div onClick={toggleMute} style={{ cursor: "pointer" }}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.7479 4.99993C21.1652 6.97016 22 9.38756 22 11.9999C22 14.6123 21.1652 17.0297 19.7479 18.9999M15.7453 7.99993C16.5362 9.13376 17 10.5127 17 11.9999C17 13.4872 16.5362 14.8661 15.7453 15.9999M9.63432 5.36561L6.46863 8.5313C6.29568 8.70425 6.2092 8.79073 6.10828 8.85257C6.01881 8.9074 5.92127 8.9478 5.81923 8.9723C5.70414 8.99993 5.58185 8.99993 5.33726 8.99993H3.6C3.03995 8.99993 2.75992 8.99993 2.54601 9.10892C2.35785 9.20479 2.20487 9.35777 2.10899 9.54594C2 9.75985 2 10.0399 2 10.5999V13.3999C2 13.96 2 14.24 2.10899 14.4539C2.20487 14.6421 2.35785 14.7951 2.54601 14.8909C2.75992 14.9999 3.03995 14.9999 3.6 14.9999H5.33726C5.58185 14.9999 5.70414 14.9999 5.81923 15.0276C5.92127 15.0521 6.01881 15.0925 6.10828 15.1473C6.2092 15.2091 6.29568 15.2956 6.46863 15.4686L9.63431 18.6342C10.0627 19.0626 10.2769 19.2768 10.4608 19.2913C10.6203 19.3038 10.7763 19.2392 10.8802 19.1175C11 18.9773 11 18.6744 11 18.0686V5.9313C11 5.32548 11 5.02257 10.8802 4.88231C10.7763 4.76061 10.6203 4.69602 10.4608 4.70858C10.2769 4.72305 10.0627 4.93724 9.63432 5.36561Z"
                          stroke={isMuted ? "red" : "white"}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {/* <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.7479 4.99993C21.1652 6.97016 22 9.38756 22 11.9999C22 14.6123 21.1652 17.0297 19.7479 18.9999M15.7453 7.99993C16.5362 9.13376 17 10.5127 17 11.9999C17 13.4872 16.5362 14.8661 15.7453 15.9999M9.63432 5.36561L6.46863 8.5313C6.29568 8.70425 6.2092 8.79073 6.10828 8.85257C6.01881 8.9074 5.92127 8.9478 5.81923 8.9723C5.70414 8.99993 5.58185 8.99993 5.33726 8.99993H3.6C3.03995 8.99993 2.75992 8.99993 2.54601 9.10892C2.35785 9.20479 2.20487 9.35777 2.10899 9.54594C2 9.75985 2 10.0399 2 10.5999V13.3999C2 13.96 2 14.24 2.10899 14.4539C2.20487 14.6421 2.35785 14.7951 2.54601 14.8909C2.75992 14.9999 3.03995 14.9999 3.6 14.9999H5.33726C5.58185 14.9999 5.70414 14.9999 5.81923 15.0276C5.92127 15.0521 6.01881 15.0925 6.10828 15.1473C6.2092 15.2091 6.29568 15.2956 6.46863 15.4686L9.63431 18.6342C10.0627 19.0626 10.2769 19.2768 10.4608 19.2913C10.6203 19.3038 10.7763 19.2392 10.8802 19.1175C11 18.9773 11 18.6744 11 18.0686V5.9313C11 5.32548 11 5.02257 10.8802 4.88231C10.7763 4.76061 10.6203 4.69602 10.4608 4.70858C10.2769 4.72305 10.0627 4.93724 9.63432 5.36561Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div> */}
                    <div
                      onClick={togglePlayPause}
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d={
                            isPlaying
                              ? // Pause Icon Path
                                "M8 5H10V19H8V5ZM14 5H16V19H14V5Z"
                              : // Play Icon Path
                                "M5 5.12037C5 4.14921 5 3.66363 5.20249 3.39595C5.37889 3.16277 5.64852 3.01847 5.9404 3.00104C6.27544 2.98103 6.67946 3.25039 7.48752 3.78909L18.0031 10.7995C18.6708 11.2446 19.0046 11.4672 19.1209 11.7477C19.2227 11.9929 19.2227 12.2686 19.1209 12.5138C19.0046 12.7943 18.6708 13.0169 18.0031 13.462L7.48752 20.4724C6.67946 21.0111 6.27544 21.2805 5.9404 21.2604C5.64852 21.243 5.37889 21.0987 5.20249 20.8655C5 20.5979 5 20.1123 5 19.1411V5.12037Z"
                          }
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {/* <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 5.12037C5 4.14921 5 3.66363 5.20249 3.39595C5.37889 3.16277 5.64852 3.01847 5.9404 3.00104C6.27544 2.98103 6.67946 3.25039 7.48752 3.78909L18.0031 10.7995C18.6708 11.2446 19.0046 11.4672 19.1209 11.7477C19.2227 11.9929 19.2227 12.2686 19.1209 12.5138C19.0046 12.7943 18.6708 13.0169 18.0031 13.462L7.48752 20.4724C6.67946 21.0111 6.27544 21.2805 5.9404 21.2604C5.64852 21.243 5.37889 21.0987 5.20249 20.8655C5 20.5979 5 20.1123 5 19.1411V5.12037Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div> */}
                    <div className="cursor-pointer">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={toggleSettingUserStory}
                      >
                        <path
                          d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      {/* DropdownSetting Menu */}
                      {dropdownOpenSettingUserStory && (
                        <div className="fixed top-1/4 left-2/3 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-[#ddd] rounded-md rounded-[16px] shadow-md w-[200px]">
                          <div className="flex items-center justify-between p-2 px-4 border-b border-b-gray-500 w-full">
                            <h6 className="font-poppins font-semibold text-[16px] text-[#212626] ">
                              More Options
                            </h6>

                            {/* Close Button (X) */}
                            <button
                              className="hover:text-[#2DC6BE] font-poppins font-semibold text-[16px] text-[#212626]"
                              onClick={() =>
                                setDropdownOpenSettingUserStory(false)
                              }
                              aria-label="Close"
                            >
                              &#x2715;
                            </button>
                          </div>
                          <ul>
                            <li className="font-inter font-medium text-[16px] text-[#212626] px-4 py-2 flex items-center gap-[5px] cursor-pointer hover:bg-[#f0f0f0]">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 10.5V7M12 14H12.01M9.9 19.2L11.36 21.1467C11.5771 21.4362 11.6857 21.5809 11.8188 21.6327C11.9353 21.678 12.0647 21.678 12.1812 21.6327C12.3143 21.5809 12.4229 21.4362 12.64 21.1467L14.1 19.2C14.3931 18.8091 14.5397 18.6137 14.7185 18.4645C14.9569 18.2656 15.2383 18.1248 15.5405 18.0535C15.7671 18 16.0114 18 16.5 18C17.8978 18 18.5967 18 19.1481 17.7716C19.8831 17.4672 20.4672 16.8831 20.7716 16.1481C21 15.5967 21 14.8978 21 13.5V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V13.5C3 14.8978 3 15.5967 3.22836 16.1481C3.53284 16.8831 4.11687 17.4672 4.85195 17.7716C5.40326 18 6.10218 18 7.5 18C7.98858 18 8.23287 18 8.45951 18.0535C8.76169 18.1248 9.04312 18.2656 9.2815 18.4645C9.46028 18.6137 9.60685 18.8091 9.9 19.2Z"
                                  stroke="black"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              Report comment
                            </li>
                            <li className="px-4 py-2 flex items-center gap-[5px] cursor-pointer hover:bg-[#f0f0f0]">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M22 8.99993L16 14.9999M16 8.99993L22 14.9999M9.63432 4.36561L6.46863 7.5313C6.29568 7.70425 6.2092 7.79073 6.10828 7.85257C6.01881 7.9074 5.92127 7.9478 5.81923 7.9723C5.70414 7.99993 5.58185 7.99993 5.33726 7.99993H3.6C3.03995 7.99993 2.75992 7.99993 2.54601 8.10892C2.35785 8.20479 2.20487 8.35777 2.10899 8.54594C2 8.75985 2 9.03987 2 9.59993V14.3999C2 14.96 2 15.24 2.10899 15.4539C2.20487 15.6421 2.35785 15.7951 2.54601 15.8909C2.75992 15.9999 3.03995 15.9999 3.6 15.9999H5.33726C5.58185 15.9999 5.70414 15.9999 5.81923 16.0276C5.92127 16.0521 6.01881 16.0925 6.10828 16.1473C6.2092 16.2091 6.29568 16.2956 6.46863 16.4686L9.63431 19.6342C10.0627 20.0626 10.2769 20.2768 10.4608 20.2913C10.6203 20.3038 10.7763 20.2392 10.8802 20.1175C11 19.9773 11 19.6744 11 19.0686V4.9313C11 4.32548 11 4.02257 10.8802 3.88231C10.7763 3.76061 10.6203 3.69602 10.4608 3.70858C10.2769 3.72305 10.0627 3.93724 9.63432 4.36561Z"
                                  stroke="#212626"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              Mute Story
                            </li>
                            <li className="px-4 py-2 flex items-center gap-[5px] cursor-pointer hover:bg-[#f0f0f0]"
                             onClick={() => {
                                const isConfirmed = window.confirm(
                                  `Are you sure you want to ${
                                    story?.is_blocked ? "unblock" : "block"
                                  } this user?`
                                );
                                if (isConfirmed) {
                                    story?.is_blocked
                                    ? unBlockTheUser(story?.user_id)
                                    : blockTheUser(story?.user_id);
                                }
                              }}>
                              <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.93 3.93L18.07 18.07M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
                                  stroke="#212626"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              Block account
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Bottom Data */}
                <div className="flex items-center justify-between absolute bottom-5 z-10 w-[396px] px-4">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Add a comment"
                      onKeyDown={(e) =>
                        handleStoryCommentEnter(
                          e,
                          story?.id,
                          story?.user_id,
                          story?.url,
                          story?.full_name
                        )
                      }
                      className="flex-1 bg-[#FFFFFFBF] focus:outline-none text-[#212626] rounded-[24px] md:w-[256px] h-[44px] placeholder:font-inter placeholder:font-medium placeholder:text-[14px] placeholder:text-[#212626] pl-9"
                      value={storyReply[story?.id] || ""}
                      onChange={(e) =>
                        handleStoryReplyInputChange(e, story?.id)
                      }
                    />

                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute left-2"
                      onClick={() => handleEmojiSelectUserID(story?.id)}
                    >
                      <g clip-path="url(#clip0_40000261_30967)">
                        <path
                          d="M6.66602 11.6665C6.66602 11.6665 7.91602 13.3332 9.99935 13.3332C12.0827 13.3332 13.3327 11.6665 13.3327 11.6665M12.4993 7.49984H12.5077M7.49935 7.49984H7.50768M18.3327 9.99984C18.3327 14.6022 14.6017 18.3332 9.99935 18.3332C5.39698 18.3332 1.66602 14.6022 1.66602 9.99984C1.66602 5.39746 5.39698 1.6665 9.99935 1.6665C14.6017 1.6665 18.3327 5.39746 18.3327 9.99984ZM12.916 7.49984C12.916 7.72996 12.7295 7.9165 12.4993 7.9165C12.2692 7.9165 12.0827 7.72996 12.0827 7.49984C12.0827 7.26972 12.2692 7.08317 12.4993 7.08317C12.7295 7.08317 12.916 7.26972 12.916 7.49984ZM7.91602 7.49984C7.91602 7.72996 7.72947 7.9165 7.49935 7.9165C7.26923 7.9165 7.08268 7.72996 7.08268 7.49984C7.08268 7.26972 7.26923 7.08317 7.49935 7.08317C7.72947 7.08317 7.91602 7.26972 7.91602 7.49984Z"
                          stroke="#212626"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_40000261_30967">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    
                    {activeEmojiStoryId === story.id &&
                      showEmojiPicker && (
                        <>
                        <button
                        className="absolute top-0 right-0 z-60 p-2 bg-gray-300 rounded-full"
                        onClick={handleCloseEmojiPicker}
                      >
                        X
                      </button>
                        <div className="absolute -top-[380px] left-0 z-50">
                          <EmojiPicker
                            onEmojiClick={(emojiObject) =>
                              handleEmojiClickStory(emojiObject, story.id)
                            }
                            className="w-[250px] h-[300px] shadow-lg rounded-lg"
                          />
                        </div>
                        </>
                      )}
                  </div>

                  <div>
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 44 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer "
                      onClick={() => handleLikeUnlikeStory(story?.id)}
                    >
                      <rect width="44" height="44" rx="22" fill="#2DC6BE" />
                      <path
                        d="M17.556 18.3639C17.4669 19.3139 17.4044 20.9951 17.9654 21.7107C17.9654 21.7107 17.7013 19.8639 20.0685 17.5467C21.0216 16.6139 21.2419 15.3451 20.9091 14.3936C20.7201 13.8545 20.3748 13.4092 20.0748 13.0982C19.8998 12.9154 20.0341 12.6139 20.2888 12.6248C21.8294 12.6936 24.3263 13.1217 25.3873 15.7842C25.8529 16.9529 25.8873 18.1607 25.6654 19.3889C25.5248 20.1732 25.0248 21.917 26.1654 22.1311C26.9794 22.2842 27.3732 21.6373 27.5498 21.1717C27.6232 20.9779 27.8779 20.9295 28.0154 21.0842C29.3904 22.6482 29.5076 24.4904 29.2232 26.0764C28.6732 29.142 25.5685 31.3732 22.4841 31.3732C18.631 31.3732 15.5638 29.1685 14.7685 25.1779C14.4482 23.567 14.6107 20.3795 17.0951 18.1295C17.2794 17.9607 17.581 18.1107 17.556 18.3639Z"
                        fill="white"
                      />
                      <path
                        d="M23.8923 24.097C22.472 22.2689 23.1079 20.183 23.4564 19.3517C23.5032 19.2424 23.3782 19.1392 23.2798 19.2064C22.6689 19.622 21.4173 20.6002 20.8345 21.9767C20.0454 23.8377 20.1017 24.7486 20.5689 25.8611C20.8501 26.5314 20.5235 26.6736 20.3595 26.6986C20.2001 26.7236 20.0532 26.6174 19.936 26.5064C19.5989 26.1828 19.3587 25.7715 19.2423 25.3189C19.2173 25.222 19.0907 25.1955 19.0329 25.2752C18.5954 25.8799 18.3689 26.8502 18.3579 27.5361C18.3235 29.6564 20.0751 31.3752 22.1939 31.3752C24.8642 31.3752 26.8095 28.422 25.2751 25.9533C24.8298 25.2345 24.411 24.7642 23.8923 24.097Z"
                        fill="#2DC6BE"
                      />
                    </svg>
                  </div>
                  <div className="" onClick={handleBuddiesReelSharePopup}>
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 44 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_b_40000261_30974)">
                        <rect
                          width="44"
                          height="44"
                          rx="22"
                          fill="white"
                          fill-opacity="0.75"
                        />
                        <path
                          d="M17.9257 16.9667L25.4423 14.4584C28.8173 13.3334 30.6507 15.1751 29.534 18.5501L27.0257 26.0667C25.3423 31.1251 22.5757 31.1251 20.8923 26.0667L20.1507 23.8334L17.9173 23.0917C12.8673 21.4167 12.8673 18.6584 17.9257 16.9667Z"
                          fill="#212626"
                        />
                        <path
                          d="M22.0996 21.6916L25.2746 18.5083L22.0996 21.6916Z"
                          fill="white"
                        />
                        <path
                          d="M22.0995 22.317C21.9411 22.317 21.7828 22.2587 21.6578 22.1337C21.4161 21.892 21.4161 21.492 21.6578 21.2503L24.8245 18.067C25.0661 17.8253 25.4661 17.8253 25.7078 18.067C25.9495 18.3087 25.9495 18.7087 25.7078 18.9503L22.5411 22.1337C22.4161 22.2503 22.2578 22.317 22.0995 22.317Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_b_40000261_30974"
                          x="-15"
                          y="-15"
                          width="74"
                          height="74"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feGaussianBlur
                            in="BackgroundImageFix"
                            stdDeviation="7.5"
                          />
                          <feComposite
                            in2="SourceAlpha"
                            operator="in"
                            result="effect1_backgroundBlur_40000261_30974"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_backgroundBlur_40000261_30974"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
                {isBuddiesReelSharePopup && (
                  <div className="bg-white rounded-[16px] shadow-lg w-[396px] py-4 md:w-[396px] h-[460px] flex flex-col overflow-hidden absolute bottom-0 z-10 w-[396px] px-4">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-gray-200 sticky top-0 bg-white z-10 md:h-[55px]">
                      <h4 className="text-[#303037] font-poppins font-semibold text-[16px]">
                        Share with your friends
                      </h4>
                      <button
                        className="text-black hover:text-[#2DC6BE] font-bold text-xl"
                        onClick={handleBuddiesReelSharePopupClose}
                        aria-label="Close"
                      >
                        &#x2715;
                      </button>
                    </div>

                    <div className="flex flex-col h-full  flex-1 overflow-y-auto scrollbar-hidden">
                      <div className="block relative w-full py-4">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full h-[48px] pl-12 pr-4 py-2 rounded-full bg-gray-100 border-gray-300 focus:ring-2 focus:ring-[#FFFFFF] outline-none placeholder:text-sm"
                        />
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <SearchIcon />
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {data.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col items-center"
                          >
                            <img
                              src={item.src}
                              alt={item.label}
                              className="w-[66px] h-[66px] rounded-full border-2 border-gray-300 object-cover"
                            />
                            <p className="font-inter font-medium text-[14px] mt-2 text-[#212626]">
                              {item.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-5  mt-5">
                      <input
                        type="text"
                        placeholder="Add your thoughts..."
                        className="w-full h-[48px] pl-5 pr-4 py-2 rounded-[8px] bg-gray-100 border-gray-300 focus:ring-2 focus:ring-[#FFFFFF] outline-none placeholder:text-[16px] placeholder:font-inter placeholder:font-medium"
                      />

                      <div className="flex items-center justify-between gap-10">
                        <button className="rounded-[8px] border border-[#F0F7F7] bg-[#F0F7F7] p-[12px] w-full font-inter font-medium text-[16px] text-[#2DC6BE] hover:bg-teal-400 hover:text-white">
                          Copy link
                        </button>
                        <button className="rounded-[8px] border border-[#F0F7F7] bg-[#F0F7F7] p-[12px] w-full font-inter font-medium text-[16px] text-[#2DC6BE] hover:bg-teal-400 hover:text-white">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {story.type === "image" ? (
                  <img
                    src={story.url}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-[650px] object-cover rounded-[16px]"
                    loading="lazy"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={story.url}
                    muted={isMuted}
                    className="w-full h-[650px] object-cover rounded-[16px]"
                    autoPlay
                    loop
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Navigation Button */}
        <button
          className="absolute top-1/2 -right-[50px] w-9 h-9 transform -translate-y-1/2 bg-white text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center"
          onClick={handleUserStoryNext}
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 13L7 7L1 1"
              stroke="#212626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StoryUsernewPage;
